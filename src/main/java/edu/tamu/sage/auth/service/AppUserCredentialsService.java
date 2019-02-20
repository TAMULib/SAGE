package edu.tamu.sage.auth.service;

import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import edu.tamu.sage.model.Role;
import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.weaver.auth.model.Credentials;
import edu.tamu.weaver.auth.service.UserCredentialsService;

@Service
public class AppUserCredentialsService extends UserCredentialsService<User, UserRepo> {
    private final static String EXTERNAL_AUTH_KEY = "weaverAuth";

    @Value("#{'${authenticationStrategies}'.split(',')}")
    private List<String> authenticationStrategies;

    private boolean externalAuthEnabled = false;

	@Override
	public synchronized User updateUserByCredentials(Credentials credentials) {
        Optional<User> optionalUser = userRepo.findByUsername(credentials.getEmail());

        User user = null;

        if (optionalUser.isPresent()) {
            user = optionalUser.get();

            boolean changed = false;

            if (credentials.getEmail() != user.getUsername()) {
                user.setUsername(credentials.getEmail());
                changed = true;
            }

            if (credentials.getFirstName() != user.getFirstName()) {
                user.setFirstName(credentials.getFirstName());
                changed = true;
            }

            if (credentials.getLastName() != user.getLastName()) {
                user.setLastName(credentials.getLastName());
                changed = true;
            }

            if (credentials.getRole() == null) {
                user.setRole(getDefaultRole(credentials));
                changed = true;
            }

            if (changed) {
                user = userRepo.save(user);
            }
        } else {
            if (isExternalAuthEnabled()) {
                user = userRepo.create(credentials.getEmail(), credentials.getFirstName(), credentials.getLastName(), getDefaultRole(credentials).toString());
            }
        }

        credentials.setRole(user.getRole().toString());
        credentials.setUin(user.getUsername());

        return user;

	}


    public User createUserFromRegistration(String email, String firstName, String lastName, String password) {
        Role role = Role.ROLE_USER;
        for (String adminEmail : admins) {
            if (adminEmail.equals(email)) {
                role = Role.ROLE_ADMIN;
                break;
            }
        }
        return userRepo.create(email, firstName, lastName, role.toString(), password);
    }

	@Override
	public String getAnonymousRole() {
		return Role.ROLE_ANONYMOUS.toString();
	}

    private synchronized Role getDefaultRole(Credentials credentials) {
        Role role = Role.ROLE_USER;

        if (credentials.getRole() == null) {
            credentials.setRole(role.toString());
        }

        String userIdentifier = credentials.getEmail();

        for (String candidateIdentifier : admins) {
            if (candidateIdentifier.equals(userIdentifier)) {
                role = Role.ROLE_ADMIN;
                credentials.setRole(role.toString());
            }
        }

        return role;
    }

    protected boolean isExternalAuthEnabled() {
        return externalAuthEnabled;
    }

    @PostConstruct
    protected void setExternalAuthEnabled() {
        for (String strategy:authenticationStrategies) {
            if (strategy.equals(EXTERNAL_AUTH_KEY)) {
                externalAuthEnabled = true;
                break;
            }
        }
    }

}
