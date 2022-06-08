package edu.tamu.sage.model;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class DefaultOpTest {

    @Test
    public void testDefaultConstructor() {
        DefaultOp operator = new DefaultOp();
        assertNotNull(operator);
        assertNotNull(operator.getModelValidator());
        assertNull(operator.getName());
        assertNull(operator.getField());
        assertNull(operator.getValue());
    }

    @Test
    public void testGettersAndSetters() {
        DefaultOp operator = getMockDefaultOp();
        operator.setId(1L);

        assertEquals(1L, operator.getId(), 1);

        assertEquals(operator.getName(), "Test Default Op");
        assertEquals(operator.getField(), "test_default_op");
        assertEquals(operator.getValue(), "Test Default Value");

        operator.setName("Test Default Op Updated");
        operator.setField("test_default_op_updated");
        operator.setValue("Test Default Value Updated");

        assertEquals(operator.getName(), "Test Default Op Updated");
        assertEquals(operator.getField(), "test_default_op_updated");
        assertEquals(operator.getValue(), "Test Default Value Updated");
    }

    public static DefaultOp getMockDefaultOp() {
        return new DefaultOp("Test Default Op", "test_default_op", "Test Default Value");
    }

}
