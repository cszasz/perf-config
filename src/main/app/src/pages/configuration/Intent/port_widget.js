import * as React from "react";
import { BaseWidget } from "storm-react-diagrams";

export class IntentPortWidget extends BaseWidget {
  constructor(props) {
    super("srd-port", props);
    this.state = {
      selected: false,
    };
  }

  getClassName() {
    return "port " + (this.state.selected && "selected");
  }

  render() {
    return (
      <div
        {...this.getProps()}
        onMouseEnter={() => {
          this.setState({ selected: true });
        }}
        onMouseLeave={() => {
          this.setState({ selected: false });
        }}
        data-name={this.props.name}
        data-nodeid={this.props.node.getID()}
      >
        <div className="port-dot" />
      </div>
    );
  }
}
