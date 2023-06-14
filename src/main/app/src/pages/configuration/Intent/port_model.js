import * as _ from "lodash";
import { PortModel, DefaultLinkModel } from "storm-react-diagrams";

export class IntentPortModel extends PortModel {
  position = "top";

  constructor(pos = "top") {
    super(pos, "diamond");
    this.position = pos;
  }

  serialize() {
    return _.merge(super.serialize(), {
      position: this.position,
    });
  }

  deSerialize(data, engine) {
    super.deSerialize(data, engine);
    this.position = data.position;
  }

  link(port) {
    let link = this.createLinkModel();
    link.setSourcePort(this);
    link.setTargetPort(port);
    return link;
  }

  createLinkModel() {
    return new DefaultLinkModel();
  }
}
