package hu.kh.perfconfig.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import hu.kh.perfconfig.entities.Configuration;

@RepositoryRestResource(exported = true)
public interface ConfigurationsRepository extends CrudRepository<Configuration, Long> {

}
