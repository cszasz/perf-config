package hu.kh.perfconfig;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class IPropertySerializer extends JsonSerializer<String> {
	
	public IPropertySerializer() {
	}

	@Override
	public void serialize(String value, JsonGenerator gen, SerializerProvider serializers)
			throws IOException {
			gen.writeRaw(value);
		
	}

}
