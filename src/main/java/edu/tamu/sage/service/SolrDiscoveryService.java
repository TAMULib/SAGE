package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.apache.solr.common.params.CommonParams;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.common.util.SimpleOrderedMap;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import edu.tamu.sage.exceptions.DiscoveryContextBuildException;
import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.response.DiscoveryContext;
import edu.tamu.sage.model.response.Result;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrDiscoveryService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        
        List<Result> results = querySolrCore(discoveryView);
        List<SolrField> solrFields = getFields(discoveryView);
        
        DiscoveryContext discoveryContext = new DiscoveryContext(discoveryView.getName());
        
        discoveryContext.setResults(results);
        discoveryContext.setFields(solrFields);
        
        return discoveryContext;
    }
    
    public List<SolrField> getFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        ArrayList<SolrField> solrFields = new ArrayList<SolrField>();
        try(SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri())) {
            SolrQuery query = new SolrQuery();
            query.add(CommonParams.QT, "/schema/fields");
            query.setQuery(discoveryView.getFilter());
            query.setRows(Integer.MAX_VALUE);
            QueryResponse response = solr.query(query);
            NamedList responseHeader = response.getResponseHeader();
            ArrayList<SimpleOrderedMap> fields = (ArrayList<SimpleOrderedMap>) response.getResponse().get("fields");
            for (SimpleOrderedMap field : fields) {
                if(field != null) {
                    System.out.println(field.toString());
                    solrFields.add(SolrField.of(field));    
                }
            }
        } catch(Exception e) {
            throw new DiscoveryContextBuildException("Could not populate fields", e);
        }
        
        return solrFields;
    }
    
    public List<Result> querySolrCore(DiscoveryView discoveryView) {
        logger.info("Using Reader: "+discoveryView.getName()+" to read from SOLR Core: "+discoveryView.getSource().getName()+" - "+discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();

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
                results.add(Result.of(doc, fieldNames));
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
                
        return results;
    }

}
