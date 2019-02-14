"use strict";

const path = require("path");

module.exports = appInfo => {
  const config = {};
  config.keys = "1234";

  const logDir = path.join(appInfo.root, "logs", appInfo.name);

  config.customLogger = {
    aliSlsLogger: {
      file: `${appInfo.name}-web.log`
    }
  };

  config.logger = {
    ...config.logger,
    outputJSON: true
  };

  config.logaggregate = {
    path: `${path.join(logDir, "aggregate.json.log")}`,
    errorPath: `${path.join(logDir, "aggregate-error.json.log")}`
  };

  return config;
};
