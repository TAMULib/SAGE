package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.Source;
import edu.tamu.sage.model.repo.custom.SourceRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SourceRepo extends WeaverRepo<Source>, SourceRepoCustom    {

}
