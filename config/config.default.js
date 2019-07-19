"use strict";

const path = require("path");

module.exports = appInfo => {
  const config = {};

  const logDir = path.join(appInfo.root, "logs", appInfo.name);

  config.logaggregate = {
    commonLogPath: path.join(logDir, "common.json.log")
  };

  config.customLogger = {
    requestLogger: {
      file: path.join(logDir, "request.json.log"),
      contextFormatter: meta =>
        JSON.stringify(
          (({
            controller,
            request,
            status,
            url,
            response,
            "@region": region,
            "@clientip": clientIp,
            "@duration": duration,
            "@env": env,
            "@serverip": serverIp,
            "@servername": serverName,
            "@timestamp": timestamp,
            "content-type": contentType,
            method
          }) => ({
            controller,
            request,
            status,
            url,
            response,
            "@region": region,
            "@clientip": clientIp,
            "@duration": duration,
            "@env": env,
            "@serverip": serverIp,
            "@servername": serverName,
            "@timestamp": timestamp,
            "content-type": contentType,
            method
          }))(meta)
        )
    }
  };

  return config;
};
