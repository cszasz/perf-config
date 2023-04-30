package hu.kh.perfconfig;

import java.io.IOException;
import java.util.List;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

public class IDArraySerializer extends JsonSerializer<List<Long>> {
	
	public IDArraySerializer() {
	}
	
	@Override
	public void serialize(List<Long> value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
	    gen.writeStartArray();
	    value.forEach(v -> {
	    	try {
				gen.writeStartObject();
		    	gen.writeFieldName("id");
	            gen.writeNumber(v);
	            gen.writeEndObject();
			} catch (IOException e) {
			}
	    });
	    gen.writeEndArray();
	}
}


