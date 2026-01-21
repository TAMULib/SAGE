package edu.tamu.sage.model;

import java.util.HashMap;
import java.util.Map;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapKeyColumn;
import jakarta.validation.constraints.NotNull;

@Embeddable
public class Schedule {

    @NotNull
    @Column(nullable = false)
    private Boolean active;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Frequency frequency;

    @ElementCollection(fetch = FetchType.EAGER)
    @MapKeyColumn(name = "\"key\"")
    @Column(name = "\"value\"")
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
