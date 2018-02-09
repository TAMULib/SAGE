/* 
 * AppUserRepo.java 
 * 
 * Version: 
 *     $Id$ 
 * 
 * Revisions: 
 *     $Log$ 
 */
package edu.tamu.cap.model.repo;

import org.springframework.stereotype.Repository;

import edu.tamu.cap.model.User;
import edu.tamu.cap.model.repo.custom.UserRepoCustom;
import edu.tamu.weaver.auth.model.repo.AbstractWeaverUserRepo;

/**
 * User repository.
 * 
 * @author
 *
 */
@Repository
public interface UserRepo extends AbstractWeaverUserRepo<User>, UserRepoCustom {

}
