package edu.tamu.sage.model;

import static org.junit.Assert.assertNull;
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

        assertEquals("Test Default Op", operator.getName());
        assertEquals("test_default_op", operator.getField());
        assertEquals("Test Default Value", operator.getValue());

        operator.setName("Test Default Op Updated");
        operator.setField("test_default_op_updated");
        operator.setValue("Test Default Value Updated");

        assertEquals("Test Default Op Updated", operator.getName());
        assertEquals("test_default_op_updated", operator.getField());
        assertEquals("Test Default Value Updated", operator.getValue());
    }

    public static DefaultOp getMockDefaultOp() {
        return new DefaultOp("Test Default Op", "test_default_op", "Test Default Value");
    }

}
