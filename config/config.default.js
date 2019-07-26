"use strict";

const path = require("path");

const os = require("os");
const networkInterfaces = os.networkInterfaces();
const networks =
  networkInterfaces.eth0 ||
  networkInterfaces.eth1 ||
  networkInterfaces.en0 ||
  networkInterfaces.en1 ||
  networkInterfaces.本地连接;

const networkAddress = networks.find(n => n.family === "IPv4");

module.exports = appInfo => {
  const config = {};

  const logDir = path.join(
    appInfo.root || __dirname + "/..",
    "logs",
    appInfo.name
  );

  const formatter = meta =>
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
        method,
        message,
        level
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
        method,
        message,
        level
      }))({
        "@env": appInfo.env,
        "@servername": os.hostname(),
        "@timestamp": new Date(),
        "@region": process.env.REGION || null,
        "@serverip": networkAddress.address,
        ...meta
      })
    );

  config.logger = {
    formatter,
    contextFormatter: formatter,
    appLogName: `common.json.log`,
    coreLogName: "common.json.log",
    agentLogName: "common.json.log",
    errorLogName: "common.json.log",
    outputJSON: false
  };

  config.customLogger = {
    requestLogger: {
      file: path.join(logDir, "request.json.log"),
      contextFormatter: formatter,
      excludeUrls: ["/"]
    },
    scheduleLogger: {
      file: `common.json.log`
    }
  };

  return config;
};
