import { EggPlugin } from "egg";
const path = require("path");

const plugin: EggPlugin = {
  logaggregate: {
    enable: true,
    path: path.join(__dirname, "../../../../..")
  }
};

export default plugin;
