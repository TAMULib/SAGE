package edu.tamu.sage.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.test.context.junit4.SpringRunner;

import edu.tamu.sage.model.User;
import edu.tamu.weaver.auth.model.Credentials;

@RunWith(SpringRunner.class)
public class AppUserDetailsServiceTest {

    private static final Credentials TEST_CREDENTIALS_1 = new Credentials();
    static {
        TEST_CREDENTIALS_1.setUin("123456789");
        TEST_CREDENTIALS_1.setEmail("aggieJack@tamu.edu");
        TEST_CREDENTIALS_1.setFirstName("Aggie");
        TEST_CREDENTIALS_1.setLastName("Jack");
        TEST_CREDENTIALS_1.setRole("ROLE_USER");
    }

    private User testUser1 = new User(TEST_CREDENTIALS_1.getEmail(), TEST_CREDENTIALS_1.getFirstName(), TEST_CREDENTIALS_1.getLastName(), TEST_CREDENTIALS_1.getRole());

    @InjectMocks
    private AppUserDetailsService appUserDetailsService;

    @Test
    public void testBuildUserDetails() {
        UserDetails details = appUserDetailsService.buildUserDetails(testUser1);
        assertEquals("User details not built correctly", TEST_CREDENTIALS_1.getEmail(), details.getUsername());
    }
}
