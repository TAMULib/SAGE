package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.SolrWriter;
import edu.tamu.sage.model.repo.SolrWriterRepo;
import edu.tamu.sage.model.repo.custom.SolrWriterRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class SolrWriterRepoImpl extends AbstractWeaverRepoImpl<SolrWriter, SolrWriterRepo> implements SolrWriterRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/writer/solr";
    }    
}
