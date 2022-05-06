package edu.tamu.sage.model.repo;

import static edu.tamu.sage.model.ConstantOpTest.getMockConstantOp;
import static edu.tamu.sage.model.DefaultOpTest.getMockDefaultOp;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.tamu.sage.SageApplication;
import edu.tamu.sage.model.BaseOp;
import edu.tamu.sage.model.ConstantOp;
import edu.tamu.sage.model.DefaultOp;

// @DataJpaTest
// NOTE: the above annotation is desirable for this test
// unfortunately, the application is not configured correctly for its use
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { SageApplication.class }, webEnvironment = WebEnvironment.DEFINED_PORT)
public class OperatorRepoTest {

    @Autowired
    private OperatorRepo operatorRepo;

    private long currentId;

    @Test
    public void testCreateConstantOp() {
        assertEquals(0, operatorRepo.count());
        createConstantOp();
        assertEquals(1, operatorRepo.count());
    }

    @Test
    public void testReadConstantOp() {
        testCreateConstantOp();
        BaseOp operator = operatorRepo.read(currentId);
        assertNotNull(operator);
    }

    @Test
    public void testUpdateConstantOp() {
        testCreateConstantOp();
        ConstantOp operator = (ConstantOp) operatorRepo.read(currentId);

        operator.setName("Test Constant Op Updated");
        operator.setField("test_constant_op_updated");
        operator.setValue("Test Constant Value Updated");

        operatorRepo.update(operator);

        assertEquals(1, operatorRepo.count());

        operator = (ConstantOp) operatorRepo.read(currentId);

        assertEquals("Test Constant Op Updated", operator.getName());
        assertEquals("test_constant_op_updated", operator.getField());
        assertEquals("Test Constant Value Updated", operator.getValue());
    }

    @Test
    public void testDeleteConstantOp() {
        testCreateConstantOp();
        assertEquals(1, operatorRepo.count());
        BaseOp operator = operatorRepo.read(currentId);
        operatorRepo.delete(operator);
        assertEquals(0, operatorRepo.count());
    }

    @Test
    public void testCreateDefaultOp() {
        assertEquals(0, operatorRepo.count());
        createDefaultOp();
        assertEquals(1, operatorRepo.count());
    }

    @Test
    public void testReadDefaultOp() {
        testCreateConstantOp();
        BaseOp operator = operatorRepo.read(currentId);
        assertNotNull(operator);
    }

    @Test
    public void testUpdateDefaultOp() {
        testCreateConstantOp();
        ConstantOp operator = (ConstantOp) operatorRepo.read(currentId);

        operator.setName("Test Default Op Updated");
        operator.setField("test_default_op_updated");
        operator.setValue("Test Default Value Updated");

        operatorRepo.update(operator);

        assertEquals(1, operatorRepo.count());

        operator = (ConstantOp) operatorRepo.read(currentId);

        assertEquals("Test Default Op Updated", operator.getName());
        assertEquals("test_default_op_updated", operator.getField());
        assertEquals("Test Default Value Updated", operator.getValue());
    }

    @Test
    public void testDeleteDefaultOp() {
        testCreateConstantOp();
        assertEquals(1, operatorRepo.count());
        BaseOp operator = operatorRepo.read(currentId);
        operatorRepo.delete(operator);
        assertEquals(0, operatorRepo.count());
    }

    @Test
    public void testReadMultipleTypesOfOps() {
        createConstantOp();
        createDefaultOp();
        List<BaseOp> operators = operatorRepo.findAll();
        assertNotNull(operators);
        assertEquals(2, operators.size());
        assertTrue(ConstantOp.class.isAssignableFrom(operators.get(0).getClass()));
        assertTrue(DefaultOp.class.isAssignableFrom(operators.get(1).getClass()));
    }

    @AfterEach
    public void deleteAllViews() {
        operatorRepo.deleteAll();
    }

    private void createConstantOp() {
        BaseOp operator = getMockConstantOp();
        operator = operatorRepo.save(operator);
        currentId = operator.getId();
    }

    private void createDefaultOp() {
        BaseOp operator = getMockDefaultOp();
        operator = operatorRepo.save(operator);
        currentId = operator.getId();
    }

}
