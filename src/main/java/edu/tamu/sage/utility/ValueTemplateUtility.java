package edu.tamu.sage.utility;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class ValueTemplateUtility {

    private static Pattern pattern = Pattern.compile("\\{\\{(.*?)\\}\\}");

    public static String compileTemplate(String template, Map<String, Object> context) {
        StringBuilder strBldr = new StringBuilder(template);
        extractKeysFromTemplate(template).forEach(key -> {
            if (context.containsKey(key)) {
                Object value = context.get(key);
                String toReplace = "{{" + key + "}}";
                int start = strBldr.indexOf(toReplace);
                int end = strBldr.indexOf(toReplace) + toReplace.length();
                strBldr.replace(start, end, value.toString());
            } else {
                strBldr.replace(0, template.length(), "unavailable");
            }
        });
        return strBldr.toString();
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
