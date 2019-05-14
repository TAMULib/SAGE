package edu.tamu.sage.model;

import java.util.HashMap;
import java.util.Map;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.MapKeyColumn;

@Embeddable
public class Schedule {

    @Column
    private Boolean active;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Frequency frequency;

    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name = "key")
    @Column(name = "value")
    @CollectionTable(name = "schedule_data", joinColumns = @JoinColumn(name = "schedule_id"))
    private Map<String, String> scheduleData;

    public Schedule() {
        setActive(true);
        setScheduleData(new HashMap<String, String>());
    }

    public Schedule(Boolean active) {
        this();
        setActive(active);
    }

    public Map<String, String> getScheduleData() {
        return scheduleData;
    }

    public void setScheduleData(Map<String, String> scheduleData) {
        this.scheduleData = scheduleData;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public Frequency getFrequency() {
        return frequency;
    }

    public void setFrequency(Frequency frequency) {
        this.frequency = frequency;
    }
}
