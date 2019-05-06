package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.InternalMetadatum;
import edu.tamu.sage.model.repo.InternalMetadataRepo;
import edu.tamu.sage.model.repo.custom.InternalMetadataRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class InternalMetadataRepoImpl extends AbstractWeaverRepoImpl<InternalMetadatum, InternalMetadataRepo> implements InternalMetadataRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/internal/metadata";
    }
}
