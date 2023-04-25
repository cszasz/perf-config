package hu.kh.perfconfig.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import hu.kh.perfconfig.entities.Goal;

@RepositoryRestResource(exported = true)
public interface GoalRepository extends PagingAndSortingRepository<Goal, Long> {

}
