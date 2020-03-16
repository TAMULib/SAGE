package edu.tamu.sage.service;

import java.net.ConnectException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.stream.Collectors;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.springframework.stereotype.Service;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.exceptions.SourceNotFoundException;
import edu.tamu.sage.exceptions.SourceServiceException;
import edu.tamu.sage.model.response.SolrField;

@Service
public class SolrSourceService implements SourceService {

    public final static String ALL_FIELDS_KEY = "all_fields";

    @Override
    public List<SolrField> getAvailableFields(String uri, String filter) throws SourceServiceException {
        List<SolrField> availableFields = new ArrayList<SolrField>();
        SolrField defaultField = new SolrField();
        // TODO: ensure type is actual Solr datatype for text
        defaultField.setName(ALL_FIELDS_KEY);
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
                if (isStored(field.getValue()) || !isIndexed(field.getValue())) {
                    availableFields.add(SolrField.of(field.getValue()));
                }
            }
        } catch (ConnectException | SolrServerException e) {
            throw new SourceNotFoundException("Could not connect to the core, uri: " + uri, e);
        } catch (Exception e) {
            throw new SourceFieldsException("Could not populate fields, uri: " + uri, e);
        }

        return availableFields;
    }

    @Override
    public List<SolrField> getIndexedFields(String uri, String filter) throws SourceServiceException {
        try (SolrClient solr = new HttpSolrClient(uri)) {
            LukeRequest luke = new LukeRequest();
            luke.setNumTerms(0);
            LukeResponse lr = luke.process(solr);
            Map<String, FieldInfo> map = lr.getFieldInfo();
            return map.values().stream().filter(info -> isIndexed(info)).map(info -> SolrField.of(info)).collect(Collectors.toList());
        } catch (ConnectException | SolrServerException e) {
            throw new SourceNotFoundException("Could not connect to the core, uri: " + uri, e);
        } catch (Exception e) {
            throw new SourceFieldsException("Could not populate fields, uri: " + uri, e);
        }
    }

    private boolean isIndexed(FieldInfo info) {
        return info.getSchema().contains("I");
    }

    private boolean isStored(FieldInfo info) {
        return info.getSchema().contains("S");
    }

}
