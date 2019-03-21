"use strict";

const os = require("os");
const networkInterfaces = os.networkInterfaces();
const networks =
  networkInterfaces.eth0 ||
  networkInterfaces.eth1 ||
  networkInterfaces.en0 ||
  networkInterfaces.en1 ||
  networkInterfaces.本地连接;

const networkAddress = networks.find(n => n.family === "IPv4");

class ContextLogger {
  /**
   * @constructor
   * @param {Context} ctx - egg Context instance
   * @param {Logger} logger - Logger instance
   */
  constructor(ctx, logger) {
    this.ctx = ctx;
    this._logger = logger;
  }

  write(msg) {
    this._logger.write(msg);
  }

  contextFormatter(meta) {
    const { date, level, pid, message, url } = meta;
    return `[${meta["@env"]}] [${meta["@region"]}] [${
      meta["@servername"]
    }] [${date}] [${pid}] [${level}] [${url}] ${message}`;
  }
}

["error", "warn", "info", "debug"].forEach(level => {
  const LEVEL = level.toUpperCase();
  ContextLogger.prototype[level] = function() {
    const meta = {
      formatter: this._logger.options.contextFormatter || this.contextFormatter,
      "@env": this.ctx.app.env,
      "@servername": os.hostname,
      "@timestamp": new Date(),
      "@region": process.env.REGION || null,
      "@clientip": this.ctx.ip,
      "@serverip": networkAddress.address,
      "@duration": this.ctx.starttime ? Date.now() - this.ctx.starttime : 0,
      event: arguments[0],
      method: this.ctx.method,
      url: this.ctx.url
    };

    if (
      this._logger.options.file ===
      this.ctx.app.config.customLogger.requestLogger.file
    ) {
      meta.response = this.ctx.body;
      meta.status = this.ctx.status;
      meta.event = "request";
      meta.controller = this.ctx.routerPath;
      meta.request = {
        params: this.ctx.params,
        body: this.ctx.request.body
      };
    }

    this._logger.log(LEVEL, arguments, meta);
  };
});

module.exports = {
  // override built-in context logger
  // see https://github.com/eggjs/egg-logger/blob/master/lib/egg/context_logger.js
  // and https://github.com/eggjs/egg/blob/master/app/extend/context.js#L100
  ContextLogger
};
