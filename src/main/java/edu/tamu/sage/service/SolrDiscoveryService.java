package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import edu.tamu.sage.exceptions.DiscoveryContextBuildException;
import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.response.DiscoveryContext;
import edu.tamu.sage.model.response.Result;
import edu.tamu.sage.model.response.Search;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrDiscoveryService {
    
    private Logger logger = LoggerFactory.getLogger(this.getClass());
    
    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView, Search search) throws DiscoveryContextBuildException {
        
        DiscoveryContext discoveryContext = DiscoveryContext.of(discoveryView);
        
        List<Result> results = querySolrCore(discoveryView, search);
        List<SolrField> solrFields = getFields(discoveryView);
        
        discoveryContext.setResults(results);
        discoveryContext.setFields(solrFields);
        discoveryContext.setSearch(search);
        
        return discoveryContext;
    }
    
    public List<SolrField> getFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        ArrayList<SolrField> solrFields = new ArrayList<SolrField>();
        try(SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri())) {
          
          LukeRequest luke = new LukeRequest();
          luke.setNumTerms(0);
          LukeResponse lr = luke.process( solr );
          
          Map<String, FieldInfo> map = lr.getFieldInfo();
          
          SolrQuery query = new SolrQuery();
          query.setRows(1);
          
          for (Entry<String, FieldInfo> field : map.entrySet()) {
              if(field != null) {
                  String q = String.format("%s AND %s:*", discoveryView.getFilter(), field.getKey());
                  query.setQuery(q);
                  QueryResponse qr = solr.query(query);
                  if(qr.getResults().size() > 0) {
                      solrFields.add(SolrField.of(field));
                  }    
              }
          }
        } catch(Exception e) {
            throw new DiscoveryContextBuildException("Could not populate fields", e);
        }
        
        return solrFields;
    }
        
    public List<Result> querySolrCore(DiscoveryView discoveryView, Search search) {
        logger.info("Using Reader: "+discoveryView.getName()+" to read from SOLR Core: "+discoveryView.getSource().getName()+" - "+discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();

        SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri());

        try {
            
            solr.ping();

            SolrQuery query = new SolrQuery();
            
            
            String q = discoveryView.getFilter();
            
            if(search.getSolrQuery().length() > 0) {
                q += " AND " + search.getSolrQuery();
            }
            
            System.out.println("\n\n" + q + "\n\n");
            
            query.set("q", q);
            
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
