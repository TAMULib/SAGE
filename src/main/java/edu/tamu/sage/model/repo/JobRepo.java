package edu.tamu.sage.model.repo;

import java.util.List;

import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.repo.custom.JobRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface JobRepo extends WeaverRepo<Job>, JobRepoCustom {

    public List<Job> findAllByOrderByNameAsc();

    public List<Job> findByScheduleActiveTrueOrderByNameAsc();
}
