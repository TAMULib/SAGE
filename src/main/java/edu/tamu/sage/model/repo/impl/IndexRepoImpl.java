package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.Index;
import edu.tamu.sage.model.repo.IndexRepo;
import edu.tamu.sage.model.repo.custom.IndexRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class IndexRepoImpl extends AbstractWeaverRepoImpl<Index, IndexRepo> implements IndexRepoCustom  {

    @Override
    protected String getChannel() {
        return "/channel/index";
    }

}
