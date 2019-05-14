package edu.tamu.sage.job;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.Job;
import edu.tamu.sage.model.repo.JobRepo;
import edu.tamu.sage.service.ProcessorService;

@Service
public class JobRunner {
    @Autowired
    JobRepo jobRepo;

    @Autowired
    ProcessorService processorService;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", Locale.US);

    private static final String START_TIME_KEY = "startTime";
    private static final String DATE_KEY = "date";
    private static final String DAYS_KEY = "days";
    private static final String MONTHS_KEY = "months";

    @Scheduled(cron = "0 0/30 * * * ?")
    private void runJobs() {
        logger.debug("Checking "+jobRepo.findByScheduleActiveTrue().size()+" Active Jobs");
        LocalDateTime schedulerStarted = java.time.LocalDateTime.now(ZoneId.of("UTC"));
        jobRepo.findByScheduleActiveTrue().forEach(j -> {
            switch (j.getSchedule().getFrequency()) {
                case ONCE:
                    LocalTime jobStartTime = buildJobStartTime(j.getSchedule().getScheduleData().get(START_TIME_KEY));
                    LocalDateTime jobDate = LocalDateTime.parse(j.getSchedule().getScheduleData().get(DATE_KEY), getDateTimeFormatter());

                    if (jobDate.getDayOfMonth() == schedulerStarted.getDayOfMonth() && jobStartTime.getHour() == schedulerStarted.getHour() && jobStartTime.getMinute() == schedulerStarted.getMinute()) {
                        startJob(j);
                        j.getSchedule().setActive(false);
                        jobRepo.save(j);
                    }
                break;
                case HOURLY:
                    List<Integer> hourlyDaysToRun = buildDaysToRun(j.getSchedule().getScheduleData().get(DAYS_KEY));

                    if (schedulerStarted.getMinute() == 0 && hourlyDaysToRun.contains(schedulerStarted.getDayOfWeek().getValue())) {
                        startJob(j);
                    }
                break;
                case DAILY:
                    List<Integer> daysToRun = buildDaysToRun(j.getSchedule().getScheduleData().get(DAYS_KEY));
                    LocalTime dailyJobStartTime = buildJobStartTime(j.getSchedule().getScheduleData().get(START_TIME_KEY));

                    if (daysToRun.contains(schedulerStarted.getDayOfWeek().getValue()) && dailyJobStartTime.getHour() == schedulerStarted.getHour() && dailyJobStartTime.getMinute() == schedulerStarted.getMinute()) {
                        startJob(j);
                    }
                break;
                case MONTHLY:
                    LocalTime monthlyStartTime = buildJobStartTime(j.getSchedule().getScheduleData().get(START_TIME_KEY));
                    List<Integer> monthsToRun = buildDaysToRun(j.getSchedule().getScheduleData().get(MONTHS_KEY));

                    if (monthsToRun.contains(schedulerStarted.getMonth().getValue()) && schedulerStarted.getDayOfMonth() == 1 && monthlyStartTime.getHour() == schedulerStarted.getHour() && monthlyStartTime.getMinute() == schedulerStarted.getMinute()) {
                        startJob(j);
                    }
                break;
            }
        });
    }

    private void startJob(Job job) {
        logger.debug("Starting Job: "+job.getName()+" "+job.getSchedule().getFrequency());
        processorService.process(job);
    }

    private LocalTime buildJobStartTime(String startTimeString) {
        return LocalTime.parse(startTimeString, getDateTimeFormatter());
    }

    private List<Integer> buildDaysToRun(String days) {
        return Arrays.asList(days.split(",")).stream().map(x -> Integer.valueOf(x)).collect(Collectors.toList());
    }

    protected DateTimeFormatter getDateTimeFormatter() {
        return dateTimeFormatter;
    }
}
