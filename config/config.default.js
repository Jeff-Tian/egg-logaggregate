"use strict";

const path = require("path");

module.exports = appInfo => {
  const config = {};
  config.keys = "1234";

  const logDir = path.join(appInfo.root, "logs", appInfo.name);

  config.logger = {
    ...config.logger,
    outputJSON: true
  };

  config.logaggregate = {
    commonLogPath: `${path.join(logDir, "common.json.log")}`
  };

  return config;
};
