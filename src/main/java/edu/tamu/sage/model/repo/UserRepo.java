/*
 * AppUserRepo.java
 *
 * Version:
 *     $Id$
 *
 * Revisions:
 *     $Log$
 */
package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.User;
import edu.tamu.sage.model.repo.custom.UserRepoCustom;
import edu.tamu.weaver.auth.model.repo.AbstractWeaverUserRepo;
import org.springframework.stereotype.Repository;

/**
 * User repository.
 *
 * @author
 *
 */
@Repository
public interface UserRepo extends AbstractWeaverUserRepo<User>, UserRepoCustom {

    public User findByEmail(String email);
}
