package edu.tamu.sage.service;

import static edu.tamu.sage.service.SolrSourceService.ALL_FIELDS_KEY;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrQuery.ORDER;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.apache.solr.client.solrj.util.ClientUtils;
import org.apache.solr.common.SolrDocument;
import org.apache.solr.common.SolrDocumentList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.tamu.sage.enums.QueryOperandType;
import edu.tamu.sage.enums.QueryParserType;
import edu.tamu.sage.exceptions.DiscoveryContextBuildException;
import edu.tamu.sage.exceptions.SourceServiceException;
import edu.tamu.sage.model.DiscoveryView;
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

    private final static String FILTER_WILDCARD = "*:*";
    private final static String FILTER_VALUE_PREFIX = "fv::";

    private final static Logger logger = LoggerFactory.getLogger(SolrDiscoveryService.class);

    @Autowired
    private SolrSourceService solrSourceService;

    @Autowired
    private ObjectMapper objectMapper;

    private class ResultSet {
        public List<Result> results;
        public List<FacetFilter> facetFilters;

        public ResultSet(List<Result> results, List<FacetFilter> facetFilters) {
            this.results = results;
            this.facetFilters = facetFilters;
        }
    }

    public DiscoveryContext buildDiscoveryContext(DiscoveryView discoveryView, String field, String value, Pageable page, int offset, Map<String, String> filterMap) throws DiscoveryContextBuildException, UnsupportedEncodingException {
        DiscoveryContext discoveryContext = DiscoveryContext.of(discoveryView);
        Search search = new Search();

        search.setField(field.equalsIgnoreCase(ALL_FIELDS_KEY) ? "" : field);
        search.setValue(value);
        search.setLabel("");

        if (!search.getValue().isEmpty()) {
            String matchField = field.isEmpty() ? ALL_FIELDS_KEY : field;

            discoveryView.getSearchFields().forEach(searchField -> {
                if (searchField.getKey().equalsIgnoreCase(matchField)) {
                    search.setLabel(searchField.getLabel());
                }
            });
        }

        String query = "";
        if (search.getField().isEmpty() && search.getValue().isEmpty()) {
            query = "*:*";
        } else if (search.getField().isEmpty()) {
            query = search.getValue();
        } else {
            query = search.getField() + ":" + search.getValue();
        }

        SolrQuery solrQuery = new SolrQuery(query);

        if (discoveryView.getFilter().isEmpty()) {
            if (discoveryView.getSource().getRequiresFilter()) {
                solrQuery.addFilterQuery(FILTER_WILDCARD);
            }
        } else {
            solrQuery.addFilterQuery(discoveryView.getFilter());
        }

        // Only filter against designated facet fields.
        List<Filter> filters = new ArrayList<Filter>();
        if (!discoveryView.getFacetFields().isEmpty()) {
            discoveryView.getFacetFields().forEach(facetField -> {
                solrQuery.addFacetField(facetField.getKey());

                String filterKey = facetField.getKey();
                if (filterMap.containsKey(filterKey)) {
                    String[] filterValues = filterMap.get(filterKey).split(","+FILTER_VALUE_PREFIX, -1);
                    filterValues[0] = filterValues[0].replace(FILTER_VALUE_PREFIX,"");
                    for (int i = 0; i < filterValues.length; i++) {
                        Filter filter = new Filter();
                        filter.setKey(facetField.getKey());
                        filter.setLabel(facetField.getLabel());
                        filter.setValue(filterValues[i]);
                        filters.add(filter);
                        solrQuery.addFilterQuery(facetField.getKey() + ":" + ClientUtils.escapeQueryChars(filter.getValue()));
                    }
                }
            });

            solrQuery.setFacet(true);
            solrQuery.setFacetLimit(Integer.MAX_VALUE);
        }

        search.setFilters(filters);

        String queryParser = discoveryView.getQueryParser();
        if (queryParser != null) {
            if (queryParser.equalsIgnoreCase(QueryParserType.EDISMAX.toString()) || queryParser.equalsIgnoreCase(QueryParserType.DISMAX.toString())) {
                solrQuery.setParam("defType", queryParser.toLowerCase());
            }
        }

        String defaultOperand = discoveryView.getDefaultOperand();
        if (defaultOperand != null) {
            if (defaultOperand.equalsIgnoreCase(QueryOperandType.AND.toString()) || defaultOperand.equalsIgnoreCase(QueryOperandType.OR.toString())) {
                solrQuery.setParam("q.op", defaultOperand);
            }
        }

        solrQuery.setRows(page.getPageSize());
        solrQuery.setStart((page.getPageNumber() * page.getPageSize()) + offset);

        if (page.getSort() != null) {
            page.getSort().forEach(order -> {
                solrQuery.addSort(order.getProperty(), order.getDirection().isDescending() ? ORDER.desc : ORDER.asc);
            });
        }

        ResultSet resultSet = querySolrCore(discoveryView, solrQuery, search);
        search.setStart((page.getPageNumber() * page.getPageSize()) + offset);

        List<Result> results = resultSet.results;
        List<FacetFilter> facetFilter = resultSet.facetFilters;

        discoveryContext.setSearch(search);
        discoveryContext.setResults(results);
        discoveryContext.setFacetFilters(facetFilter);

        return discoveryContext;
    }

    public List<SolrField> getAvailableFields(DiscoveryView discoveryView) throws DiscoveryContextBuildException {
        String uri = discoveryView.getSource().getUri();
        String filter = discoveryView.getFilter();
        if (discoveryView.getSource().getRequiresFilter() && filter.isEmpty()) {
            filter = FILTER_WILDCARD;
        }
        try {
            return solrSourceService.getAvailableFields(uri, filter);
        } catch (SourceServiceException e) {
            throw new DiscoveryContextBuildException("Could not populate fields, uri: " + uri, e);
        }
    }

    public SingleResultContext getSingleResult(DiscoveryView discoveryView, String resultId) throws DiscoveryContextBuildException {
        SingleResultContext singleResultContext = null;
        SolrDocument solrDocument = getSingleResultDocument(discoveryView, resultId);

        if (solrDocument != null) {
            singleResultContext = SingleResultContext.of(discoveryView, solrDocument);
        }

        return singleResultContext;
    }

    public SingleResultContext getSingleResultFull(DiscoveryView discoveryView, String resultId) throws DiscoveryContextBuildException {
        SingleResultContext singleResultContext = null;
        SolrDocument solrDocument = getSingleResultDocument(discoveryView, resultId);

        if (solrDocument != null) {
            singleResultContext = SingleResultContext.fullViewOf(discoveryView, solrDocument);
        }

        return singleResultContext;
    }

    private SolrDocument getSingleResultDocument(DiscoveryView discoveryView, String resultId) throws DiscoveryContextBuildException {
        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(discoveryView.getSource().getUri());
        try (SolrClient solr = builder.build()) {
            SolrQuery query = new SolrQuery();

            query.setQuery(discoveryView.getUniqueIdentifierKey() + ":" + resultId);
            query.setRows(1);

            QueryResponse qr = solr.query(query);

            if (qr.getResults().size() > 0) {
                SolrDocument doc = qr.getResults().get(0);
                processResult(doc);
                return doc;
            }
            return null;
        } catch (Exception e) {
            throw new DiscoveryContextBuildException("Could not find single result", e);
        }
    }

    private ResultSet querySolrCore(DiscoveryView discoveryView, SolrQuery query, Search search) {
        logger.info("Using Discovery View: " + discoveryView.getName() + " to read from SOLR Core: " + discoveryView.getSource().getName() + " - " + discoveryView.getSource().getUri());

        List<Result> results = new ArrayList<Result>();
        List<FacetFilter> facetFilters = new ArrayList<FacetFilter>();

        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(discoveryView.getSource().getUri());
        SolrClient solr = builder.build();

        search.setTotal(0);

        try {
            solr.ping();

            Set<String> fields = new HashSet<String>();

            discoveryView.getResultMetadataFields().forEach(metadataField -> {
                if (metadataField.getKey().contains("{{")) {
                    ValueTemplateUtility.extractKeysFromTemplate(metadataField.getKey()).forEach(key -> {
                        fields.add(key);
                    });
                } else {
                    fields.add(metadataField.getKey());
                }
            });

            List<String> privilegedKeys = new ArrayList<>();

            privilegedKeys.add(discoveryView.getTitleKey());
            privilegedKeys.add(discoveryView.getUniqueIdentifierKey());
            privilegedKeys.add(discoveryView.getResourceThumbnailUriKey());
            privilegedKeys.add(discoveryView.getResourceLocationUriKey());
            privilegedKeys.add(discoveryView.getManifestUriKey());

            privilegedKeys.stream().filter(rawKey -> StringUtils.isNotEmpty(rawKey)).forEach(rawKey -> {
                if (rawKey.contains("{{")) {
                    ValueTemplateUtility.extractKeysFromTemplate(rawKey).forEach(key -> {
                        fields.add(key);
                    });
                } else {
                    fields.add(rawKey);
                }
            });

            fields.forEach(field -> query.addField(field));

            logger.info("{}", query);

            QueryResponse rsp = solr.query(query);

            SolrDocumentList docs = rsp.getResults();

            search.setTotal(docs.getNumFound());

            for (SolrDocument doc : docs) {
                processResult(doc);
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

    private void processResult(SolrDocument solrDoc) {
        solrDoc.getFieldNames().forEach(name -> {
            try {
                solrDoc.setField(name, objectMapper.writeValueAsString(solrDoc.getFieldValues(name)));
            } catch (JsonProcessingException e) {
                e.printStackTrace();
            }
         });
    }

}
