package edu.tamu.sage.auth.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.util.ReflectionTestUtils.setField;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.tamu.sage.model.Role;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.model.Credentials;

@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
public class AppUserCredentialsServiceTest {

    private static final Credentials TEST_CREDENTIALS_1 = new Credentials();
    static {
        TEST_CREDENTIALS_1.setEmail("123456789");
        TEST_CREDENTIALS_1.setFirstName("Aggie");
        TEST_CREDENTIALS_1.setLastName("Jack");
        TEST_CREDENTIALS_1.setRole("ROLE_USER");
    }

    private static final Credentials TEST_CREDENTIALS_2 = new Credentials();
    static {
        TEST_CREDENTIALS_2.setEmail("987654321");
        TEST_CREDENTIALS_2.setFirstName("Aggie");
        TEST_CREDENTIALS_2.setLastName("Jack");
        TEST_CREDENTIALS_2.setRole("ROLE_USER");
    }

    private static final Credentials TEST_NULL_CREDENTIALS = new Credentials();
    static {
        TEST_NULL_CREDENTIALS.setEmail("987654321");
        TEST_NULL_CREDENTIALS.setFirstName("Aggie");
        TEST_NULL_CREDENTIALS.setLastName("Jack");
    }

    private static final Credentials TEST_CHANGED_CREDENTIALS = new Credentials();
    static {
        TEST_CHANGED_CREDENTIALS.setEmail("111111111");
        TEST_CHANGED_CREDENTIALS.setFirstName("John");
        TEST_CHANGED_CREDENTIALS.setLastName("Smith");
        TEST_CHANGED_CREDENTIALS.setRole("ROLE_ADMIN");
    }

    private User testUser1 = new User(TEST_CREDENTIALS_1.getEmail(), TEST_CREDENTIALS_1.getFirstName(), TEST_CREDENTIALS_1.getLastName(), TEST_CREDENTIALS_1.getRole());
    private User testUser2 = new User(TEST_CREDENTIALS_2.getEmail(), TEST_CREDENTIALS_2.getFirstName(), TEST_CREDENTIALS_2.getLastName(), TEST_CREDENTIALS_2.getRole());

    private static final String[] testAdmins = { "123456789", "987654321" };

    private Optional<User> optionalUser1 = Optional.of(testUser1);

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private AppUserCredentialsService credentialsService;

    @Test
    public void testUpdateUserByCredentials() {
        when(userRepo.findByUsername(TEST_CREDENTIALS_1.getEmail())).thenReturn(optionalUser1);
        when(userRepo.findByUsername(TEST_CREDENTIALS_2.getEmail())).thenReturn(Optional.empty());
        when(userRepo.create(any(String.class))).thenReturn(testUser2);
        when(userRepo.save(any(User.class))).thenReturn(testUser1);

        setField(credentialsService, "admins", testAdmins);
        User foundUser = credentialsService.updateUserByCredentials(TEST_CREDENTIALS_1);
        assertEquals(testUser1, foundUser, "Unable to find user");
        User unfoundUser = credentialsService.updateUserByCredentials(TEST_CREDENTIALS_2);
        assertEquals(testUser2, unfoundUser, "Unable to find user");
    }

    @Test
    public void testGetAnonymousRole() {
        String anonRole = credentialsService.getAnonymousRole();
        assertEquals(Role.ROLE_ANONYMOUS.toString(), anonRole, "Anonymous Role not set correctly");
    }

    @Test
    public void testNullRole() {
        when(userRepo.findByUsername(TEST_CREDENTIALS_2.getEmail())).thenReturn(Optional.empty());
        when(userRepo.create(any(String.class))).thenReturn(testUser2);
        when(userRepo.save(any(User.class))).thenReturn(testUser1);

        setField(credentialsService, "admins", testAdmins);
        User nullUser = credentialsService.updateUserByCredentials(TEST_NULL_CREDENTIALS);
        assertEquals(TEST_CREDENTIALS_1.getRole(), nullUser.getRole().toString(), "Null Role not updated");
    }

    @Test
    public void testChangedUser() {
        when(userRepo.findByUsername(TEST_CHANGED_CREDENTIALS.getEmail())).thenReturn(optionalUser1);
        when(userRepo.save(any(User.class))).thenReturn(testUser1);

        User changedUser = credentialsService.updateUserByCredentials(TEST_CHANGED_CREDENTIALS);
        assertEquals(changedUser, optionalUser1.get(), "is present");
        assertEquals(TEST_CHANGED_CREDENTIALS.getEmail(), changedUser.getUsername(), "Username was not updated");
        assertEquals(TEST_CHANGED_CREDENTIALS.getFirstName(), changedUser.getFirstName(), "First name was not updated");
        assertEquals(TEST_CHANGED_CREDENTIALS.getLastName(), changedUser.getLastName(), "Last name was not updated");
        assertEquals(TEST_CHANGED_CREDENTIALS.getRole(), changedUser.getRole().toString(), "Role was not updated");
    }
}
