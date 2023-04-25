package hu.kh.perfconfig.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import hu.kh.perfconfig.IDDeserializer;
import hu.kh.perfconfig.IDSerializer;

@Entity
public class Goal {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty
	long id;

	@JsonProperty
	String name;

	@JsonProperty
	@Column(columnDefinition = "VARCHAR(1000)")
	String description;

	@JsonProperty
	@JsonSerialize(using = IDSerializer.class)
	@JsonDeserialize(using = IDDeserializer.class)
	Long environment;

	
	@JsonProperty
	@JsonSerialize(using = IDSerializer.class)
	@JsonDeserialize(using = IDDeserializer.class)
	Long configuration;

}
