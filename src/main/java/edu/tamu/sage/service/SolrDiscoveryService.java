package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.DiscoveryView;

@Service
public class SolrDiscoveryService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    public List<Map<String,String>> readSolrCore(DiscoveryView discoveryView) {
        logger.info("Using Reader: "+discoveryView.getName()+" to read from SOLR Core: "+discoveryView.getSource().getName()+" - "+discoveryView.getSource().getUri());

        List<Map<String,String>> mappedResults = new ArrayList<Map<String,String>>();

        SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri());

        try {
            
            solr.ping();

            SolrQuery query = new SolrQuery();
            query.set("q", discoveryView.getFilter());
            query.set("rows", "500");

            query.addSort("id" , ORDER.asc);

            QueryResponse rsp = solr.query(query);
            
            SolrDocumentList docs = rsp.getResults();
            for (SolrDocument doc : docs) {
                Collection<String> fieldNames = doc.getFieldNames();
                Map<String,String> resultsMap = new HashMap<String,String>();
                for (String s: fieldNames) {
                    System.out.println(doc.getFieldValue(s));
                    resultsMap.put(s, doc.getFieldValue(s).toString());
                }
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
        return mappedResults;
    }

}
