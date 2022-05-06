package edu.tamu.sage.controller;

import static edu.tamu.weaver.response.ApiStatus.ERROR;
import static edu.tamu.weaver.response.ApiStatus.SUCCESS;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.lenient;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.model.Credentials;
import edu.tamu.weaver.response.ApiResponse;

@ExtendWith(SpringExtension.class)
@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    private static final Credentials TEST_CREDENTIALS_1 = new Credentials();
    static {
        TEST_CREDENTIALS_1.setUin("123456789");
        TEST_CREDENTIALS_1.setFirstName("Aggie");
        TEST_CREDENTIALS_1.setLastName("Jack");
        TEST_CREDENTIALS_1.setRole("ROLE_USER");
    }

    private static final Credentials TEST_CREDENTIALS_2 = new Credentials();
    static {
        TEST_CREDENTIALS_2.setUin("987654321");
        TEST_CREDENTIALS_2.setFirstName("Aggie");
        TEST_CREDENTIALS_2.setLastName("Jack");
        TEST_CREDENTIALS_2.setRole("ROLE_USER");
    }

    private User testUser1 = new User(TEST_CREDENTIALS_1.getUin(), TEST_CREDENTIALS_1.getFirstName(), TEST_CREDENTIALS_1.getLastName(), TEST_CREDENTIALS_1.getRole());
    private User testUser2 = new User(TEST_CREDENTIALS_2.getUin(), TEST_CREDENTIALS_2.getFirstName(), TEST_CREDENTIALS_2.getLastName(), TEST_CREDENTIALS_2.getRole());

    private List<User> mockUserList = new ArrayList<User>(Arrays.asList(new User[] { testUser1, testUser2 }));

    private static ApiResponse apiResponse;

    @Mock
    private UserRepo userRepo;

    @Mock
    private SimpMessagingTemplate simpMessagingTemplate;

    @InjectMocks
    private UserController userController;

    @BeforeEach
    public void setUp() {
        lenient().when(userRepo.findAll()).thenReturn(mockUserList);
        lenient().when(userRepo.update(any(User.class))).thenReturn(testUser1);
    }

    @Test
    public void testCredentials() {
        apiResponse = userController.credentials(TEST_CREDENTIALS_1);
        assertEquals(SUCCESS, apiResponse.getMeta().getStatus(), "Unable to get user credentials");
    }

    @Test
    public void testNullCredentials() {
        apiResponse = userController.credentials(null);
        assertEquals(ERROR, apiResponse.getMeta().getStatus(), "Unable to get user credentials");
    }

    @Test
    @SuppressWarnings("unchecked")
    public void testAllUsers() throws Exception {
        lenient().when(userRepo.findAll()).thenReturn(mockUserList);
        lenient().when(userRepo.update(any(User.class))).thenReturn(testUser1);
        apiResponse = userController.allUsers();
        assertEquals(SUCCESS, apiResponse.getMeta().getStatus(), "Request for users was unsuccessful");
        assertEquals(2, ((ArrayList<User>) apiResponse.getPayload().get("ArrayList<User>")).size(),
                "Number of users was not correct");
    }

    @Test
    public void testUpdateUser() throws Exception {
        apiResponse = userController.update(testUser1);
        assertEquals(SUCCESS, apiResponse.getMeta().getStatus(), "User was not successfully updated");
    }

    @Test
    public void testDeleteUser() throws Exception {
        apiResponse = userController.delete(testUser1);
        assertEquals(SUCCESS, apiResponse.getMeta().getStatus(), "User was not successfully deleted");
    }
}
