package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.repo.custom.JobRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;
import java.util.List;

public interface OperatorRepo extends WeaverRepo<BaseOp>, JobRepoCustom {

    public List<BaseOp> findAllByOrderByNameAsc();
}
