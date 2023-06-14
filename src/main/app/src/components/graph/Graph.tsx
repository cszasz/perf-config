import { Select } from "antd";
import React from "react";
import { GraphView } from "react-digraph";

const BUTTON_TYPE = "button";
const CHAT_TYPE = "chat";
const TEXT_TYPE = "text";

const TYPES = {
  [BUTTON_TYPE]: BUTTON_TYPE,
  [TEXT_TYPE]: TEXT_TYPE,
  [CHAT_TYPE]: CHAT_TYPE,
};

const EMPTY_EDGE_TYPE = "emptyEdge";

const GraphConfig = {
  NodeTypes: {
    start: {
      // required to show empty nodes
      typeText: "Start",
      shapeId: "#start", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="start" key="0">
          <circle cx="50" cy="50" r="30" fill="gray" />
        </symbol>
      ),
    },
    button: {
      // required to show empty nodes
      typeText: "Button",
      shapeId: "#button", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="button" key="0">
          <circle cx="50" cy="50" r="35" />
        </symbol>
      ),
    },
    end: {
      // required to show empty nodes
      typeText: "End",
      shapeId: "#end", // relates to the type property of a node
      shape: (
        <symbol viewBox="0 0 100 100" id="end" key="0">
          <circle cx="50" cy="50" r="30" fill="red" />
        </symbol>
      ),
    },
  },
  NodeSubtypes: {},
  EdgeTypes: {
    emptyEdge: {
      // required to show empty edges
      shapeId: "#emptyEdge",
      // edge type could be "wait" or "delay" and
      // the target node's wait time could be displayed in the edge (in the arrow)
      shape: (
        <symbol viewBox="0 0 50 50" id="emptyEdge" key="0">
          <circle cx="25" cy="25" r="8" fill="currentColor">
            {" "}
          </circle>
        </symbol>
      ),
    },
  },
};

const NODE_KEY = "id"; // Allows D3 to correctly update DOM

const style = {
  height: "40vh",
};

type Props = {
  graph: any;
  setState: any;
  selected: any;
  setSelected: any;
  options: any;
};

type State = {};

export default class Graph extends React.Component<Props, State> {
  state = {
    graph: { nodes: [], edges: [] },
  };

  static getDerivedStateFromProps(props, state) {
    if (JSON.stringify(props.graph) != JSON.stringify(state.graph)) {
      return { graph: props.graph };
    } else {
      return state;
    }
  }

  onCreateNode = (x, y, a) => {
    const node = {
      id: UUID(),
      title: "Title",
      x,
      y,
      type: BUTTON_TYPE,
      template: this.props["options"][0],
    };
    this.props.graph.nodes = this.props.graph.nodes.concat(node);
    this.props.setState(JSON.parse(JSON.stringify(this.props.graph)));
  };

  onSelect = (selection) => {
    this.props.setSelected(selection);
  };

  onUpdateNode = (viewNode) => {
    const graph = this.props.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.props.setState(graph);
  };

  onDeleteSelected = (selected) => {
    const graph = this.props.graph;

    var newEdges = graph.edges;
    var newNodes = graph.nodes;

    if (selected.nodes) {
      const nodesSelected = Array.from(selected.nodes.values());
      newNodes = newNodes.filter(
        (node) => !nodesSelected.find((n: any) => n.id === node.id)
      );
      newEdges = newEdges.filter(
        (edge) =>
          !nodesSelected.find(
            (e: any) => e.id === edge.source || e.id === edge.target
          )
      );
    }

    if (selected.edges) {
      const edgesSelected = Array.from(selected.edges.values());
      newEdges = newEdges.filter(
        (edge) =>
          !edgesSelected.find(
            (e: any) => e.source === edge.source && e.target === edge.target
          )
      );
    }

    this.props.setState({ edges: newEdges, nodes: newNodes });
    this.props.setSelected({ nodes: new Map(), edges: new Map() });
  };

  onCreateEdge = (sourceViewNode, targetViewNode) => {
    const graph = this.props.graph;
    const type = EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type,
    };

    // Only add the edge when the source node is not the same as the target
    if (viewEdge.source !== viewEdge.target) {
      graph.edges = [...graph.edges, viewEdge];
      this.props.setState(graph);
      this.props.setSelected(viewEdge);
    }
  };

  getNodeIndex(searchNode) {
    return this.props.graph.nodes.findIndex((node) => {
      return node[NODE_KEY] === searchNode[NODE_KEY];
    });
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.props.graph.edges.findIndex((edge) => {
      return (
        edge.source === searchEdge.source && edge.target === searchEdge.target
      );
    });
  }

  updateSelectedNodeTitle = (e) => {
    const graph = JSON.parse(JSON.stringify(this.props.graph));
    const selected = this.props.selected;
    const title = e.target.value;
    const key = selected.nodes.keys().next().value;
    graph.nodes.find((n) => n.id === key).title = title;
    this.props.setState(graph);
  };

  updateSelectedNodeType = (e) => {
    const graph = JSON.parse(JSON.stringify(this.props.graph));
    const selected = this.props.selected;
    const type = this.props["options"].find((o) => o.value == e);

    //if (type in TYPES) {
    selected.type = type;

    const key = selected.nodes.keys().next().value;
    graph.nodes.find((n) => n.id === key).template = type;

    this.props.setState(graph);
    //}
  };

  renderNode = (
    nodeRef: any,
    data: any,
    id: string,
    selected: boolean,
    hovered: boolean
  ) => {
    return (
      <React.Fragment>
        <g
          className="shape"
          width="154"
          height="154"
          xmlns="http://www.w3.org/2000/svg"
        >
          <use
            className="node"
            x="-77"
            y="-77"
            width="154"
            height="154"
            style={{ strokeWidth: selected ? "2px" : "" }}
            href={"#" + data.type}
            xmlns="http://www.w3.org/2000/svg"
          ></use>
        </g>
      </React.Fragment>
    );
  };

  renderNodeText = (data, id, selected) => {
    return (
      <text
        className="node-text"
        text-anchor="middle"
        xmlns="http://www.w3.org/2000/svg"
      >
        <tspan opacity="0.5">
          {data.template ? data.template.label : data.type}
        </tspan>
        <tspan x="0" dy="18" fontSize="10px" xmlns="http://www.w3.org/2000/svg">
          {data.title}
        </tspan>
      </text>
    );
  };

  nodess: any;

  render() {
    const nodes = this.state.graph.nodes;
    const edges = this.state.graph.edges;
    const selected = this.props.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;
    var node: any = null;
    if (selected?.nodes?.size) {
      node = Array.from(selected?.nodes.values())[0];
    }

    return (
      <div key="graph">
        <div
          key="graph2"
          style={{ position: "absolute", right: 0, top: "0", zIndex: 2 }}
        >
          <p>Shift+click creates a new node</p>
          <p>Shift+click a node and drag to another node creates an edge</p>
          <p>Click a node and pressing delete deletes the node and its edges</p>
        </div>
        <div id="graph" style={style} key="graph">
          <GraphView
            key="graph"
            ref="GraphView"
            nodeKey={NODE_KEY}
            nodes={nodes}
            edges={edges}
            selected={selected}
            nodeTypes={NodeTypes}
            nodeSubtypes={NodeSubtypes}
            edgeTypes={EdgeTypes}
            onCreateNode={this.onCreateNode}
            onSelect={this.onSelect}
            onUpdateNode={this.onUpdateNode}
            onDeleteSelected={this.onDeleteSelected}
            onCreateEdge={this.onCreateEdge}
            renderNode={this.renderNode}
            renderNodeText={this.renderNodeText}
          />
        </div>
        {selected?.nodes?.size &&
        node?.type !== "end" &&
        node?.type !== "start" ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ margin: 0, marginRight: "20px" }}>Update a node</h4>
            <input
              style={{
                height: "30px",
                width: "300px",
                margin: 0,
                marginRight: "20px",
              }}
              type="text"
              defaultValue={node.title}
              onChange={this.updateSelectedNodeTitle}
            />
            <div style={{ flexGrow: "1", height: "30px" }}>
              <Select
                //onBlur={() => configurationTemplateSelectProps?.onSearch?.("")}
                key={node.id}
                options={this.props["options"]}
                defaultValue={node?.template?.value}
                onChange={this.updateSelectedNodeType}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

function UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
    /[xy]/g,
    function (c) {
      var r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
  return uuid;
}
