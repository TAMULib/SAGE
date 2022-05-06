package edu.tamu.sage.model;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
public class InternalMetadatumTest {

    @Test
    public void testDefaultConstructor() {
        InternalMetadata internalMetadatum = new InternalMetadata();
        assertNotNull(internalMetadatum);
        assertNotNull(internalMetadatum.getModelValidator());
        assertNull(internalMetadatum.getGloss());
        assertNull(internalMetadatum.getField());
        assertFalse(internalMetadatum.isRequired());
    }

    @Test
    public void testGettersAndSetters() {
        InternalMetadata internalMetadatum = getMockInternalMetadatum();
        internalMetadatum.setId(1L);

        assertEquals(1L, internalMetadatum.getId(), 1);

        assertEquals(internalMetadatum.getGloss(), "Test Metadatum");
        assertEquals(internalMetadatum.getField(), "test_metadatum");
        assertFalse(internalMetadatum.isRequired());

        internalMetadatum.setGloss("Test Metadatum Updated");
        internalMetadatum.setField("test_metadatum_updated");
        internalMetadatum.setRequired(true);

        assertEquals(internalMetadatum.getGloss(), "Test Metadatum Updated");
        assertEquals(internalMetadatum.getField(), "test_metadatum_updated");
        assertTrue(internalMetadatum.isRequired());
    }

    public static InternalMetadata getMockInternalMetadatum() {
        return new InternalMetadata("Test Metadatum", "test_metadatum", false);
    }

}
