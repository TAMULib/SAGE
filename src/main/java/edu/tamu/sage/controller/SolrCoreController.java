package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static edu.tamu.weaver.validation.model.BusinessValidationType.CREATE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.DELETE;
import static edu.tamu.weaver.validation.model.BusinessValidationType.UPDATE;

import java.io.IOException;
import java.util.List;

import org.apache.solr.client.solrj.SolrClient;
import org.apache.solr.client.solrj.SolrQuery;
import org.apache.solr.client.solrj.SolrServerException;
import org.apache.solr.client.solrj.impl.HttpSolrClient;
import org.apache.solr.client.solrj.response.FacetField;
import org.apache.solr.client.solrj.response.FacetField.Count;
import org.apache.solr.client.solrj.response.QueryResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import edu.tamu.sage.model.SolrCore;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.SolrCoreRepo;
import edu.tamu.weaver.auth.annotation.WeaverUser;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidatedModel;
import edu.tamu.weaver.validation.aspect.annotation.WeaverValidation;

@RestController
@RequestMapping("/core/solr")
public class SolrCoreController {

    @Autowired
    private SolrCoreRepo solrCoreRepo;

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @RequestMapping("/test/location")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreLocation(@WeaverValidatedModel SolrCore solrCore) throws IOException {
        logger.info("Testing SolrCore location: " + solrCore.getName());

        SolrClient solr = new HttpSolrClient(solrCore.getUri());

        ApiResponse response = new ApiResponse(SUCCESS);

        try {
            solr.ping();
            SolrQuery query = new SolrQuery();
            query.set("q", "*");
            query.addFilterQuery("title:foo");
            query.setFacet(true);
            query.addFacetField("title");
            System.out.println(query);
            QueryResponse queryResponse = solr.query(query);
            List<FacetField> facetFields = queryResponse.getFacetFields();
            
            facetFields.forEach(ff->{
                FacetField cnameMainFacetField = queryResponse.getFacetField(ff.getName());
                for (Count cnameAndCount : cnameMainFacetField.getValues()) {
                    String cnameMain = cnameAndCount.getName();
                    System.out.println(cnameMain);
                    System.out.println(cnameAndCount.getCount());
                }
            });
            
        } catch (Exception e) {
            e.getMessage();
            response = new ApiResponse(ERROR, "Error connecting with " + solrCore.getName() + " at URL " + solrCore.getUri());
        } finally {
            solr.close();
        }
        

        return response;
    }

    @RequestMapping("/test/authorization")
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse testSolrCoreAuthorization(@WeaverValidatedModel SolrCore solrCore) {
        return new ApiResponse(SUCCESS);
    }

    @RequestMapping(method = RequestMethod.GET)
    @PreAuthorize("hasRole('ANONYMOUS')")
    public ApiResponse getAll(@WeaverUser User user) {
        return new ApiResponse(SUCCESS, solrCoreRepo.findAll());
    }

    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = CREATE) })
    public ApiResponse createSolrCore(@WeaverValidatedModel SolrCore solrCore) {
        System.out.println(solrCore.getName());
        logger.info("Creating SolrCore: " + solrCore.getName());
        return new ApiResponse(SUCCESS, solrCoreRepo.create(solrCore));
    }

    // Why do we use POST for update and not put?
    @RequestMapping(method = RequestMethod.PUT)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = UPDATE) })
    public ApiResponse updateSolrCore(@WeaverValidatedModel SolrCore solrCore) {
        logger.info("Updating SolrCore: " + solrCore.getName());
        return new ApiResponse(SUCCESS, solrCoreRepo.update(solrCore));
    }

    @RequestMapping(method = RequestMethod.DELETE)
    @PreAuthorize("hasRole('USER')")
    @WeaverValidation(business = { @WeaverValidation.Business(value = DELETE) })
    public ApiResponse deleteSolrCore(@WeaverValidatedModel SolrCore solrCore) {
        logger.info("Deleting SolrCore: " + solrCore.getName());
        solrCoreRepo.delete(solrCore);
        return new ApiResponse(SUCCESS);
    }

}
