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
        message
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
        message
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
    appLogName: `common.json.log`,
    outputJSON: false
  };

  config.logaggregate = {
    commonLogPath: path.join(logDir, "common.json.log")
  };

  config.customLogger = {
    requestLogger: {
      file: path.join(logDir, "request.json.log"),
      contextFormatter: formatter
    }
  };

  return config;
};
