package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.response.UpdateResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.SolrInputDocument;
import org.codehaus.plexus.util.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.SolrReader;
import edu.tamu.sage.model.repo.SolrReaderRepo;
import edu.tamu.sage.model.repo.SolrWriterRepo;

@Service
public class ProcessorService {
    @Autowired
    private SolrReaderRepo solrReaderRepo;
    
    @Autowired
    private SolrWriterRepo solrWriterRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    public void process() {
        logger.info("Processing!");
        
        List<Map<String,String>> mappedResults = new ArrayList<Map<String,String>>();

        //gather Readers
        //loop and Reader->read()        
        List<SolrReader> solrReaders = solrReaderRepo.findAll();
        solrReaders.forEach(solrReader -> {
            logger.info("Using Reader: "+solrReader.getName()+" to read from SOLR Core: "+solrReader.getSolrCore().getName()+" - "+solrReader.getSolrCore().getUri());
            SolrClient solr = new HttpSolrClient(solrReader.getSolrCore().getUri());

            try {
                solr.ping();               

                SolrQuery query = new SolrQuery();
                query.set("q", "*");
                query.set("rows", "100");

                QueryResponse queryResponse = solr.query(query);
                
                SolrDocumentList results = queryResponse.getResults();
                for (int i = 0; i < results.size(); ++i) {
                    Map<String,String> resultsMap = new HashMap<String,String>();                    
                    SolrDocument doc = (SolrDocument) results.get(i);
                    solrReader.getFields().forEach(field -> {
                        if (doc.getFieldValue("title") != null && doc.getFieldValue(field.getName()) != null) {
                            if (field.getName().equals("id") && doc.getFieldValue(field.getName()).toString().contains("://")) {
                                resultsMap.put(field.getSchemaMapping(), new String(Base64.encodeBase64(doc.getFieldValue(field.getName()).toString().getBytes())));
                            } else {
                                resultsMap.put(field.getSchemaMapping(), doc.getFieldValue(field.getName()).toString());
                            }
                        }
                    });

                    if (!resultsMap.isEmpty()) {
                        mappedResults.add(resultsMap);
                    }
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

        //gather Writers
        //loop and Writer->write()
        
        solrWriterRepo.findAll().forEach(writer -> {
            
            SolrClient writeableSolr = new HttpSolrClient(writer.getSolrCore().getUri());
            
            try {
                writeableSolr.ping();
    
                logger.info("Writing to Destination SOLR...");
                mappedResults.forEach(map -> {
                    logger.info("Creating SOLR Document");
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
                    
                    try {
                        writeableSolr.add(document);
                    } catch (SolrServerException | IOException e) {
                        logger.error("Error adding SOLR document");
                        e.printStackTrace();
                    }
                });

                UpdateResponse ur = writeableSolr.commit();
                logger.debug("SOLR Commit response:");
                logger.debug(ur.getResponse().toString());
    
                writeableSolr.close();
            } catch(Exception e) {
                e.printStackTrace();
            }
        });            
    }

}
