package hu.kh.perfconfig.entities;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import hu.kh.perfconfig.IDDeserializer;
import hu.kh.perfconfig.IDSerializer;
import hu.kh.perfconfig.IPropertySerializer;

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
	@JsonSerialize(using = IDSerializer.class)
	@JsonDeserialize(using = IDDeserializer.class)
	Long configurationTemplate;

	@JsonProperty
	@CollectionTable(name = "configuration_properties")
	@ElementCollection
	@Embedded
	List<PropertyInstance> properties = new ArrayList<>();
	
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
