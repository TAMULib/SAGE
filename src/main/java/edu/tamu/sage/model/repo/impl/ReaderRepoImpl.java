package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.SolrReader;
import edu.tamu.sage.model.repo.SolrReaderRepo;
import edu.tamu.sage.model.repo.custom.SolrReaderRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class SolrReaderRepoImpl extends AbstractWeaverRepoImpl<SolrReader, SolrReaderRepo> implements SolrReaderRepoCustom  {

    @Override
    protected String getChannel() {
        return "/channel/reader/solr";
    }

}