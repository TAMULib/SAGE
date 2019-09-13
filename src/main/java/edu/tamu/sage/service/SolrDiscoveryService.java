package edu.tamu.sage.service;

import static edu.tamu.sage.service.SolrSourceService.ALL_FIELDS_KEY;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.tamu.sage.exceptions.DiscoveryContextBuildException;
import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.exceptions.SourceServiceException;
import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.FacetFields;
import edu.tamu.sage.model.MetadataField;
import edu.tamu.sage.model.response.DiscoveryContext;
import edu.tamu.sage.model.response.FacetFilter;
import edu.tamu.sage.model.response.Filter;
import edu.tamu.sage.model.response.Result;
import edu.tamu.sage.model.response.Search;
import edu.tamu.sage.model.response.SingleResultContext;
import edu.tamu.sage.model.response.SolrField;
import edu.tamu.sage.utility.ValueTemplateUtility;

@Service
public class SolrDiscoveryService {

    private final static Logger logger = LoggerFactory.getLogger(SolrDiscoveryService.class);

    @Autowired
    private SolrSourceService solrSourceService;

    private class ResultSet {
        public List<Result> results;
        public List<FacetFilter> facetFilters;

        public ResultSet(List<Result> results, List<FacetFilter> facetFilters) {
            this.results = results;
            this.facetFilters = facetFilters;
        }
    }

    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView, Map<String, String> filterMap, int rows, int start, String sort) throws DiscoveryContextBuildException, UnsupportedEncodingException {

        DiscoveryContext discoveryContext = DiscoveryContext.of(discoveryView);

        Search search = buildSearch(filterMap, discoveryView, rows, start, sort);

        ResultSet resultSet = querySolrCore(discoveryView, search, sort);
        List<Result> results = resultSet.results;
        List<FacetFilter> facetFilter = resultSet.facetFilters;

        discoveryContext.setResults(results);
        discoveryContext.setSearch(search);
        discoveryContext.setFacetFilters(facetFilter);

        return discoveryContext;
    }

    private Search buildSearch(Map<String, String> filterMap, DiscoveryView discoveryView, int rows, int start, String sort) throws DiscoveryContextBuildException, UnsupportedEncodingException {

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
                } else if (ALL_FIELDS_KEY.equals(key)) {
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

        query += (query.length() > 0 ? "&" : "") + "start=" + start + "&rows=" + rows + "&sort=" + sort;

        System.out.println("URL query: " + query);
        System.out.println("Solr query: " + solrQuery);

        search.setQuery(query);
        search.setSolrQuery(solrQuery);

        search.setRows(rows);
        search.setStart(start);
        search.setSort(sort);

        return search;
    }

    public List<SolrField> getAvailableFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        String uri = discoveryView.getSource().getUri();
        String filter = discoveryView.getFilter();
        try {
            return solrSourceService.getAvailableFields(uri, filter);
        } catch (SourceServiceException e) {
            throw new DiscoveryContextBuildException("Could not populate fields, uri: " + uri, e);
        }
    }

    public ResultSet querySolrCore(DiscoveryView discoveryView, Search search, String sort) {
        logger.info("Using Discovery View: " + discoveryView.getName() + " to read from SOLR Core: " + discoveryView.getSource().getName() + " - " + discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();
        List<FacetFilter> facetFilters = new ArrayList<FacetFilter>();

        SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri());

        try {

            solr.ping();

            SolrQuery query = new SolrQuery();

            query.setFacet(true);
            query.setFacetLimit(Integer.MAX_VALUE);

            discoveryView.getFacetFields().forEach(facetField -> {
                query.addFacetField(facetField.getKey());
            });

            String q = discoveryView.getFilter();

            if (search.getSolrQuery().length() > 0) {
                q += " AND " + search.getSolrQuery();
            }

            query.setRows(search.getRows());

            query.setStart(search.getStart());

            query.setQuery(q);

            query.addSort(sort, ORDER.asc);

            discoveryView.getResultMetadataFields().forEach(metadataField -> {
                if (metadataField.getKey().contains("{{")) {
                    ValueTemplateUtility.extractKeysFromtemplate(metadataField.getKey()).forEach(key -> {
                        query.addField(key);
                    });
                } else {
                    query.addField(metadataField.getKey());
                }
            });

            List<String> privellegedKeys = new ArrayList<>();

            privellegedKeys.add(discoveryView.getTitleKey());
            privellegedKeys.add(discoveryView.getUniqueIdentifierKey());
            privellegedKeys.add(discoveryView.getResourceThumbnailUriKey());
            privellegedKeys.add(discoveryView.getResourceLocationUriKey());

            privellegedKeys.forEach(rawKey -> {
                if (rawKey.contains("{{")) {
                    ValueTemplateUtility.extractKeysFromtemplate(rawKey).forEach(key -> {
                        query.addField(key);
                    });
                } else {
                    query.addField(rawKey);
                }
            });

            System.out.println(query);

            QueryResponse rsp = solr.query(query);

            SolrDocumentList docs = rsp.getResults();

            search.setTotal(docs.getNumFound());

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

    public SingleResultContext getSinlgeResult(DiscoveryView discoveryView, String resultId) throws DiscoveryContextBuildException {

        SingleResultContext sinlgeResultContext = null;

        try (SolrClient solr = new HttpSolrClient(discoveryView.getSource().getUri())) {
            SolrQuery query = new SolrQuery();

            query.setQuery(discoveryView.getUniqueIdentifierKey() + ":" + resultId);
            query.setRows(1);

            QueryResponse qr = solr.query(query);

            if (qr.getResults().size() > 0) {
                sinlgeResultContext = SingleResultContext.of(discoveryView, qr.getResults().get(0));
            }

        } catch (Exception e) {
            throw new DiscoveryContextBuildException("Could not find singe result", e);
        }

        return sinlgeResultContext;
    }

}
