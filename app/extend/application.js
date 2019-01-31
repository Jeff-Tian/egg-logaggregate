"use strict";

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
    return `[${meta["@env"]}] [${meta["@region"]}] [${meta["@servername"]}] [${
      meta["@timestamp"]
    }] [${date}] [${pid}] [${level}] [${url}] ${message}`;
  }
}

["error", "warn", "info", "debug"].forEach(level => {
  const LEVEL = level.toUpperCase();
  ContextLogger.prototype[level] = function() {
    const meta = {
      formatter: this._logger.options.contextFormatter || this.contextFormatter,
      "@env": this.ctx.app.env,
      "@servername": this.ctx.hostname || this.ctx.host,
      "@timestamp": new Date(),
      "@region": process.env.REGION || null,
      "@clientip": this.ctx.request.ip,
      "@serverip": "todo",
      "@duration": this.ctx.starttime ? Date.now() - this.ctx.starttime : 0,
      event: "todo",
      controller: this.ctx.controller,
      method: "todo",
      url: this.ctx.url,
      request: {
        query: this.ctx.query,
        params: this.ctx.params,
        body: this.ctx.body
      },
      response: this.ctx.body,
      status: this.ctx.status
    };
    this._logger.log(LEVEL, arguments, meta);
  };
});

module.exports = {
  // override built-in context logger
  // see https://github.com/eggjs/egg-logger/blob/master/lib/egg/context_logger.js
  // and https://github.com/eggjs/egg/blob/master/app/extend/context.js#L100
  ContextLogger
};
