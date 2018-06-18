package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.repo.custom.SolrCoreRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SolrCoreRepo extends WeaverRepo<SolrCore>, SolrCoreRepoCustom    {

}
