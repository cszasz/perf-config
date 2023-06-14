import * as SRD from "storm-react-diagrams";
import { IntentWidget } from "./intent_widget";
import { IntentModel } from "./intent_model.js";
import * as React from "react";

export class IntentFactory extends SRD.AbstractNodeFactory {
  constructor() {
    super("diamond");
  }

  generateReactWidget(diagramEngine: SRD.DiagramEngine, node: SRD.NodeModel) {
    return <IntentWidget node={node} />;
  }

  getNewInstance() {
    return new IntentModel();
  }
}
