package hu.kh.perfconfig.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import hu.kh.perfconfig.IDArrayDeserializer;
import hu.kh.perfconfig.IDArraySerializer;

@Entity
public class Configuration {

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
	@CollectionTable(name = "configuration_properties")
	@ElementCollection
	@Embedded
	List<PropertyInstance> properties = new ArrayList<>();

	@JsonProperty
	//@JsonSerialize(using = IDArraySerializer.class)
	//@JsonDeserialize(using = IDArrayDeserializer.class)
	@ElementCollection
	List<Long> configurationTemplate = new ArrayList<>();

	
	/*
	@JsonProperty
	@JsonSerialize(using = IPropertySerializer.class)
	public String getProperties() throws IOException {
		ObjectMapper objectMapper = new ObjectMapper();
		try(StringWriter stringWriter = new StringWriter()) {
			objectMapper.writeValue(stringWriter, properties.stream().collect(Collectors.groupingBy(PropertyInstance::getInterface)));
			//gen.writeObject(value.stream().collect(Collectors.groupingBy(PropertyInstance::getInterface)));
			return stringWriter.toString();
		}
	}*/

}
