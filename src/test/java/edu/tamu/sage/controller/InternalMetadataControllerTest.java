package edu.tamu.sage.controller;

import static edu.tamu.sage.model.InternalMetadatumTest.getMockInternalMetadatum;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.document;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.delete;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.get;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.put;
import static org.springframework.restdocs.payload.PayloadDocumentation.fieldWithPath;
import static org.springframework.restdocs.payload.PayloadDocumentation.requestFields;
import static org.springframework.restdocs.payload.PayloadDocumentation.responseFields;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import edu.tamu.sage.model.InternalMetadata;
import edu.tamu.sage.model.repo.InternalMetadataRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.response.ApiStatus;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
public class InternalMetadataControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private InternalMetadataRepo internalMetadataRepo;

    private static long currentId = 0L;

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testReadInternalMedadatum() throws JsonProcessingException, Exception {
        performCreateInternalMedadatum();
        // @formatter:off
        mockMvc.perform(
            get("/internal/metadata")
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andDo(
                document(
                    "internal/metadata/get-all",
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the List of Internal Metadatum.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testCreateInternalMedadatum() throws JsonProcessingException, Exception {
        // @formatter:off
        performCreateInternalMedadatum()
            .andDo(
                document(
                    "internal/metadata/create",
                    requestFields(
                        fieldWithPath("id").description("The Internal Metadatum id."),
                        fieldWithPath("gloss").description("The Internal Metadatum gloss."),
                        fieldWithPath("field").description("The Internal Metadatum field.")
                    ),
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the Internal Metadatum."),
                        fieldWithPath("payload.InternalMetadata.id").description("The Internal Metadatum id."),
                        fieldWithPath("payload.InternalMetadata.gloss").description("The Internal Metadatum gloss."),
                        fieldWithPath("payload.InternalMetadata.field").description("The Internal Metadatum field.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testUpdateInternalMedadatum() throws JsonProcessingException, Exception {
        performCreateInternalMedadatum();
        InternalMetadata internalMetadatum = internalMetadataRepo.read(currentId);

        internalMetadatum.setGloss("Test Metadatum Updated");
        internalMetadatum.setField("test_metadatum_updated");

        ApiResponse expectedResponse = new ApiResponse(ApiStatus.SUCCESS, internalMetadatum);

        // @formatter:off
        mockMvc.perform(
            put("/internal/metadata")
                .content(objectMapper.writeValueAsString(internalMetadatum))
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                    .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse))
            ).andDo(
                document(
                    "internal/metadata/update",
                    requestFields(
                        fieldWithPath("id").description("The Internal Metadatum id."),
                        fieldWithPath("gloss").description("The Internal Metadatum gloss."),
                        fieldWithPath("field").description("The Internal Metadatum field.")
                    ),
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the Internal Metadatum."),
                        fieldWithPath("payload.InternalMetadata.id").description("The Internal Metadatum id."),
                        fieldWithPath("payload.InternalMetadata.gloss").description("The Internal Metadatum gloss."),
                        fieldWithPath("payload.InternalMetadata.field").description("The Internal Metadatum field.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testDeleteInternalMedadatum() throws JsonProcessingException, Exception {
        performCreateInternalMedadatum();

        InternalMetadata internalMetadatum = internalMetadataRepo.read(currentId);

        // @formatter:off
        mockMvc.perform(
            delete("/internal/metadata")
                .content(objectMapper.writeValueAsString(internalMetadatum))
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andDo(
                document(
                    "internal/metadata/delete",
                    requestFields(
                        fieldWithPath("id").description("The Internal Metadatum id."),
                        fieldWithPath("gloss").description("The Internal Metadatum gloss."),
                        fieldWithPath("field").description("The Internal Metadatum field.")
                    ),
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("Empty API response payload.")
                    )
                )
            );
       // @formatter:on
    }

    private ResultActions performCreateInternalMedadatum() throws JsonProcessingException, Exception {
        InternalMetadata internalMetadatum = getMockInternalMetadatum();

        String body = objectMapper.writeValueAsString(internalMetadatum);

        internalMetadatum.setId(++currentId);

        ApiResponse expectedResponse = new ApiResponse(ApiStatus.SUCCESS, internalMetadatum);

        // @formatter:off
        return mockMvc.perform(
            post("/internal/metadata")
                .content(body)
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                    .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse))
            );
        // @formatter:on
    }

    @AfterEach
    public void deleteAllViews() {
        internalMetadataRepo.deleteAll();
    }

}
