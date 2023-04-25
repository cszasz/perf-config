package hu.kh.perfconfig.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
public class ConfigurationTemplate {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	@JsonProperty
	long id;

	@JsonProperty
	String name;

	@JsonProperty
	@Column(columnDefinition = "VARCHAR(1000)")
	String description;
	
	@JsonProperty
	@ElementCollection
	List<Property> properties = new ArrayList<>();

}
