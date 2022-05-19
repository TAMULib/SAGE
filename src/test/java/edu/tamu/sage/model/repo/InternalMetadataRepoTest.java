package edu.tamu.sage.model.repo;

import static edu.tamu.sage.model.InternalMetadatumTest.getMockInternalMetadatum;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.tamu.sage.SageApplication;
import edu.tamu.sage.model.InternalMetadata;

// @DataJpaTest
// NOTE: the above annotation is desirable for this test
// unfortunately, the application is not configured correctly for its use
@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { SageApplication.class }, webEnvironment = WebEnvironment.DEFINED_PORT)
public class InternalMetadataRepoTest {

    @Autowired
    private InternalMetadataRepo internalMetadataRepo;

    private long currentId;

    @Test
    public void testCreate() {
        assertEquals(0, internalMetadataRepo.count());
        InternalMetadata internalMetadatum = getMockInternalMetadatum();
        internalMetadatum = internalMetadataRepo.save(internalMetadatum);
        currentId = internalMetadatum.getId();
        assertEquals(1, internalMetadataRepo.count());
    }

    @Test
    public void testRead() {
        testCreate();
        InternalMetadata internalMetadatum = internalMetadataRepo.read(currentId);
        assertNotNull(internalMetadatum);
    }

    @Test
    public void testUpdate() {
        testCreate();
        InternalMetadata internalMetadatum = internalMetadataRepo.read(currentId);
        internalMetadatum.setGloss("Test Metadatum Updated");
        internalMetadatum.setField("test_metadatum_updated");

        internalMetadataRepo.update(internalMetadatum);

        assertEquals(1, internalMetadataRepo.count());

        internalMetadatum = internalMetadataRepo.read(currentId);

        assertEquals(internalMetadatum.getGloss(), "Test Metadatum Updated");
        assertEquals(internalMetadatum.getField(), "test_metadatum_updated");
    }

    @Test
    public void testDelete() {
        testCreate();
        assertEquals(1, internalMetadataRepo.count());
        InternalMetadata internalMetadatum = internalMetadataRepo.read(currentId);
        internalMetadataRepo.delete(internalMetadatum);
        assertEquals(0, internalMetadataRepo.count());
    }

    @AfterEach
    public void deleteAllViews() {
        internalMetadataRepo.deleteAll();
    }

}
