import * as React from "react";
import { IntentPortWidget } from "./port_widget";

export class IntentWidget extends React.Component {
  static defaultProps = {
    size: 150,
    node: null,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { size, node } = this.props;
    return (
      <div
        className={"diamond-node"}
        style={{
          position: "relative",
          width: size,
          height: size / 2,
        }}
      >
        <div className={"intent-node"}>
          <span>Intent</span>
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: size / 2 / 2 - 8,
            left: -20,
          }}
        >
          <IntentPortWidget name="left" node={node} />
        </div>
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            left: size + 4,
            top: size / 2 / 2 - 8,
          }}
        >
          <IntentPortWidget name="right" node={node} />
        </div>
      </div>
    );
  }
}
