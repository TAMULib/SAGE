package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.SolrWriter;
import edu.tamu.sage.model.repo.custom.SolrWriterRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SolrWriterRepo extends WeaverRepo<SolrWriter>, SolrWriterRepoCustom {

}
