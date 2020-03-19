package edu.tamu.sage.model;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import org.apache.commons.lang3.time.DateUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Entity
@DiscriminatorValue("DateNormalization")
public class DateNormalizationOp extends BasicOp {

    private final static Logger log = LoggerFactory.getLogger(DateNormalizationOp.class);

    // @formatter:off
    private final static String[] DATE_FORMATS = new String[] {
        "yyyy-MM-dd'T'HH:mm:ss.SSS",
        "yyyy-MM-dd'T'HH:mm:ss.SSSz",
        "yyyy-MM-dd'T'HH:mm:ss.SSSZ",
        "yyyy-MM-dd'T'HH:mm:ss.SSSZZ",
        "yyyy-MM-dd'T'HH:mm:ss,SSS",
        "yyyy-MM-dd'T'HH:mm:ss,SSSz",
        "yyyy-MM-dd'T'HH:mm:ss,SSSZ",
        "yyyy-MM-dd'T'HH:mm:ss,SSSZZ",
        "yyyy-MM-dd'T'HH:mm:ss",
        "yyyy-MM-dd'T'HH:mm:ssz",
        "yyyy-MM-dd'T'HH:mm:ssZ",
        "yyyy-MM-dd'T'HH:mm:ssZZ",
        "yyyy-MM-dd'T'HH:mm",
        "yyyy-MM-dd'T'HH:mmz",
        "yyyy-MM-dd'T'HH:mmZ",
        "yyyy-MM-dd'T'HH:mmZZ",
        "yyyy-MM-dd HH:mm:ss.SSS",
        "yyyy-MM-dd HH:mm:ss.SSSz",
        "yyyy-MM-dd HH:mm:ss.SSSZ",
        "yyyy-MM-dd HH:mm:ss.SSSZZ",
        "yyyy-MM-dd HH:mm:ss,SSS",
        "yyyy-MM-dd HH:mm:ss,SSSz",
        "yyyy-MM-dd HH:mm:ss,SSSZ",
        "yyyy-MM-dd HH:mm:ss,SSSZZ",
        "yyyy-MM-dd HH:mm:ss",
        "yyyy-MM-dd HH:mm:ssz",
        "yyyy-MM-dd HH:mm:ssZ",
        "yyyy-MM-dd HH:mm:ssZZ",
        "yyyy-MM-dd HH:mm",
        "yyyy-MM-dd HH:mmz",
        "yyyy-MM-dd HH:mmZ",
        "yyyy-MM-dd HH:mmZZ",
        "yyyy-MM-dd",
        "yyyy-MM",
        "yyyy",
        "MM/dd/yyyy"
    };
    // @formatter:on

    public final static String TYPE = "DATE_NORMALIZATION_OP";

    private DateFormat dateFormat;

    public DateNormalizationOp() {
        super();
        setType(TYPE);
    }

    public DateNormalizationOp(String field, String value) {
        this();
        setField(field);
        setValue(value);
        setDateFormat(new SimpleDateFormat(value));
    }

    public DateNormalizationOp(String name, String field, String value) {
        this(field, value);
        setName(name);
    }

    public DateFormat getDateFormat() {
        return dateFormat;
    }

    public void setDateFormat(DateFormat dateFormat) {
        this.dateFormat = dateFormat;
    }

    @Override
    public void process(Map<String, String> sageDoc) {
        if (!sageDoc.containsKey(getField())) {
            String value = getValue();
            try {
                Date date = DateUtils.parseDate(value, DATE_FORMATS);
                sageDoc.put(getField(), dateFormat.format(date));
            } catch (ParseException e) {
                log.warn("Couldn't parse date from {}: {}", value, e.getMessage());
            }
        }
    }

    @Override
    public String getType() {
        return TYPE;
    }

}
