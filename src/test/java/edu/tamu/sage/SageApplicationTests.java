package edu.tamu.sage;

import static org.junit.jupiter.api.Assertions.assertTrue;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@SpringBootTest(classes = { SageApplication.class }, webEnvironment = WebEnvironment.DEFINED_PORT)
public class SageApplicationTests {

    @Test
    public void contextLoads() {
        assertTrue(true);
    }

}
