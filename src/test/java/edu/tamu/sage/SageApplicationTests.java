package edu.tamu.sage;

import static org.junit.Assert.assertTrue;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

@SpringBootTest(classes = { SageApplication.class }, webEnvironment = WebEnvironment.DEFINED_PORT)
public class SageApplicationTests {

    @Test
    public void contextLoads() {
        assertTrue(true);
    }

}
