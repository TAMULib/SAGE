package edu.tamu.sage.auth.model;

import static org.junit.Assert.assertEquals;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import edu.tamu.sage.SageApplication;
import edu.tamu.sage.model.User;
import edu.tamu.weaver.auth.model.Credentials;

@SpringBootTest(classes = { SageApplication.class })
public class CustomUserDetailsTest {

    private static final Credentials TEST_CREDENTIALS = new Credentials();
    static {
        TEST_CREDENTIALS.setUin("123456789");
        TEST_CREDENTIALS.setEmail("aggieJack@tamu.edu");
        TEST_CREDENTIALS.setFirstName("Aggie");
        TEST_CREDENTIALS.setLastName("Jack");
        TEST_CREDENTIALS.setRole("ROLE_USER");
    }

    private User testUser = new User(TEST_CREDENTIALS.getEmail(), TEST_CREDENTIALS.getFirstName(), TEST_CREDENTIALS.getLastName(), TEST_CREDENTIALS.getRole());

    @Test
    public void testConstructor() {
        CustomUserDetails userDetails = new CustomUserDetails(testUser);
        assertEquals("The parent constructor was not called correctly", testUser.getId(), userDetails.getId());
    }
}
