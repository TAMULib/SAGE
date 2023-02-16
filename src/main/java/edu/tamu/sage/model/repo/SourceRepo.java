package edu.tamu.sage.model.repo;

import java.util.List;

import edu.tamu.sage.model.Source;
import edu.tamu.sage.model.repo.custom.SourceRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SourceRepo extends WeaverRepo<Source>, SourceRepoCustom    {

    public List<Source> findAllByOrderByNameAsc();

    public List<Source> findByReadOnlyOrderByNameAsc(Boolean readOnly);
}
