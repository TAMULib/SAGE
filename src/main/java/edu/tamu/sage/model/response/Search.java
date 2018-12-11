package edu.tamu.sage.model.response;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Search {

    private String query;

    @JsonIgnore
    private String solrQuery;

    private Map<String, String> filters;

    public Search() {
        super();
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getSolrQuery() {
        return solrQuery;
    }

    public void setSolrQuery(String solrQuery) {
        this.solrQuery = solrQuery;
    }

    public Map<String, String> getFilters() {
        return filters;
    }

    public void setFilters(Map<String, String> filters) {
        this.filters = filters;
    }

    public static Search of(Map<String, String> filters) {
        Search search = new Search();
        search.setFilters(filters);
        String solrQuery = "";
        String query = "";
        for (Map.Entry<String, String> entry : filters.entrySet()) {
            String key = entry.getKey();
            query += key + "=";
            String[] values = entry.getValue().split(",");
            for (int i = 0; i < values.length; i++) {
                solrQuery += key + ":\"" + values[i] + "\"";
                query += values[i];
                if (i < values.length) {
                    query += ",";
                    solrQuery += " OR ";
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
        System.out.println("\n\n\n\n" + solrQuery + "\n\n\n\n");
        System.out.println("\n\n\n\n" + query + "\n\n\n\n");
        search.setSolrQuery(solrQuery);
        search.setQuery(query);
        return search;
    }

}
