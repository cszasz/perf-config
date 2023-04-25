package hu.kh.perfconfig;

import java.io.IOException;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class IDDeserializer extends JsonDeserializer<Long> {
	
	public IDDeserializer() {
	}

	@Override
	public Long deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
		ObjectNode node = p.getCodec().readTree(p);
		return node.get("id").asLong();
	}
}
