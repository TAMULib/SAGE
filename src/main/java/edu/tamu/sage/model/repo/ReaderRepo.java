package edu.tamu.sage.model.repo;


import edu.tamu.sage.model.Reader;
import edu.tamu.sage.model.repo.custom.ReaderRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface ReaderRepo extends WeaverRepo<Reader>, ReaderRepoCustom {
}
