package edu.tamu.sage.utility;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.solr.common.SolrDocument;

public class ValueTemplateUtility {
    
    public static String compileTemplate(String template, SolrDocument solrDoc) {
        
        StringBuilder strBldr = new StringBuilder(template);
        
        extractKeysFromtemplate(template).forEach(key->{
            Object value = solrDoc.getFieldValue(key);
            if(value != null) {
                String toReplace = "{{"+key+"}}";
                int start = strBldr.indexOf(toReplace);
                int end = strBldr.indexOf(toReplace) + toReplace.length();
                strBldr
                    .replace(start, end, solrDoc.getFieldValue(key).toString());
            } else {
                strBldr.replace(0, template.length(), "unavailable");
            }
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
