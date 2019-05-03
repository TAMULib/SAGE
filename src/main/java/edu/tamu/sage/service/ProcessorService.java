package edu.tamu.sage.service;

import java.util.List;

import edu.tamu.sage.model.Job;

public interface ProcessorService {

    public boolean process(Job job);

    public void process(List<Job> jobs);

}
