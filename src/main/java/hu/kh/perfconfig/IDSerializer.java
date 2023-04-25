package hu.kh.perfconfig;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class IDSerializer extends JsonSerializer<Long> {
	
	public IDSerializer() {
	}
	
	@Override
	public void serialize(Long value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
		gen.writeRawValue("{ \"id\": "+value+"}");
	}
}
