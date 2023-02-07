package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.Writer;
import edu.tamu.sage.model.repo.custom.WriterRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;
import java.util.List;

public interface WriterRepo extends WeaverRepo<Writer>, WriterRepoCustom {

    public List<Writer> findAllByOrderByNameAsc();
}
