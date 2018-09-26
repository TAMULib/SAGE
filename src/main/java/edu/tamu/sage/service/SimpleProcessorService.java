package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrInputDocument;
import org.apache.solr.common.params.CursorMarkParams;
import org.codehaus.plexus.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.Field;
import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.repo.ReaderRepo;
import edu.tamu.sage.model.repo.WriterRepo;

@Service
public class SimpleProcessorService implements ProcessorService {
    @Autowired
    private ReaderRepo solrReaderRepo;

    @Autowired
    private WriterRepo solrWriterRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    public void process() {
        logger.info("Processing!");

        List<Map<String,String>> mappedResults = new ArrayList<Map<String,String>>();

        List<Reader> solrReaders = solrReaderRepo.findAll();
        solrReaders.forEach(solrReader -> {
            logger.info("Using Reader: "+solrReader.getName()+" to read from SOLR Core: "+solrReader.getSource().getName()+" - "+solrReader.getSource().getUri());
            SolrClient solr = new HttpSolrClient(solrReader.getSource().getUri());

            try {
                solr.ping();

                SolrQuery query = new SolrQuery();
                query.set("q", solrReader.getFilter());
                query.set("rows", "500");

                query.addSort(((solrReader.getSortTitle() != null) ? "sort="+solrReader.getSortTitle()+" asc, ":"")+solrReader.getSortId() , ORDER.asc);

                String cursorMark = CursorMarkParams.CURSOR_MARK_START;
                boolean readComplete = false;

                String titleField = null;
                for (Field field:solrReader.getFields()) {
                    if (field.getSchemaMapping().equals("title")) {
                        titleField = field.getName();
                        break;
                    }
                }

                while (!readComplete) {
                    query.set(CursorMarkParams.CURSOR_MARK_PARAM, cursorMark);
                    QueryResponse rsp = solr.query(query);
                    String nextCursorMark = rsp.getNextCursorMark();
                    for (SolrDocument doc : rsp.getResults()) {
                        if (doc.getFieldValues(titleField) == null) {
                            continue;
                        }

                        Map<String,String> resultsMap = new HashMap<String,String>();

                        solrReader.getFields().forEach(field -> {
                            if (doc.getFieldValues(field.getName()) != null) {
                                boolean hasValue = false;
                                doc.getFieldValues(field.getName()).forEach(result -> {
                                    if (hasValue) {
                                        return;
                                    }
                                    if (field.getSchemaMapping().equals("terms.identifier") && doc.getFieldValue(field.getName()).toString().contains("://")) {
                                        resultsMap.put(field.getSchemaMapping(), new String(Base64.encodeBase64(result.toString().getBytes())));
                                    } else {
                                        resultsMap.put(field.getSchemaMapping(), result.toString());
                                    }
                                });
                            }
                        });

                        if (!resultsMap.isEmpty()) {
                            mappedResults.add(resultsMap);
                        }
                    }
                    if (cursorMark.equals(nextCursorMark)) {
                        readComplete = true;
                    }
                    cursorMark = nextCursorMark;
                }
            } catch (Exception e) {
                e.getMessage();
                e.printStackTrace();
            } finally {
                try {
                    solr.close();
                } catch (IOException e) {
                    // TODO Auto-generated catch block
                    e.printStackTrace();
                }
            }
        });

        //TODO Provide an intermediate Interface/Implementation to hold all the SOLR specific code that's currently here, so we can just call Writer->write()

        int batchSize = 1000;
        if (!mappedResults.isEmpty()) {
            solrWriterRepo.findAll().forEach(writer -> {
                SolrClient writeableSolr = new HttpSolrClient(writer.getSource().getUri());

                try {
                    writeableSolr.ping();

                    logger.info("Writing to Destination SOLR: "+writer.getName());

                    List<SolrInputDocument> outputDocuments = new ArrayList<SolrInputDocument>();
                    mappedResults.forEach(map -> {
                        SolrInputDocument document = new SolrInputDocument();

                        writer.getOutputMappings().forEach(outputMapping -> {
                            if (map.containsKey(outputMapping.getInputField())) {
                                logger.debug("Writing field: "+outputMapping.getInputField());
                                outputMapping.getMappings().forEach(mapping -> {
                                        logger.debug("Indexing metatdata: "+outputMapping.getInputField()+" = '"+map.get(outputMapping.getInputField())+"' to field: "+mapping);
                                        document.addField(mapping, map.get(outputMapping.getInputField()));
                                });
                            } else {
                                logger.debug("Skipping field: "+outputMapping.getInputField());
                            }
                        });

                        outputDocuments.add(document);

                        if (outputDocuments.size() >= batchSize) {
                            try {
                                logger.debug("Writing batch of "+batchSize);
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

                    logger.info("Wrote "+mappedResults.size()+" documents to "+writer.getName());
                    UpdateResponse ur = writeableSolr.commit();
                    logger.debug("SOLR Commit response:");
                    logger.debug(ur.getResponse().toString());

                    writeableSolr.close();
                } catch(Exception e) {
                    e.printStackTrace();
                }
            });
        } else {
            logger.info("SOLR Writer results: There were no documents to write");
        }
    }

}
