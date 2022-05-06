package edu.tamu.sage.model;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class ConstantOpTest {

    @Test
    public void testDefaultConstructor() {
        ConstantOp operator = new ConstantOp();
        assertNotNull(operator);
        assertNotNull(operator.getModelValidator());
        assertNull(operator.getName());
        assertNull(operator.getField());
        assertNull(operator.getValue());
    }

    @Test
    public void testGettersAndSetters() {
        ConstantOp operator = getMockConstantOp();
        operator.setId(1L);

        assertEquals(1L, operator.getId(), 1);

        assertEquals(operator.getName(), "Test Constant Op");
        assertEquals(operator.getField(), "test_constant_op");
        assertEquals(operator.getValue(), "Test Constant Value");

        operator.setName("Test Constant Op Updated");
        operator.setField("test_constant_op_updated");
        operator.setValue("Test Constant Value Updated");

        assertEquals(operator.getName(), "Test Constant Op Updated");
        assertEquals(operator.getField(), "test_constant_op_updated");
        assertEquals(operator.getValue(), "Test Constant Value Updated");
    }

    public static ConstantOp getMockConstantOp() {
        return new ConstantOp("Test Constant Op", "test_constant_op", "Test Constant Value");
    }

}
