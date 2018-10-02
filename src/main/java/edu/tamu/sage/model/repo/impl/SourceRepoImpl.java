package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.Source;
import edu.tamu.sage.model.repo.SourceRepo;
import edu.tamu.sage.model.repo.custom.SourceRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class SourceRepoImpl extends AbstractWeaverRepoImpl<Source, SourceRepo> implements SourceRepoCustom  {

    @Override
    protected String getChannel() {
        return "/channel/source/solr";
    }

}
