package edu.tamu.sage.model.repo;

import edu.tamu.sage.model.DiscoveryView;
import edu.tamu.sage.model.repo.custom.DiscoveryViewRepoCustom;
import edu.tamu.weaver.data.model.repo.WeaverRepo;
import java.util.List;

public interface DiscoveryViewRepo extends WeaverRepo<DiscoveryView>, DiscoveryViewRepoCustom {

    public List<DiscoveryView> findAllByOrderByNameAsc();

    public DiscoveryView findOneBySlug(String slug);
}
