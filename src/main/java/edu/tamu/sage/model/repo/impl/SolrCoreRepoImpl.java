package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.repo.SolrCoreRepo;
import edu.tamu.sage.model.repo.custom.SolrCoreRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class SolrCoreRepoImpl extends AbstractWeaverRepoImpl<SolrCore, SolrCoreRepo> implements SolrCoreRepoCustom  {

    @Override
    protected String getChannel() {
        return "/channel/index";
    }

}
