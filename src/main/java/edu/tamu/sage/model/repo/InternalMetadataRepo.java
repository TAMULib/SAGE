package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.InternalMetadata;
import edu.tamu.sage.model.repo.custom.InternalMetadataRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface InternalMetadataRepo extends WeaverRepo<InternalMetadata>, InternalMetadataRepoCustom {

}
