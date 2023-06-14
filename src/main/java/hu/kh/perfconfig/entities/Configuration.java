package hu.kh.perfconfig.entities;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.apache.commons.lang3.StringUtils;
import org.json.JSONArray;
import org.json.JSONObject;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Entity
public class Configuration {

	public static class MyStringToJSON extends JsonSerializer<String> {

		public MyStringToJSON() {
		}

		@Override
		public void serialize(String value, JsonGenerator gen, SerializerProvider serializers) throws IOException {
			try {
				gen.writeRawValue(new JSONObject(value).toString());
			} catch (Exception ex) {
				gen.writeRawValue("{}");
			}
		}
	}

	public static class JSonToStringDeserializer extends JsonDeserializer<String> {

		@Override
		public String deserialize(JsonParser jp, DeserializationContext ctxt)
				throws IOException, JsonProcessingException {
			JsonNode node = jp.getCodec().readTree(jp);
			return node.toString();
		}

	}

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
	@CollectionTable(name = "configuration_properties")
	@ElementCollection
	@Embedded
	List<PropertyInstance> properties = new ArrayList<>();

	@JsonProperty
	// @JsonSerialize(using = IDArraySerializer.class)
	// @JsonDeserialize(using = IDArrayDeserializer.class)
	@ElementCollection
	List<Long> configurationTemplate = new ArrayList<>();

	@JsonProperty
	@Column(columnDefinition = "MEDIUMTEXT")
	@JsonDeserialize(using = JSonToStringDeserializer.class)
	@JsonSerialize(using = MyStringToJSON.class)
	String graph = "{" + "    nodes: [" + "      {" + "        id: \"start\"," + "        title: \"\","
			+ "        type: \"start\"," + "        x: -200," + "        y: 200," + "      }," + "      {"
			+ "        id: \"end\"," + "        title: \"\"," + "        type: \"end\"," + "        x: 200,"
			+ "        y: 200," + "      }," + "    ]," + "    edges: []," + "  }";
	
	@JsonProperty
	@Column(columnDefinition = "MEDIUMTEXT")
	String json;
	
	@JsonProperty
	public void setGraph(String graph) {
		this.graph = graph;
		this.json = convert(graph);
	}

	/*
	 * @JsonProperty
	 * 
	 * @JsonSerialize(using = IPropertySerializer.class) public String
	 * getProperties() throws IOException { ObjectMapper objectMapper = new
	 * ObjectMapper(); try(StringWriter stringWriter = new StringWriter()) {
	 * objectMapper.writeValue(stringWriter,
	 * properties.stream().collect(Collectors.groupingBy(PropertyInstance::
	 * getInterface)));
	 * //gen.writeObject(value.stream().collect(Collectors.groupingBy(
	 * PropertyInstance::getInterface))); return stringWriter.toString(); } }
	 */

	static String graphexample = "{\"nodes\":[{\"x\":-772.2047119140625,\"y\":202.5300750732422,\"id\":\"start\",\"title\":\"\",\"type\":\"start\"},{\"x\":200,\"y\":200,\"id\":\"end\",\"title\":\"\",\"type\":\"end\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-601.8917236328125,\"y\":100.63218688964844,\"id\":\"1\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-601.8917236328125,\"y\":286.17041015625,\"id\":\"7\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-421.1519470214844,\"y\":-17.728397369384766,\"id\":\"5\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"zzz\",\"value\":9},\"x\":-430.7487487792969,\"y\":131.02206420898438,\"id\":\"3\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-224.41744995117188,\"y\":-30.52413558959961,\"id\":\"6\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-230.81532287597656,\"y\":115.02738952636719,\"id\":\"4\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-80.46539306640625,\"y\":52.64816665649414,\"id\":\"2\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-70.86858367919922,\"y\":262.1783752441406,\"id\":\"9\",\"title\":\"Title\",\"type\":\"button\"},{\"id\":\"8\",\"title\":\"Title\",\"x\":-363.53155517578125,\"y\":273.2652587890625,\"type\":\"button\",\"template\":{\"label\":\"tretewr\",\"value\":1}}],\"edges\":[{\"source\":\"start\",\"type\":\"emptyEdge\",\"target\":\"1\"},{\"source\":\"start\",\"type\":\"emptyEdge\",\"target\":\"7\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"5\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"3\"},{\"source\":\"3\",\"type\":\"emptyEdge\",\"target\":\"4\"},{\"source\":\"5\",\"type\":\"emptyEdge\",\"target\":\"6\"},{\"source\":\"6\",\"type\":\"emptyEdge\",\"target\":\"2\"},{\"source\":\"4\",\"type\":\"emptyEdge\",\"target\":\"2\"},{\"source\":\"9\",\"type\":\"emptyEdge\",\"target\":\"end\"},{\"source\":\"2\",\"type\":\"emptyEdge\",\"target\":\"end\"},{\"source\":\"7\",\"target\":\"8\",\"type\":\"emptyEdge\"},{\"source\":\"8\",\"target\":\"9\",\"type\":\"emptyEdge\"}]}";
	static String graphexample2 = "{\"nodes\":[{\"x\":-200,\"y\":200,\"id\":\"1\",\"title\":\"\",\"type\":\"start\"},{\"x\":200,\"y\":200,\"id\":\"4\",\"title\":\"\",\"type\":\"end\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-5.62468957901001,\"y\":89.47645568847656,\"id\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"zzz\",\"value\":9},\"x\":13.373437881469727,\"y\":304.45526123046875,\"id\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\",\"title\":\"Title\",\"type\":\"button\"}],\"edges\":[{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\"},{\"source\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\",\"type\":\"emptyEdge\",\"target\":\"4\"},{\"source\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\",\"type\":\"emptyEdge\",\"target\":\"4\"}]}";

	static class Execution {
		public Execution() {
		}

		@Override
		public String toString() {
			return "Execution";
		}

		public boolean idEquals(String i) {
			return false;
		}

	}
	static class Edge {
		String source;
		String target;

		public Edge(JSONObject jsonObject) {
			source = jsonObject.getString("source");
			target = jsonObject.getString("target");
		}
		
		@Override
		public String toString() {
			return source+"->"+target;
		}
	}

	static class Node extends Execution {
		
		String id;

		public Node(JSONObject jsonObject) {
			id = jsonObject.getString("id");
		}
		public Node() {
		}

		public boolean idEquals(String i) {
			return id.equals(i);
		}
		
		@Override
		public String toString() {
			return "{\"Node\": \""+id+"\"}";
		}

	}

	public static String convert(String g) {
		JSONArray edgesObject = new JSONObject(g).getJSONArray("edges");
		JSONArray nodesObject = new JSONObject(g).getJSONArray("nodes");
		final List<Edge> edges = new ArrayList<>();
		final List<Node> nodes = new ArrayList<>();
		edgesObject.forEach(n -> edges.add(new Edge((JSONObject) n)));
		nodesObject.forEach(n -> nodes.add(new Node((JSONObject) n)));
		List<Node> newnodes = new ArrayList<>(nodes);

		String json = StringUtils.join(newnodes).toString();
		
		for (int i=0; i<20 && newnodes.size()>1; i++) {
			newnodes = convertSequential(newnodes,edges);
			newnodes = convertParallel(newnodes,edges);
			json = StringUtils.join(newnodes).toString();
		}
		json = newnodes.get(0).toString();
		return new JSONObject(json).toString(3);
	}

	static class Parallel extends Node {
		
		List<Node> nodes = new ArrayList<>();
		
		public Parallel(Node n1, Node n2) {
			nodes.add(n1);
			nodes.add(n2);
		}
		
		@Override
		public String toString() {
			return "{\"Parallel\": "+ StringUtils.join(nodes)+"}";
		}
		
		public boolean idEquals(String i) {
			return nodes.stream().filter(iddd-> iddd.idEquals(i)).count()>0;
		}

	}

	static class Sequential extends Node {
		
		List<Node> nodes = new ArrayList<>();
		
		public Sequential(Node source, Node target) {
			nodes.add(source);
			nodes.add(target);
			//source.id.forEach(n -> id.add(n));
			//target.id.forEach(n -> id.add(n));
		}
		
		@Override
		public String toString() {
			return "{\"Sequential\": "+StringUtils.join(nodes)+"}";
		}

		public boolean idEquals(String i) {
			return nodes.stream().filter(iddd-> iddd.idEquals(i)).count()>0;
		}

	}

	private static List<Node> convertSequential(List<Node> nodes, List<Edge> edges) {
		final List<Node> newnodes = new ArrayList<>(nodes);
		for (int j=0; j<edges.size(); j++) {
			int incomingCount = 0;
			int outgoingCount = 0;
			Edge e1 = edges.get(j); 
			for (int i=0; i<edges.size(); i++) {
				Edge e2 = edges.get(i);
				if (e1 != e2) {
					if (e1.source.equals(e2.source)) {
						incomingCount++;
					}
					if (e1.target.equals(e2.target)) {
						outgoingCount++;
					}
				}
			}

			if (incomingCount==0 && outgoingCount==0) {
				Node sourceNode = newnodes.stream().filter(n-> n.idEquals(e1.source)).findFirst().get();
				Node targetNode = newnodes.stream().filter(n-> n.idEquals(e1.target)).findFirst().get();
				if (sourceNode instanceof Sequential  && targetNode instanceof Node) {
					((Sequential)sourceNode).nodes.add(targetNode);
					newnodes.remove(targetNode);
				} else if (sourceNode instanceof Node  && targetNode instanceof Sequential) {
					newnodes.remove(sourceNode);
					((Sequential)targetNode).nodes.add(0,sourceNode);
				} else if (sourceNode instanceof Sequential  && targetNode instanceof Sequential) {
					newnodes.remove(targetNode);
					((Sequential)sourceNode).nodes.addAll(((Sequential)targetNode).nodes);
				} else {
					newnodes.remove(sourceNode);
					newnodes.remove(targetNode);
					newnodes.add(new Sequential(sourceNode, targetNode));
				}
				edges.remove(e1);
				return newnodes;
			} else {
			}
		}
		return newnodes;
	}

	private static List<Node> convertParallel(List<Node> nodes, List<Edge> edges) {
		final List<Node> newnodes = new ArrayList<>(nodes);
		for (int i=0; i<newnodes.size(); i++) {
			Node n1 = newnodes.get(i);
			List<Edge> incomingEdges1 = edges.stream().filter(e1 ->n1.idEquals(e1.target)).collect(Collectors.toList());
			List<Edge> outgoingEdges1 = edges.stream().filter(e1 ->n1.idEquals(e1.source)).collect(Collectors.toList());
			//System.out.println(n1.toString()+" "+incomingEdges1.size()+" "+outgoingEdges1.size());
			if (incomingEdges1.size()<=1 && outgoingEdges1.size()<=1) {
				String sourceNodeId1 = incomingEdges1.size()==0 ? "*" : incomingEdges1.get(0).source;
				String targetNodeId1 = outgoingEdges1.size()==0 ? "*" : outgoingEdges1.get(0).target;
				for (int j=0; j<newnodes.size(); j++) {
					Node n2 = newnodes.get(j);
					if (n1!=n2) {
						List<Edge> incomingEdges2 = edges.stream().filter(e1 ->n2.idEquals(e1.target)).collect(Collectors.toList());
						List<Edge> outgoingEdges2 = edges.stream().filter(e1 ->n2.idEquals(e1.source)).collect(Collectors.toList());
						if (incomingEdges2.size()==1 && outgoingEdges2.size()==1) {
							String sourceNodeId2 = incomingEdges2.size()==0 ? "*": incomingEdges2.get(0).source;
							String targetNodeId2 = outgoingEdges2.size()==0 ? "*" : outgoingEdges2.get(0).target;
							if (sourceNodeId1.equals(sourceNodeId2) && targetNodeId1.equals(targetNodeId2)) {
								edges.remove(incomingEdges2.get(0));
								edges.remove(outgoingEdges2.get(0));
								
								if (n1 instanceof Parallel && n2 instanceof Node) {
									((Parallel)n1).nodes.add(n2);
									newnodes.remove(n2);
								} else if (n1 instanceof Node  && n2 instanceof Parallel) {
									newnodes.remove(n1);
									((Parallel)n2).nodes.add(0,n1);
								} else if (n1 instanceof Parallel  && n2 instanceof Parallel) {
									newnodes.remove(n2);
									((Parallel)n1).nodes.addAll(((Parallel)n2).nodes);
								} else {
									newnodes.remove(n1);
									newnodes.remove(n2);
									newnodes.add(new Parallel(n1, n2));
								}

								
								return newnodes;
							}
						}
					}
				}
			}
		}
		return newnodes;
	}
	
	public static void main(String[] args) {
		System.out.println(convert(graphexample2));
	}

}
