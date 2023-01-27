package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.InternalMetadata;
import edu.tamu.sage.model.repo.custom.InternalMetadataRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;
import java.util.List;

public interface InternalMetadataRepo extends WeaverRepo<InternalMetadata>, InternalMetadataRepoCustom {

  public List<InternalMetadata> findAllByOrderByFieldAsc();
}
