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
import edu.tamu.sage.model.FacetFields;
import edu.tamu.sage.model.MetadataField;
import edu.tamu.sage.model.response.DiscoveryContext;
import edu.tamu.sage.model.response.FacetFilter;
import edu.tamu.sage.model.response.Filter;
import edu.tamu.sage.model.response.Result;
import edu.tamu.sage.model.response.Search;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrDiscoveryService {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private static final String ALL_FIELDS_KEY = "all_fields";

    private class ResultSet {
        public List<Result> results;
        public List<FacetFilter> facetFilters;

        public ResultSet(List<Result> results, List<FacetFilter> facetFilters) {
            this.results = results;
            this.facetFilters = facetFilters;
        }
    }

    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView, Map<String, String> filterMap) throws DiscoveryContextBuildException {

        DiscoveryContext discoveryContext = DiscoveryContext.of(discoveryView);

        Search search = buildSearch(filterMap, discoveryView);

        ResultSet resultSet = querySolrCore(discoveryView, search);
        List<Result> results = resultSet.results;
        List<FacetFilter> facetFilter = resultSet.facetFilters;

        discoveryContext.setResults(results);
        discoveryContext.setSearch(search);
        discoveryContext.setFacetFilters(facetFilter);

        return discoveryContext;
    }

    private Search buildSearch(Map<String, String> filterMap, DiscoveryView discoveryView) throws DiscoveryContextBuildException {

        // TODO: REDO!!!

        Search search = new Search();

        List<SolrField> availableFields = getAvailableFields(discoveryView);

        List<Filter> filters = new ArrayList<Filter>();

        String query = "";
        String solrQuery = "";

        for (Map.Entry<String, String> entry : filterMap.entrySet()) {
            String key = entry.getKey();
            String vs = entry.getValue();

            query += key + "=";
            solrQuery += "(";

            String[] values = vs.split(",");
            for (int i = 0; i < values.length; i++) {

                String label = key;

                if (discoveryView.getTitleKey().equals(key)) {
                    label = "Name";
                } else if(ALL_FIELDS_KEY.equals(key)) {
                    label = "All Fields";
                } else {
                    MetadataField m = discoveryView.findMetadataFieldByKey(key);
                    if (m != null) {
                        label = m.getLabel();
                    } else {
                        FacetFields ff = discoveryView.findFacetFieldByKey(key);
                        label = ff != null ? ff.getLabel() : label;
                    }
                }

                filters.add(new Filter(key, label, values[i]));

                if (key.equals(ALL_FIELDS_KEY)) {
                    if (solrQuery.endsWith(" AND (")) {
                        solrQuery = solrQuery.substring(0, solrQuery.length() - 6) + " OR (";
                    }
                    for (int j = 0; j < availableFields.size(); j++) {
                        SolrField field = availableFields.get(j);
                        if (!field.getName().equals(ALL_FIELDS_KEY)) {
                            solrQuery += field.getName() + ":\"" + values[i] + "\"";
                            if (j < availableFields.size()) {
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
                if (i < values.length - 1) {
                    query += ",";
                }
            }

            query += "&";
            if (key.equals(ALL_FIELDS_KEY)) {
                solrQuery = solrQuery.substring(0, solrQuery.length() - 4) + ")) OR ";
            } else {
                solrQuery = solrQuery.substring(0, solrQuery.length() - 4) + ") AND ";
            }
        }

        search.setFilters(filters);

        if (query.length() > 1) {
            query = query.substring(0, query.length() - 1);
        }
        if (solrQuery.length() > 5) {
            solrQuery = "(" + solrQuery.substring(0, solrQuery.length() - 5) + ")";
        }

        System.out.println("\n\n" + query + "\n\n");
        System.out.println("\n\n" + solrQuery + "\n\n");

        search.setQuery(query);
        search.setSolrQuery(solrQuery);

        return search;
    }

    public List<SolrField> getAvailableFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        ArrayList<SolrField> availableFields = new ArrayList<SolrField>();
        SolrField defaultField = new SolrField();
        // TODO: ensure type is actual Solr datatype for text
        defaultField.setName(ALL_FIELDS_KEY);
        defaultField.setType("text");
        availableFields.add(defaultField);
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
                        availableFields.add(SolrField.of(field));
                    }
                }
            }
        } catch (Exception e) {
            throw new DiscoveryContextBuildException("Could not populate fields", e);
        }

        return availableFields;
    }

    public ResultSet querySolrCore(DiscoveryView discoveryView, Search search) {
        logger.info("Using Reader: " + discoveryView.getName() + " to read from SOLR Core: " + discoveryView.getSource().getName() + " - " + discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();
        List<FacetFilter> facetFilters = new ArrayList<FacetFilter>();

        SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri());

        try {

            solr.ping();

            SolrQuery query = new SolrQuery();

            query.setFacet(true);

            discoveryView.getFacetFields().forEach(facetField -> {
                query.addFacetField(facetField.getKey());
            });

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

            discoveryView.getFacetFields().forEach(facetField -> {
                facetFilters.add(FacetFilter.of(rsp.getFacetField(facetField.getKey()), facetField));
            });

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

        return new ResultSet(results, facetFilters);
    }

}
