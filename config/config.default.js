"use strict";

const path = require("path");

const os = require("os");
const networkInterfaces = os.networkInterfaces();
const networks = networkInterfaces.eth0 ||
  networkInterfaces.eth1 ||
  networkInterfaces.en0 ||
  networkInterfaces.en1 ||
  networkInterfaces.本地连接 || { find: () => [] };

const networkAddress = networks.find(n => n.family === "IPv4");

module.exports = appInfo => {
  const config = {};

  const logDir = path.join(
    appInfo.root || __dirname + "/..",
    "logs",
    appInfo.name
  );

  const common = () => ({
    "@env": appInfo.env,
    "@servername": os.hostname(),
    "@timestamp": new Date(),
    "@region": process.env.REGION || null,
    "@serverip": networkAddress.address
  });

  const requestExtra = meta => ({
    response: meta.ctx.body,
    status: meta.ctx.status,
    session: meta.ctx.session,
    controller: meta.ctx.routerName,
    request: {
      params: meta.ctx.params,
      body: meta.ctx.request.body
    },
    method: meta.ctx.method,
    "@duration": meta.ctx.starttime ? Date.now() - meta.ctx.starttime : 0,
    "@clientip": meta.ctx.headers["x-forwarded-for"]
      ? meta.ctx.headers["x-forwarded-for"].split(",")[0]
      : meta.ctx.ip,
    url: meta.ctx.url,
    "content-type": meta.ctx.headers["content-type"],
    error: meta.ctx.error || undefined
  });

  const filter = ({
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
  });
  const formatter = meta =>
    JSON.stringify(
      filter({
        ...common(),
        ...meta
      })
    );

  const requestFormatter = meta =>
    JSON.stringify({ ...common(), ...requestExtra(meta) });

  const logName = `common.json.log`;

  config.logger = {
    formatter,
    contextFormatter: formatter,
    appLogName: logName,
    coreLogName: logName,
    agentLogName: logName,
    errorLogName: logName,
    outputJSON: false
  };

  config.customLogger = {
    requestLogger: {
      file: path.join(logDir, "request.json.log"),
      contextFormatter: requestFormatter,
      excludeUrls: ["/", "/health"]
    },
    scheduleLogger: {
      file: logName
    }
  };

  return config;
};
