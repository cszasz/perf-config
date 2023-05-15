package hu.kh.perfconfig.entities;

import javax.persistence.Embeddable;
import javax.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

@Embeddable
public class Property {
	
	@JsonProperty
	String name;
	
	@JsonProperty
	String value;

	@JsonProperty
	String description;

}
