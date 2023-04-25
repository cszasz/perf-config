package hu.kh.perfconfig.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Embeddable;
import javax.persistence.Embedded;

@Embeddable
public class PropertyInstances {
	
	@ElementCollection
	@Embedded
	List<PropertyInstance> properties = new ArrayList<>();
	
	public List<PropertyInstance> getProperties() {
		return properties;
	}

}
