package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.InternalMetadata;
import edu.tamu.sage.model.repo.InternalMetadataRepo;
import edu.tamu.sage.model.repo.custom.InternalMetadataRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class InternalMetadataRepoImpl extends AbstractWeaverRepoImpl<InternalMetadata, InternalMetadataRepo> implements InternalMetadataRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/internal/metadata";
    }
}
