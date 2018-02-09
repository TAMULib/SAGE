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

		Optional<User> optionalUser = userRepo.findByUsername(credentials.getUin());

		User user = null;

		if (!optionalUser.isPresent()) {

			Role role = Role.ROLE_USER;

			if (credentials.getRole() == null) {
				credentials.setRole(role.toString());
			}

			String shibUin = credentials.getUin();

			for (String uin : admins) {
				if (uin.equals(shibUin)) {
					role = Role.ROLE_ADMIN;
					credentials.setRole(role.toString());
				}
			}

			user = userRepo.create(credentials.getUin());
			user.setUsername(credentials.getUin());
			user.setRole(role);
			user.setFirstName(credentials.getFirstName());
			user.setLastName(credentials.getLastName());
			user = userRepo.save(user);

		} else {
			user = optionalUser.get();
			
			boolean changed = false;
			
			if(credentials.getUin() != user.getUsername()) {
				user.setUsername(credentials.getUin());
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
		credentials.setUin(user.getUsername());

		return user;

	}

	@Override
	public String getAnonymousRole() {
		return Role.ROLE_ANONYMOUS.toString();
	}

}
