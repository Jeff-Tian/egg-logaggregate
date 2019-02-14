"use strict";

const path = require("path");

module.exports = appInfo => {
  const config = {};
  config.keys = "1234";

  const logDir = path.join(appInfo.root, "logs", appInfo.name);

  config.logaggregate = {
    commonLogPath: path.join(logDir, "common.json.log")
  };

  config.customLogger = {
    requestLogger: {
      file: path.join(logDir, "request.json.log"),
      contextFormatter: meta => JSON.stringify(meta)
    }
  };

  return config;
};
