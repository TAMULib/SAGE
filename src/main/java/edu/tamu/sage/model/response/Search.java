package edu.tamu.sage.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Search {

    private String query;
    
    private String sort;
    
    private long total;

    private int rows;
    
    private int start;

    @JsonIgnore
    private String solrQuery;

    private List<Filter> filters;

    public Search() {
        super();
        rows = 10;
        start = 0;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getSolrQuery() {
        return solrQuery;
    }

    public void setSolrQuery(String solrQuery) {
        this.solrQuery = solrQuery;
    }
    
    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getRows() {
        return rows;
    }

    public void setRows(int rows) {
        this.rows = rows;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

}
