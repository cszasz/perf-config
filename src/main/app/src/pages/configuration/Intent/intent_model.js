import { NodeModel } from "storm-react-diagrams";
import { IntentPortModel } from "./port_model";

export class IntentModel extends NodeModel {
  constructor() {
    super("diamond");
    //this.addPort(new IntentPortModel("top"));
    this.addPort(new IntentPortModel("left"));
    //this.addPort(new IntentPortModel("bottom"));
    this.addPort(new IntentPortModel("right"));
  }
}
