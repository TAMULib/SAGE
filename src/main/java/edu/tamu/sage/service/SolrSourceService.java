package edu.tamu.sage.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.stereotype.Service;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrSourceService implements SourceService {

    public final static String DEFAULT_FIELD_KEY = "all_fields";

    @Override
    public List<SolrField> getFields(String uri, String filter) throws SourceFieldsException {
        ArrayList<SolrField> availableFields = new ArrayList<SolrField>();
        SolrField defaultField = new SolrField();
        // TODO: ensure type is actual Solr datatype for text
        defaultField.setName(DEFAULT_FIELD_KEY);
        defaultField.setType("text");
        availableFields.add(defaultField);
        try (SolrClient solr = new HttpSolrClient(uri)) {

            LukeRequest luke = new LukeRequest();
            luke.setNumTerms(0);
            LukeResponse lr = luke.process(solr);

            Map<String, FieldInfo> map = lr.getFieldInfo();

            SolrQuery query = new SolrQuery();
            query.setRows(1);

            for (Entry<String, FieldInfo> field : map.entrySet()) {
                if (field != null && field.getValue().getSchema().contains("I")) {
                    String q = String.format("%s AND %s:*", filter, field.getKey());
                    query.setQuery(q);
                    QueryResponse qr = solr.query(query);
                    if (qr.getResults().size() > 0) {
                        availableFields.add(SolrField.of(field));
                    }
                }
            }
        } catch (Exception e) {
            throw new SourceFieldsException("Could not populate fields", e);
        }

        return availableFields;
    }

}
