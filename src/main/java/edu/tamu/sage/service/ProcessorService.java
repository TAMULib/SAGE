package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.repo.SolrCoreRepo;

@Service
public class ProcessorService {
    @Autowired
    private SolrCoreRepo solrCoreRepo;
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    public void process() {
        logger.info("Processing!");
        
        List<Map<String,String>> mappedResults = new ArrayList<Map<String,String>>();

        //gather Readers
        //loop and Reader->read()        
        List<SolrCore> solrCores = solrCoreRepo.findAll();
        solrCores.forEach(solrCore -> {
            logger.info("SOLR Uri: "+solrCore.getUri());
            SolrClient solr = new HttpSolrClient(solrCore.getUri());

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
                    solrCore.getFields().forEach(field -> {
                        if (doc.getFieldValue(field.getName()) != null) {
                            resultsMap.put(field.getSchemaMapping(), doc.getFieldValue(field.getName()).toString());
                        }
                    });
                    mappedResults.add(resultsMap);
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
        mappedResults.forEach(r -> {
            logger.info("------- RESULT -----------");
            r.forEach((k,v) -> {
               logger.info(k+": "+v); 
            });
        });
        //gather Writers
        //loop and Writer->write()
    }

}
