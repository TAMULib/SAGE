package edu.tamu.sage.model.repo.custom;

import edu.tamu.sage.model.User;

/**
 * Custom user repository interface.
 *
 * @author
 *
 */
public interface UserRepoCustom {

    /**
     * Creates application user based on email in the repository
     *
     * @param uin
     *            String
     */
    public User create(String email);

    public User create(String email, String firstName, String lastName, String role);

    public User create(String email, String firstName, String lastName, String role, String password);

}
