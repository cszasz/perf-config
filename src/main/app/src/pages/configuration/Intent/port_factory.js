import { AbstractPortFactory } from "storm-react-diagrams";

export class IntentPortFactory extends AbstractPortFactory {
  cb = null;

  constructor(type, cb) {
    super(type);
    this.cb = cb;
  }

  getNewInstance(initialConfig) {
    return this.cb(initialConfig);
  }
}
