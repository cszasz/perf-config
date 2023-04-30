package hu.kh.perfconfig;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class IDArrayDeserializer extends JsonDeserializer<List<Long>> {
	
	public IDArrayDeserializer() {
	}

	@Override
	public List<Long> deserialize(JsonParser p, DeserializationContext ctxt) throws IOException, JacksonException {
		ObjectNode node = p.getCodec().readTree(p);
		List<Long> v = new ArrayList<>();
		ArrayNode array = (ArrayNode)node.get("id");
		for (int i=0; i<array.size(); i++)
			v.add(array.get(i).asLong());
		return v;
	}
}

