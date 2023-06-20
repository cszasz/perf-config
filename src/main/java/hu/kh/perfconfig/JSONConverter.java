package hu.kh.perfconfig;
import org.json.JSONArray;
import org.json.JSONObject;

public class JSONConverter {
    public static String convertJSON(String json) {
        JSONObject inputObject = new JSONObject(json);
        JSONArray nodes = inputObject.getJSONArray("nodes");
        JSONArray edges = inputObject.getJSONArray("edges");

        JSONObject outputObject = new JSONObject();
        outputObject.put("Sequential", convertNodes(nodes, edges));

        return outputObject.toString();
    }

    private static JSONArray convertNodes(JSONArray nodes, JSONArray edges) {
        JSONArray sequentialArray = new JSONArray();
        JSONObject startNode = findStartNode(nodes, edges);
        sequentialArray.put(createNodeObject(startNode));

        JSONArray remainingNodes = new JSONArray(nodes.toString());
        removeNode(remainingNodes, startNode);
        

        while (remainingNodes.length() > 0) {
            JSONObject nextNode = findNextNode(remainingNodes, edges, startNode.getString("id"));
            JSONArray parallelArray = new JSONArray();

            while (nextNode != null) {
                removeNode(remainingNodes,nextNode);
                parallelArray.put(createNodeObject(nextNode));

                nextNode = findNextNode(remainingNodes, edges, nextNode.getString("id"));
            }

            if (parallelArray.length() > 1) {
                sequentialArray.put(createParallelObject(parallelArray));
            } else {
                sequentialArray.put(parallelArray.getJSONObject(0));
            }
        }

        return sequentialArray;
    }

    private static void removeNode(JSONArray remainingNodes, JSONObject startNode) {
		for (int i=0; i<remainingNodes.length(); i++) {
			if (remainingNodes.get(i)==startNode)
				remainingNodes.remove(i);
		}
		
	}

	private static JSONObject createNodeObject(JSONObject node) {
        JSONObject nodeObject = new JSONObject();
        nodeObject.put("Node", node.getString("id"));
        return nodeObject;
    }

    private static JSONObject createParallelObject(JSONArray nodes) {
        JSONObject parallelObject = new JSONObject();
        parallelObject.put("Parallel", nodes);
        return parallelObject;
    }

    private static JSONObject findStartNode(JSONArray nodes, JSONArray edges) {
        for (int i = 0; i < nodes.length(); i++) {
            JSONObject node = nodes.getJSONObject(i);
            String nodeId = node.getString("id");

            boolean hasIncomingEdges = false;
            for (int j = 0; j < edges.length(); j++) {
                JSONObject edge = edges.getJSONObject(j);
                String targetId = edge.getString("target");
                if (targetId.equals(nodeId)) {
                    hasIncomingEdges = true;
                    break;
                }
            }

            if (!hasIncomingEdges) {
                return node;
            }
        }

        return null; // No start node found
    }

    private static JSONObject findNextNode(JSONArray nodes, JSONArray edges, String currentNodeId) {
        for (int i = 0; i < edges.length(); i++) {
            JSONObject edge = edges.getJSONObject(i);
            String sourceId = edge.getString("source");
            String targetId = edge.getString("target");

            if (sourceId.equals(currentNodeId)) {
                for (int j = 0; j < nodes.length(); j++) {
                    JSONObject node = nodes.getJSONObject(j);
                    String nodeId = node.getString("id");

                    if (nodeId.equals(targetId)) {
                        return node;
                    }
                }
            }
        }

        return null; // No next node found
    }

	static String graphexample = "{\"nodes\":[{\"x\":-772.2047119140625,\"y\":202.5300750732422,\"id\":\"start\",\"title\":\"\",\"type\":\"start\"},{\"x\":200,\"y\":200,\"id\":\"end\",\"title\":\"\",\"type\":\"end\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-601.8917236328125,\"y\":100.63218688964844,\"id\":\"1\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-601.8917236328125,\"y\":286.17041015625,\"id\":\"7\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-421.1519470214844,\"y\":-17.728397369384766,\"id\":\"5\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"zzz\",\"value\":9},\"x\":-430.7487487792969,\"y\":131.02206420898438,\"id\":\"3\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-224.41744995117188,\"y\":-30.52413558959961,\"id\":\"6\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-230.81532287597656,\"y\":115.02738952636719,\"id\":\"4\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-80.46539306640625,\"y\":52.64816665649414,\"id\":\"2\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-70.86858367919922,\"y\":262.1783752441406,\"id\":\"9\",\"title\":\"Title\",\"type\":\"button\"},{\"id\":\"8\",\"title\":\"Title\",\"x\":-363.53155517578125,\"y\":273.2652587890625,\"type\":\"button\",\"template\":{\"label\":\"tretewr\",\"value\":1}}],\"edges\":[{\"source\":\"start\",\"type\":\"emptyEdge\",\"target\":\"1\"},{\"source\":\"start\",\"type\":\"emptyEdge\",\"target\":\"7\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"5\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"3\"},{\"source\":\"3\",\"type\":\"emptyEdge\",\"target\":\"4\"},{\"source\":\"5\",\"type\":\"emptyEdge\",\"target\":\"6\"},{\"source\":\"6\",\"type\":\"emptyEdge\",\"target\":\"2\"},{\"source\":\"4\",\"type\":\"emptyEdge\",\"target\":\"2\"},{\"source\":\"9\",\"type\":\"emptyEdge\",\"target\":\"end\"},{\"source\":\"2\",\"type\":\"emptyEdge\",\"target\":\"end\"},{\"source\":\"7\",\"target\":\"8\",\"type\":\"emptyEdge\"},{\"source\":\"8\",\"target\":\"9\",\"type\":\"emptyEdge\"}]}";
	static String graphexample2 = "{\"nodes\":[{\"x\":-200,\"y\":200,\"id\":\"1\",\"title\":\"\",\"type\":\"start\"},{\"x\":200,\"y\":200,\"id\":\"4\",\"title\":\"\",\"type\":\"end\"},{\"template\":{\"label\":\"tretewr\",\"value\":1},\"x\":-5.62468957901001,\"y\":89.47645568847656,\"id\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\",\"title\":\"Title\",\"type\":\"button\"},{\"template\":{\"label\":\"zzz\",\"value\":9},\"x\":13.373437881469727,\"y\":304.45526123046875,\"id\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\",\"title\":\"Title\",\"type\":\"button\"}],\"edges\":[{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\"},{\"source\":\"1\",\"type\":\"emptyEdge\",\"target\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\"},{\"source\":\"0b23106b-a6fe-46a6-8c32-03fa231a9754\",\"type\":\"emptyEdge\",\"target\":\"4\"},{\"source\":\"c102b41b-fd42-42dd-96d1-7cef17e169c2\",\"type\":\"emptyEdge\",\"target\":\"4\"}]}";

    
    public static void main(String[] args) {
        String convertedJson = convertJSON(graphexample);
        System.out.println(convertedJson);
    }
    
}
