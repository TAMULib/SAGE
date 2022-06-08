package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.repo.DiscoveryViewRepo;
import edu.tamu.sage.model.repo.custom.WriterRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class DiscoveryViewRepoImpl extends AbstractWeaverRepoImpl<DiscoveryView, DiscoveryViewRepo> implements WriterRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/discovery-view";
    }
}
