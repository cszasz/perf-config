import {
  IntentModel,
} from "./Intent";
import {
  DiagramWidget,
} from "storm-react-diagrams";
import * as React from "react";
require("storm-react-diagrams/dist/style.min.css");

export class Diagram extends React.Component {

  state = {
    updated: Math.random(),
  };

  addNode = (e) => {
    e.stopPropagation();
    e.preventDefault();
    //const { model } = this;
    const node = new IntentModel();
    node.setPosition(200, 200);
    this.props.model.addNode(node);
    this.setState({ updated: Math.random() });
  };

  render() {

    return (
      <>
        <button onClick={this.addNode}>Add node</button>
        <DiagramWidget
          className="srd-demo-canvas"
          diagramEngine={this.props.engine}
          maxNumberPointsPerLink={0}
        />
      </>
    );
  }
}
