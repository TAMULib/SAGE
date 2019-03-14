package edu.tamu.sage.auth.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.tamu.sage.model.Role;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.model.Credentials;
import edu.tamu.weaver.auth.service.UserCredentialsService;

@Service
public class AppUserCredentialsService extends UserCredentialsService<User, UserRepo> {

    @Override
    public synchronized User updateUserByCredentials(Credentials credentials) {

        Optional<User> optionalUser = userRepo.findByUsername(credentials.getEmail());

        User user = null;

        if (!optionalUser.isPresent()) {

            user = userRepo.create(credentials.getEmail());
            user.setUsername(credentials.getEmail());
            user.setRole(getDefaultRole(user.getUsername()));
            user.setFirstName(credentials.getFirstName());
            user.setLastName(credentials.getLastName());
            user = userRepo.save(user);

        } else {
            user = optionalUser.get();

            boolean changed = false;

            if(credentials.getEmail() != user.getUsername()) {
                user.setUsername(credentials.getEmail());
                changed=true;
            }

            if(credentials.getFirstName() != user.getFirstName()) {
                user.setFirstName(credentials.getFirstName());
                changed=true;
            }

            if(credentials.getLastName() != user.getLastName()) {
                user.setLastName(credentials.getLastName());
                changed=true;
            }

            if(credentials.getRole() != credentials.getRole().toString()) {
                user.setRole(Role.valueOf(credentials.getRole()));
                changed=true;
            }

            if(changed) {
                user = userRepo.save(user);
            }

        }

        credentials.setRole(user.getRole().toString());
        credentials.setEmail(user.getUsername());

        return user;

    }

    public User createUserFromRegistration(String email, String firstName, String lastName, String password) {
        return userRepo.create(email, firstName, lastName, getDefaultRole(email).toString(), password);
    }

    @Override
    public String getAnonymousRole() {
        return Role.ROLE_ANONYMOUS.toString();
    }

    private synchronized Role getDefaultRole(String userIdentifier) {
        boolean isAdmin = false;
        for (String candidateIdentifier : admins) {
            if (candidateIdentifier.equals(userIdentifier)) {
                isAdmin = true;
                break;
            }
        }

        return (isAdmin) ? Role.ROLE_ADMIN:Role.ROLE_USER;
    }
}
