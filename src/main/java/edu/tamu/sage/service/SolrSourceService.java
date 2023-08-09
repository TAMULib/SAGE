package edu.tamu.sage.service;

import java.io.IOException;
import java.net.ConnectException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;

import edu.tamu.sage.exceptions.SourceFieldsException;
import edu.tamu.sage.exceptions.SourceNotFoundException;
import edu.tamu.sage.exceptions.SourceServiceException;
import edu.tamu.sage.model.ApplicationType;
import edu.tamu.sage.model.response.SolrField;
import edu.tamu.weaver.utility.HttpUtility;

@Service
public class SolrSourceService implements SourceService {

    public final static String ALL_FIELDS_KEY = "all_fields";

    @Autowired
    private ObjectMapper objectMapper;

    @Override
    public List<SolrField> getAvailableFields(String uri, String filter) throws SourceServiceException {
        List<SolrField> fields = new ArrayList<SolrField>();

        // TODO: remove this and figure out how to select text general field for searching
        SolrField defaultField = new SolrField();
        // TODO: ensure type is actual Solr datatype for text
        defaultField.setName(ALL_FIELDS_KEY);
        defaultField.setType("text");

        fields.add(defaultField);

        getFields(uri, filter).filter(field -> field.isStored()).sorted((left, right) -> {
          return left.getName().compareTo(right.getName());
        }).forEach(field -> fields.add(field));

        return fields;
    }

    @Override
    public List<SolrField> getIndexedFields(String uri, String filter) throws SourceServiceException {
        return getFields(uri, filter).filter(field -> field.isIndexed()).sorted((left, right) -> {
          return left.getName().compareTo(right.getName());
        }).collect(Collectors.toList());
    }

    @Override
    public List<ApplicationType> getApplicationTypes() {
        return new ArrayList<>(Arrays.asList(ApplicationType.values()));
    }

    private Stream<SolrField> getFields(String uri, String filter) {
        return Stream.concat(lookupFieldsWithLuke(uri, filter), lookupFields(uri)).distinct();
    }

    // luke handler provides dynamic fields that have been mapped in a document
    private Stream<SolrField> lookupFieldsWithLuke(String uri, String filter) {
        HttpSolrClient.Builder builder = new HttpSolrClient.Builder();
        builder.withBaseSolrUrl(uri);
        try (SolrClient solr = builder.build()) {
            List<SolrField> fields = new ArrayList<SolrField>();

            LukeRequest luke = new LukeRequest();
            luke.setNumTerms(0);
            LukeResponse lr = luke.process(solr);

            for (FieldInfo info : lr.getFieldInfo().values()) {
                SolrField field = SolrField.from(info);

                if (!info.getName().contains("*") && !info.getName().equals("_version_")) {
                    fields.add(field);
                }
            }
            return fields.stream();
        } catch (ConnectException | SolrServerException e) {
            throw new SourceNotFoundException("Could not connect to the core, uri: " + uri, e);
        } catch (IOException e) {
            throw new SourceFieldsException("Could not populate fields, uri: " + uri, e);
        }
    }

    // schema fields provides explicit fields even that have not been used in a document
    private Stream<SolrField> lookupFields(String uri) {
        try {
            String response = HttpUtility.makeHttpRequest(uri + "/schema/fields", "GET");
            JsonNode responseNode = objectMapper.readTree(response);
            if (responseNode.has("fields") && responseNode.get("fields").isArray()) {
                ArrayNode fieldNodes = (ArrayNode) responseNode.get("fields");
                Iterable<JsonNode> fields = () -> fieldNodes.iterator();
                return StreamSupport.stream(fields.spliterator(), false).map(SolrField::from);
            } else {
                throw new SourceFieldsException("Could not populate fields, uri: " + uri);
            }
        } catch (IOException e) {
            throw new SourceNotFoundException("Could not connect to the core, uri: " + uri, e);
        }
    }

}
