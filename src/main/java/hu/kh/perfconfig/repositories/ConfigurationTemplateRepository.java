package hu.kh.perfconfig.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import hu.kh.perfconfig.entities.ConfigurationTemplate;

@RepositoryRestResource(exported = true)
public interface ConfigurationTemplateRepository extends CrudRepository<ConfigurationTemplate, Long> {

}
