package edu.tamu.cap.model.repo.custom;

import edu.tamu.cap.model.User;

/**
 * Custom user repository interface.
 * 
 * @author
 *
 */
public interface UserRepoCustom {

    /**
     * Creates application user based on uin in the repository
     * 
     * @param uin
     *            String
     */
    public User create(String uin);

    public User create(String uin, String firstName, String lastName, String role);

}
