package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.repo.custom.IndexRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface IndexRepo extends WeaverRepo<SolrCore>, IndexRepoCustom    {

}
