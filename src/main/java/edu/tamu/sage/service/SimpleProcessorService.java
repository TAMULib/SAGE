package edu.tamu.sage.service;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.SUCCESS;

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

import org.apache.commons.lang3.StringUtils;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.Field;
import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.Writer;
import edu.tamu.sage.model.response.Entry;
import edu.tamu.weaver.response.ApiResponse;

@Service
public class SimpleProcessorService implements ProcessorService {

    private final static Logger logger = LoggerFactory.getLogger(SimpleProcessorService.class);

    private final static Map<Long, AtomicBoolean> processing = new ConcurrentHashMap<Long, AtomicBoolean>();

    @Value("${app.solr.batch-size:250}")
    private Integer batchSize;

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private List<Map<String, Collection<Object>>> readSolrCore(Reader solrReader, List<BaseOp> operators) {
        logger.info("Using Reader: " + solrReader.getName() + " to read from SOLR Core: " + solrReader.getSource().getName() + " - " + solrReader.getSource().getUri());

        String stage = "starting reading from with reader: " + solrReader.getName();

        List<Map<String, Collection<Object>>> mappedResults = new ArrayList<Map<String, Collection<Object>>>();

        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(solrReader.getSource().getUri());
        SolrClient solr = builder.build();

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

                    stage = "Reading solr document: " + doc.getFieldValue("id");

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
                        for (BaseOp op : operators) {
                            stage = "processing operator: " + op.getName();
                            op.process(solrReader, resultsMap);
                        }
                        mappedResults.add(resultsMap);
                    }
                }

                query.setStart(current);
                response = solr.query(query);
                rs = response.getResults();
                numFound = rs.getNumFound();

            }

        } catch (Exception e) {
            e.printStackTrace();
            signalProcessComplete(Entry.of(e.toString(), ERROR.toString(), stage));
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
        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(writer.getSource().getUri());
        SolrClient writeableSolr = builder.build();

        String stage = "starting writing to solr core: " + writer.getSource().getName();

        try {
            writeableSolr.ping();

            logger.info("Writing to Destination SOLR: " + writer.getName());

            List<SolrInputDocument> outputDocuments = new ArrayList<SolrInputDocument>();
            for (Map<String, Collection<Object>> map : mappedResults) {
                SolrInputDocument document = new SolrInputDocument();

                stage = "attempting to write solr document: " + map.get("id").toString();

                writer.getOutputMappings().forEach(outputMapping -> {
                    if (map.containsKey(outputMapping.getInputField())) {
                        logger.debug("Writing field: " + outputMapping.getInputField());
                        outputMapping.getMappings().forEach(mapping -> {
                            logger.debug("Indexing metatdata: " + outputMapping.getInputField() + " = '" + map.get(outputMapping.getInputField()) + "' to field: " + mapping);
                            if (StringUtils.isNotEmpty(mapping)) {
                                document.addField(mapping, map.get(outputMapping.getInputField()));
                            } else {
                                logger.warn("Empty field mapping for field {}", outputMapping.getInputField());
                            }
                        });
                    } else {
                        logger.debug("Skipping field: " + outputMapping.getInputField());
                    }
                });

                outputDocuments.add(document);

                if (outputDocuments.size() >= batchSize) {
                    try {
                        logger.debug("Writing batch of " + batchSize);
                        stage = "attempting to write batch of documents to " + writer.getSource().getName();
                        writeableSolr.add(outputDocuments);
                        outputDocuments.clear();
                    } catch (SolrServerException | IOException e) {
                        logger.error("Error adding SOLR document");
                        e.printStackTrace();
                    }
                }
            }

            if (!outputDocuments.isEmpty()) {
                writeableSolr.add(outputDocuments);
                outputDocuments.clear();
            }
            String message = "Wrote " + mappedResults.size() + " documents to " + writer.getName();

            Entry entry = Entry.of(message, SUCCESS.toString(), null);

            logger.info(message);
            UpdateResponse ur = writeableSolr.commit();
            logger.debug("SOLR Commit response:");
            logger.debug(ur.getResponse().toString());
            signalProcessComplete(entry);

            writeableSolr.close();
        } catch (Exception e) {
            e.printStackTrace();
            signalProcessComplete(Entry.of(e.getMessage(), ERROR.toString(), stage));
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

    private void signalProcessComplete(Entry entry) {
        simpMessagingTemplate.convertAndSend("/channel/job/solr/run", new ApiResponse(SUCCESS, entry));
    }

}
