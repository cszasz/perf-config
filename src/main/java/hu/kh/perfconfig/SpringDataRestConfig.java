package hu.kh.perfconfig;

import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import hu.kh.perfconfig.entities.Configuration;
import hu.kh.perfconfig.entities.ConfigurationTemplate;
import hu.kh.perfconfig.entities.Environment;
import hu.kh.perfconfig.entities.Goal;

@Component
public class SpringDataRestConfig implements RepositoryRestConfigurer {

	@Override
	public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
		config.exposeIdsFor(Environment.class, ConfigurationTemplate.class, Configuration.class, Goal.class);
		RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);

		cors.addMapping("/**").allowedOrigins("*").allowedMethods("GET", "PUT", "DELETE","POST","PATCH").allowCredentials(false)
				.maxAge(3600);
	}

}