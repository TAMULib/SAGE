package edu.tamu.sage.model;

import javax.persistence.Embeddable;

@Embeddable
public class MetadataField {
    
    private String key;
    
    private String label;
    
    private String type;

    private boolean searchable;

    private boolean sortable;
    
    private boolean inList;
    
    private boolean inGrid;
    
    private boolean singleItem;
    
    public MetadataField() {
        super();
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public boolean isSearchable() {
        return searchable;
    }

    public void setSearchable(boolean searchable) {
        this.searchable = searchable;
    }

    public boolean isSortable() {
        return sortable;
    }

    public void setSortable(boolean sortable) {
        this.sortable = sortable;
    }

    public boolean isInList() {
        return inList;
    }

    public void setInList(boolean inList) {
        this.inList = inList;
    }

    public boolean isInGrid() {
        return inGrid;
    }

    public void setInGrid(boolean inGrid) {
        this.inGrid = inGrid;
    }

    public boolean isSingleItem() {
        return singleItem;
    }

    public void setSingleItem(boolean singleItem) {
        this.singleItem = singleItem;
    }

}
