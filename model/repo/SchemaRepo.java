package edu.tamu.cap.model.repo;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import edu.tamu.cap.model.Schema;
import edu.tamu.cap.model.repo.custom.SchemaRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;

public interface SchemaRepo extends WeaverRepo<Schema>, SchemaRepoCustom, JpaSpecificationExecutor<Schema> {

	Schema findByName(String name);

}
