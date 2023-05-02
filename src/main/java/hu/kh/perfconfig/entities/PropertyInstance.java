package hu.kh.perfconfig.entities;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

@Embeddable
public class PropertyInstance {
	
	@JsonProperty("interface")
	@Column(name="interface")
	String inter;

	@JsonProperty
	Long configuration_template;

	@JsonProperty
	String name;

	@JsonProperty
	String value;
	
	@JsonIgnore
	public String getInterface() {
		return inter;
	}

}
