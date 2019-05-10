package edu.tamu.sage.controller;

import static edu.tamu.sage.model.ConstantOpTest.getMockConstantOp;
import static edu.tamu.sage.model.DefaultOpTest.getMockDefaultOp;
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

import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.ConstantOp;
import edu.tamu.sage.model.repo.OperatorRepo;
import edu.tamu.weaver.response.ApiResponse;
import edu.tamu.weaver.response.ApiStatus;

@SpringBootTest
@AutoConfigureMockMvc
@ExtendWith(SpringExtension.class)
@AutoConfigureRestDocs(outputDir = "target/generated-snippets")
public class OperatorControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private OperatorRepo operatorRepo;

    private static long currentId = 0L;

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testReadOperator() throws JsonProcessingException, Exception {
        performCreateOperator(getMockConstantOp());
        performCreateOperator(getMockDefaultOp());
        // @formatter:off
        mockMvc.perform(
            get("/operators")
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andDo(
                document(
                    "operators/get-all",
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the List of Operators.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testGetOperatorTypes() throws JsonProcessingException, Exception {
        // @formatter:off
        mockMvc.perform(
            get("/operators/types")
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andDo(
                document(
                    "operators/get-types",
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the List of Operator Types.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testCreateOperator() throws JsonProcessingException, Exception {
        // @formatter:off
        performCreateOperator(getMockConstantOp())
            .andDo(
                document(
                    "operators/create",
                    requestFields(
                        fieldWithPath("id").description("The Operator id."),
                        fieldWithPath("name").description("The Operator name."),
                        fieldWithPath("field").description("The Operator field."),
                        fieldWithPath("value").description("The Operator value."),
                        fieldWithPath("type").description("The Operator type.")
                    ),
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the Operator."),
                        fieldWithPath("payload.ConstantOp.id").description("The Operator id."),
                        fieldWithPath("payload.ConstantOp.name").description("The Operator name."),
                        fieldWithPath("payload.ConstantOp.field").description("The Operator field."),
                        fieldWithPath("payload.ConstantOp.value").description("The Operator value.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testUpdateOperator() throws JsonProcessingException, Exception {
        performCreateOperator(getMockConstantOp());
        ConstantOp operator = (ConstantOp) operatorRepo.read(currentId);

        operator.setName("Test Constant Op Updated");
        operator.setField("test_constant_op_updated");
        operator.setValue("Test Constant Value Updated");

        ApiResponse expectedResponse = new ApiResponse(ApiStatus.SUCCESS, operator);

        // @formatter:off
        mockMvc.perform(
            put("/operators")
                .content(objectMapper.writeValueAsString(operator))
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
                    .andExpect(content().json(objectMapper.writeValueAsString(expectedResponse))
            ).andDo(
                document(
                    "operators/update",
                    requestFields(
                        fieldWithPath("id").description("The Operator id."),
                        fieldWithPath("name").description("The Operator name."),
                        fieldWithPath("field").description("The Operator field."),
                        fieldWithPath("value").description("The Operator value."),
                        fieldWithPath("type").description("The Operator type.")
                    ),
                    responseFields(
                        fieldWithPath("meta").description("API response meta."),
                        fieldWithPath("meta.id").description("Id of the request."),
                        fieldWithPath("meta.action").description("Action of the request."),
                        fieldWithPath("meta.message").description("Message of the response."),
                        fieldWithPath("meta.status").description("Status of the response."),
                        fieldWithPath("payload").description("API response payload containing the Operator."),
                        fieldWithPath("payload.ConstantOp.id").description("The Operator id."),
                        fieldWithPath("payload.ConstantOp.name").description("The Operator name."),
                        fieldWithPath("payload.ConstantOp.field").description("The Operator field."),
                        fieldWithPath("payload.ConstantOp.value").description("The Operator value.")
                    )
                )
            );
       // @formatter:on
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    public void testDeleteOperator() throws JsonProcessingException, Exception {
        performCreateOperator(getMockConstantOp());

        ConstantOp operator = (ConstantOp) operatorRepo.read(currentId);

        // @formatter:off
        mockMvc.perform(
            delete("/operators")
                .content(objectMapper.writeValueAsString(operator))
                .contentType(MediaType.APPLICATION_JSON))
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8))
            .andDo(
                document(
                    "operators/delete",
                    requestFields(
                        fieldWithPath("id").description("The Operator id."),
                        fieldWithPath("name").description("The Operator name."),
                        fieldWithPath("field").description("The Operator field."),
                        fieldWithPath("value").description("The Operator value."),
                        fieldWithPath("type").description("The Operator type.")
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

    private ResultActions performCreateOperator(BaseOp operator) throws JsonProcessingException, Exception {
        String body = objectMapper.writeValueAsString(operator);

        operator.setId(++currentId);

        ApiResponse expectedResponse = new ApiResponse(ApiStatus.SUCCESS, operator);

        // @formatter:off
        return mockMvc.perform(
            post("/operators")
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
        operatorRepo.deleteAll();
    }

}
