package edu.tamu.sage.model;

import static org.junit.Assert.assertNull;
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
    }

    @Test
    public void testGettersAndSetters() {
        InternalMetadata internalMetadatum = getMockInternalMetadatum();
        internalMetadatum.setId(1L);

        assertEquals(1L, internalMetadatum.getId(), 1);

        assertEquals("Test Metadatum", internalMetadatum.getGloss());
        assertEquals("test_metadatum", internalMetadatum.getField());

        internalMetadatum.setGloss("Test Metadatum Updated");
        internalMetadatum.setField("test_metadatum_updated");

        assertEquals("Test Metadatum Updated", internalMetadatum.getGloss());
        assertEquals("test_metadatum_updated", internalMetadatum.getField());
    }

    public static InternalMetadata getMockInternalMetadatum() {
        InternalMetadata internalMetadatum = new InternalMetadata();
        internalMetadatum.setGloss("Test Metadatum");
        internalMetadatum.setField("test_metadatum");
        return internalMetadatum;
    }

}
