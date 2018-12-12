package edu.tamu.sage.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

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

}
