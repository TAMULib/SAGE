package edu.tamu.sage.utility;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.solr.common.SolrDocument;

public class ValueTemplateUtility {
    
    public static String compileTemplate(String template, SolrDocument solrDoc) {
        
        StringBuilder strBldr = new StringBuilder();
        
        extractKeysFromtemplate(template).forEach(key->{
            strBldr
                .append(solrDoc.getFieldValue(key))
                .append(" ");
        });
        
        return strBldr.toString();
        
    }

    public static List<String> extractKeysFromtemplate(String key) {
        
        Pattern pattern = Pattern.compile("\\{\\{(.*?)\\}\\}");
   
        Matcher matcher = pattern.matcher(key);
        
        List<String> keys = new ArrayList<String>();
        
        while (matcher.find()) {
            keys.add(key.substring(matcher.start(), matcher.end()).replaceAll("\\{", "").replaceAll("\\}", ""));
        }
        
        return keys;
        
    }

}
