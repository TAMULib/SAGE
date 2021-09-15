package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicBoolean;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.Field;
import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.Writer;

@Service
public class SimpleProcessorService implements ProcessorService {

    private final static Logger logger = LoggerFactory.getLogger(SimpleProcessorService.class);

    private final static Map<Long, AtomicBoolean> processing = new ConcurrentHashMap<Long, AtomicBoolean>();

    @Value("${app.solr.batch-size:250}")
    private Integer batchSize;

    private List<Map<String, Collection<Object>>> readSolrCore(Reader solrReader, List<BaseOp> operators) {
        logger.info("Using Reader: " + solrReader.getName() + " to read from SOLR Core: " + solrReader.getSource().getName() + " - " + solrReader.getSource().getUri());

        List<Map<String, Collection<Object>>> mappedResults = new ArrayList<Map<String, Collection<Object>>>();

        SolrClient solr = new HttpSolrClient(solrReader.getSource().getUri());

        try {
            solr.ping();

            Integer start = 0;

            SolrQuery query = new SolrQuery();
            query.set("q", solrReader.getFilter());
            query.set("rows", batchSize);

            query.setStart(start);

            String titleField = null;
            for (Field field : solrReader.getFields()) {
                if (field.getSchemaMapping().equals("title")) {
                    titleField = field.getName();
                    break;
                }
            }

            QueryResponse response = solr.query(query);
            SolrDocumentList rs = response.getResults();
            long numFound = rs.getNumFound();
            int current = 0;
            while (current < numFound) {

                ListIterator<SolrDocument> iter = rs.listIterator();
                while (iter.hasNext()) {
                    current++;
                    SolrDocument doc = iter.next();

                    if (titleField != null && doc.getFieldValues(titleField) == null) {
                        continue;
                    }

                    Map<String, Collection<Object>> resultsMap = new HashMap<String, Collection<Object>>();

                    solrReader.getFields().forEach(field -> {
                        if (doc.getFieldValues(field.getName()) != null) {
                            resultsMap.put(field.getSchemaMapping(), doc.getFieldValues(field.getName()));
                        }
                    });

                    if (!resultsMap.isEmpty()) {
                        operators.forEach(operator -> operator.process(solrReader, resultsMap));
                        mappedResults.add(resultsMap);
                    }
                }

                query.setStart(current);
                response = solr.query(query);
                rs = response.getResults();
                numFound = rs.getNumFound();

            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
        } finally {
            try {
                solr.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return mappedResults;
    }

    private void writeSolrCore(Writer writer, List<Map<String, Collection<Object>>> mappedResults) {
        int batchSize = 1000;

        SolrClient writeableSolr = new HttpSolrClient(writer.getSource().getUri());

        try {
            writeableSolr.ping();

            logger.info("Writing to Destination SOLR: " + writer.getName());

            List<SolrInputDocument> outputDocuments = new ArrayList<SolrInputDocument>();
            mappedResults.forEach(map -> {
                SolrInputDocument document = new SolrInputDocument();

                writer.getOutputMappings().forEach(outputMapping -> {
                    if (map.containsKey(outputMapping.getInputField())) {
                        logger.debug("Writing field: " + outputMapping.getInputField());
                        outputMapping.getMappings().forEach(mapping -> {
                            logger.debug("Indexing metatdata: " + outputMapping.getInputField() + " = '" + map.get(outputMapping.getInputField()) + "' to field: " + mapping);
                            document.addField(mapping, map.get(outputMapping.getInputField()));
                        });
                    } else {
                        logger.debug("Skipping field: " + outputMapping.getInputField());
                    }
                });

                outputDocuments.add(document);

                if (outputDocuments.size() >= batchSize) {
                    try {
                        logger.debug("Writing batch of " + batchSize);
                        writeableSolr.add(outputDocuments);
                        outputDocuments.clear();
                    } catch (SolrServerException | IOException e) {
                        logger.error("Error adding SOLR document");
                        e.printStackTrace();
                    }
                }
            });

            if (!outputDocuments.isEmpty()) {
                writeableSolr.add(outputDocuments);
                outputDocuments.clear();
            }

            logger.info("Wrote " + mappedResults.size() + " documents to " + writer.getName());
            UpdateResponse ur = writeableSolr.commit();
            logger.debug("SOLR Commit response:");
            logger.debug(ur.getResponse().toString());

            writeableSolr.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * If job is not already processing, process job asynchronously. Returns true if job is started, false if job is already in process.
     *
     * @param job the job to process
     * @return whether the job has started or not
     */
    @Override
    public boolean process(Job job) {
        boolean processStarted = false;
        AtomicBoolean processing;
        if (SimpleProcessorService.processing.containsKey(job.getId())) {
            processing = SimpleProcessorService.processing.get(job.getId());
        } else {
            processing = new AtomicBoolean(false);
            SimpleProcessorService.processing.put(job.getId(), processing);
        }
        if (processing.compareAndSet(false, true)) {
            CompletableFuture.runAsync(() -> {
                List<Map<String, Collection<Object>>> mappedResults = new ArrayList<Map<String, Collection<Object>>>();
                job.getReaders().forEach(reader -> mappedResults.addAll(readSolrCore(reader, job.getOperators())));
                if (!mappedResults.isEmpty()) {
                    job.getWriters().forEach(writer -> writeSolrCore(writer, mappedResults));
                } else {
                    logger.info("Writer results: There were no documents to write");
                }
                processing.set(false);
            });
            processStarted = true;
        }
        return processStarted;
    }

    /**
     * Process list of jobs.
     *
     * @param jobs list of jobs to process
     */
    @Override
    public void process(List<Job> jobs) {
        jobs.forEach(job -> process(job));
    }

}
