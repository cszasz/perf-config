package hu.kh.perfconfig.entities;

import javax.persistence.Embeddable;

import com.fasterxml.jackson.annotation.JsonProperty;

@Embeddable
public class PropertyInstance {
	
	@JsonProperty
	String inter;

	@JsonProperty
	Long configuration_template;

	@JsonProperty
	String name;

	@JsonProperty
	String value;
	
	public String getInterface() {
		return inter;
	}

	public void setInterface(String inter) {
		this.inter = inter;
	}

}
