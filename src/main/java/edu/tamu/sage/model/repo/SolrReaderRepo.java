package edu.tamu.sage.model.repo;


import edu.tamu.sage.model.SolrReader;
import edu.tamu.sage.model.repo.custom.SolrReaderRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SolrReaderRepo extends WeaverRepo<SolrReader>, SolrReaderRepoCustom {
}
