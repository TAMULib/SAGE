package edu.tamu.sage.model.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class Search {

    private String field;

    private String value;

    private String label;

    private long start;

    private long total;

    @JsonIgnore
    private String solrQuery;

    private List<Filter> filters;

    public Search() {
        super();
        field = "";
        value = "";
        start = 0;
        total = 0;
    }

    public String getSolrQuery() {
        return solrQuery;
    }

    public void setSolrQuery(String solrQuery) {
        this.solrQuery = solrQuery;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public long getStart() {
        return start;
    }

    public void setStart(long start) {
        this.start = start;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<Filter> getFilters() {
        return filters;
    }

    public void setFilters(List<Filter> filters) {
        this.filters = filters;
    }

}
