package hu.kh.perfconfig;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.ObjectNode;

import hu.kh.perfconfig.entities.Property;

public class IPropertyDeserializer extends JsonDeserializer<List<Property>> {

	public IPropertyDeserializer() {
	}

	@Override
	public List<Property> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
		ObjectNode node = p.getCodec().readTree(p);
		//return node.get("id").asLong();
		return null;
	}
}
