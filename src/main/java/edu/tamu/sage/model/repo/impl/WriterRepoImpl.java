package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.Writer;
import edu.tamu.sage.model.repo.WriterRepo;
import edu.tamu.sage.model.repo.custom.WriterRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class WriterRepoImpl extends AbstractWeaverRepoImpl<Writer, WriterRepo> implements WriterRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/writer/solr";
    }    
}
