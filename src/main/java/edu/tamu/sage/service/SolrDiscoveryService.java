package edu.tamu.sage.service;

import java.io.IOException;
import java.util.ArrayList;
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
import edu.tamu.sage.model.response.Filter;
import edu.tamu.sage.model.response.Result;
import edu.tamu.sage.model.response.Search;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrDiscoveryService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String ALL_FIELDS_KEY = "all_fields";

    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView, Map<String, String> filterMap) throws DiscoveryContextBuildException {

        DiscoveryContext discoveryContext = DiscoveryContext.of(discoveryView);

        List<SolrField> solrFields = getFields(discoveryView);

        Search search = buildSearch(filterMap, solrFields);

        List<Result> results = querySolrCore(discoveryView, search);

        discoveryContext.setResults(results);
        discoveryContext.setFields(solrFields);
        discoveryContext.setSearch(search);

        return discoveryContext;
    }

    private Search buildSearch(Map<String, String> filterMap, List<SolrField> solrFields) {
        Search search = new Search();
        List<Filter> filters = new ArrayList<Filter>();
        filterMap.forEach((key, values) -> {
            for (String value : values.split(",")) {
                filters.add(new Filter(key, value));
            }
        });
        search.setFilters(filters);
        String solrQuery = "";
        String query = "";
        for (Filter filter : filters) {
            String key = filter.getKey();
            query += key + "=";
            String[] values = filter.getValue().split(",");
            for (int i = 0; i < values.length; i++) {
                if (key.equals(ALL_FIELDS_KEY)) {
                    for (int j = 0; j < solrFields.size(); j++) {
                        SolrField field = solrFields.get(j);
                        if (!field.getName().equals(ALL_FIELDS_KEY)) {
                            solrQuery += field.getName() + ":\"" + values[i] + "\"";
                            if (j < solrFields.size()) {
                                solrQuery += " OR ";
                            }
                        }
                    }
                } else {
                    solrQuery += key + ":\"" + values[i] + "\"";
                    if (i < values.length) {
                        solrQuery += " OR ";
                    }
                }
                query += values[i];
                if (i < values.length) {
                    query += ",";
                }
            }
            query += "&";
        }
        if (query.length() > 2) {
            query = query.substring(0, query.length() - 2);
        }
        if (solrQuery.length() > 4) {
            solrQuery = "(" + solrQuery.substring(0, solrQuery.length() - 4) + ")";
        }
        search.setSolrQuery(solrQuery);
        search.setQuery(query);
        return search;
    }

    public List<SolrField> getFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        ArrayList<SolrField> solrFields = new ArrayList<SolrField>();
        SolrField defaultField = new SolrField();
        // TODO: ensure type is actual Solr datatype for text
        defaultField.setName(ALL_FIELDS_KEY);
        defaultField.setType("text");
        solrFields.add(defaultField);
        try (SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri())) {

            LukeRequest luke = new LukeRequest();
            luke.setNumTerms(0);
            LukeResponse lr = luke.process(solr);

            Map<String, FieldInfo> map = lr.getFieldInfo();

            SolrQuery query = new SolrQuery();
            query.setRows(1);

            for (Entry<String, FieldInfo> field : map.entrySet()) {
                if (field != null) {
                    String q = String.format("%s AND %s:*", discoveryView.getFilter(), field.getKey());
                    query.setQuery(q);
                    QueryResponse qr = solr.query(query);
                    if (qr.getResults().size() > 0) {
                        solrFields.add(SolrField.of(field));
                    }
                }
            }
        } catch (Exception e) {
            throw new DiscoveryContextBuildException("Could not populate fields", e);
        }

        return solrFields;
    }

    public List<Result> querySolrCore(DiscoveryView discoveryView, Search search) {
        logger.info("Using Reader: " + discoveryView.getName() + " to read from SOLR Core: " + discoveryView.getSource().getName() + " - " + discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();

        SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri());

        try {

            solr.ping();

            SolrQuery query = new SolrQuery();

            String q = discoveryView.getFilter();

            if (search.getSolrQuery().length() > 0) {
                q += " AND " + search.getSolrQuery();
            }

            query.set("q", q);

            query.set("rows", "500");

            query.addSort("id", ORDER.asc);

            discoveryView.getResultMetadataFields().forEach(f -> {
                query.addField(f.getKey());
            });

            query.addField(discoveryView.getTitleKey());
            query.addField(discoveryView.getUniqueIdentifierKey());

            QueryResponse rsp = solr.query(query);

            SolrDocumentList docs = rsp.getResults();
            for (SolrDocument doc : docs) {
                results.add(Result.of(doc, discoveryView));
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
