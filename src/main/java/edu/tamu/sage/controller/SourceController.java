package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.io.IOException;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.request.LukeRequest;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.client.solrj.response.LukeResponse;
import org.apache.solr.client.solrj.response.LukeResponse.FieldInfo;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.Source;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.SourceRepo;
import edu.tamu.weaver.auth.annotation.WeaverUser;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/source/solr")
public class SourceController {

    @Autowired
    private SourceRepo sourceRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/test/location")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreLocation(@WeaverValidatedModel Source source) throws IOException {
        logger.info("Testing Source location: " + source.getName());

        SolrClient solr = new HttpSolrClient(source.getUri());

        ApiResponse response = new ApiResponse(SUCCESS);

        try {
            solr.ping();
            LukeRequest lukeRequest = new LukeRequest();
            lukeRequest.setNumTerms(0);

            LukeResponse lukeResponse = lukeRequest.process(solr);

            Map<String, FieldInfo> fieldInfoMap = lukeResponse.getFieldInfo();


            SolrQuery query = new SolrQuery();
            query.set("q", "*");

            for (Entry<String, FieldInfo> entry : fieldInfoMap.entrySet()) {
                String fieldName = entry.getKey();
                //FieldInfo fieldInfo = entry.getValue();
                query.addFilterQuery(fieldName+":*");
                query.setFacet(true);
                query.addFacetField(fieldName);
            }


            System.out.println(query);
            QueryResponse queryResponse = solr.query(query);


            //List<FacetField> facetFields = queryResponse.getFacetFields();
            FacetField cnameMainFacetField = queryResponse.getFacetField("name");
            for (Count cnameAndCount : cnameMainFacetField.getValues()) {
                String cnameMain = cnameAndCount.getName();
                System.out.println(cnameMain);
                System.out.println(cnameAndCount.getCount());
            }

        } catch (Exception e) {
            e.getMessage();
            e.printStackTrace();
            response = new ApiResponse(ERROR, "Error connecting with " + source.getName() + " at URL " + source.getUri());
        } finally {
            solr.close();
        }


        return response;
    }

    @RequestMapping("/test/authorization")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreAuthorization(@WeaverValidatedModel Source source) {
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, sourceRepo.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Creating Source: " + source.getName());
        return new ApiResponse(SUCCESS, sourceRepo.create(source));
    }

    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Updating Source: " + source.getName());
        return new ApiResponse(SUCCESS, sourceRepo.update(source));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteSolrCore(@WeaverValidatedModel Source source) {
        logger.info("Deleting Source: " + source.getName());
        sourceRepo.delete(source);
        return new ApiResponse(SUCCESS);
    }

}
