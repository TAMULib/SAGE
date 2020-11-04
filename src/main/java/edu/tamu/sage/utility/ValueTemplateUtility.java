package edu.tamu.sage.utility;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValueTemplateUtility {

    private static Pattern pattern = Pattern.compile("\\{\\{(.*?)\\}\\}");

    public static Optional<String> compileTemplate(String template, Map<String, Collection<Object>> context) {
        StringBuilder strBldr = new StringBuilder(template);
        Optional<String> strOpt = Optional.empty();
        for (String key : extractKeysFromTemplate(template)) {
            if (context.containsKey(key)) {
                Collection<Object> values = context.get(key);
                for (Object value:values) {
                    String toReplace = "{{" + key + "}}";
                    int start = strBldr.indexOf(toReplace);
                    int end = strBldr.indexOf(toReplace) + toReplace.length();
                    strOpt = Optional.of(strBldr.replace(start, end, value.toString()).toString());
                }
            } else {
                strOpt = Optional.empty();
                break;
            }
        }
        return strOpt;
    }

    public static Optional<String> compileTemplateEntry(String template, Map<String, Object> context) {
        StringBuilder strBldr = new StringBuilder(template);
        Optional<String> strOpt = Optional.empty();
        for (String key : extractKeysFromTemplate(template)) {
            if (context.containsKey(key)) {
                Object value = context.get(key);
                String toReplace = "{{" + key + "}}";
                int start = strBldr.indexOf(toReplace);
                int end = strBldr.indexOf(toReplace) + toReplace.length();
                strOpt = Optional.of(strBldr.replace(start, end, value.toString()).toString());
            } else {
                strOpt = Optional.empty();
                break;
            }
        }
        return strOpt;
    }

    public static List<String> extractKeysFromTemplate(String key) {
        Matcher matcher = pattern.matcher(key);
        List<String> keys = new ArrayList<String>();
        while (matcher.find()) {
            keys.add(key.substring(matcher.start(), matcher.end()).replaceAll("\\{", "").replaceAll("\\}", ""));
        }
        return keys;
    }

}
