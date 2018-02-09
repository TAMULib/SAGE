package edu.tamu.cap.model.repo;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import edu.tamu.cap.model.IR;
import edu.tamu.cap.model.repo.custom.IRRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface IRRepo extends WeaverRepo<IR>, IRRepoCustom, JpaSpecificationExecutor<IR> {

	IR findByName(String name);

}
