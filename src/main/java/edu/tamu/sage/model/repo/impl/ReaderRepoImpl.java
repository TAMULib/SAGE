package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.repo.ReaderRepo;
import edu.tamu.sage.model.repo.custom.ReaderRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class ReaderRepoImpl extends AbstractWeaverRepoImpl<Reader, ReaderRepo> implements ReaderRepoCustom  {

    @Override
    protected String getChannel() {
        return "/channel/reader/solr";
    }

}