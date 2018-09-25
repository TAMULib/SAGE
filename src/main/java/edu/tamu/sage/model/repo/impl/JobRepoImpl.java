package edu.tamu.sage.model.repo.impl;

import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.repo.JobRepo;
import edu.tamu.sage.model.repo.custom.JobRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

public class JobRepoImpl extends AbstractWeaverRepoImpl<Job, JobRepo> implements JobRepoCustom {

    @Override
    protected String getChannel() {
        return "/channel/job";
    }
}
