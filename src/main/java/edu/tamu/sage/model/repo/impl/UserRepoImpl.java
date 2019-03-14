/*
 * UserRepoImpl.java
 *
 * Version:
 *     $Id$
 *
 * Revisions:
 *     $Log$
 */
package edu.tamu.sage.model.repo.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.UserRepo;
import edu.tamu.sage.model.repo.custom.UserRepoCustom;
import edu.tamu.weaver.data.model.repo.impl.AbstractWeaverRepoImpl;

/**
 * Implementation of the user repository.
 *
 * @author
 *
 */
public class UserRepoImpl extends AbstractWeaverRepoImpl<User, UserRepo> implements UserRepoCustom {

    @Autowired
    private UserRepo userRepo;

    /**
     * Creates application user in the user repository
     *
     * @param uin
     *            Long
     *
     * @see edu.tamu.app.model.repo.custom.UserRepoCustom#create(java.lang.Long)
     */
    @Override
    public synchronized User create(String email) {
        Optional<User> user = userRepo.findByUsername(email);
        return user.isPresent() ? user.get() : userRepo.save(new User(email));
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public synchronized User create(String email, String firstName, String lastName, String role) {
        Optional<User> user = userRepo.findByUsername(email);
        return user.isPresent() ? user.get() : userRepo.save(new User(email, firstName, lastName, role));
    }

    @Override
    public synchronized User create(String email, String firstName, String lastName, String role, String password) {
        Optional<User> user = userRepo.findByUsername(email);
        return user.isPresent() ? user.get() : userRepo.save(new User(email, firstName, lastName, role, password));
    }

    /**
     * {@inheritDoc}
     */
	@Override
	protected String getChannel() {
		return "/channel/user";
	}

}