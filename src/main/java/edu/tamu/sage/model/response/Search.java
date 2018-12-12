package edu.tamu.sage.model.response;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.JsonNode;

public class Search {

    private String query;

    @JsonIgnore
    private String solrQuery;
    
    private List<Filter> filters;

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

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

    public static Search of(JsonNode searchNode) {
        
        List<Filter> filters = new ArrayList<Filter>();
        
        System.out.println("****");
        System.out.println(searchNode);
        System.out.println("*****");

        searchNode.forEach(m->{
            System.out.println(searchNode);
            filters.add(new Filter(m.get("key").asText(),m.get("value").asText()));
        });
        
        Search search = new Search();
        search.setFilters(filters);
        String solrQuery = "";
        String query = "";
        for (Filter filter : filters) {
            String key = filter.getKey();
            query += key + "=";
            String[] values = filter.getValue().split(",");
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
