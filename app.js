"use strict";

const FileTransport = require("egg-logger").FileTransport;
const aliSlsLogTo = require("./aliSlsLogTo");

module.exports = app => {
  class AggregateTransport extends FileTransport {
    log(level, args, meta) {
      aliSlsLogTo(app, this.options.file)(level, args, meta);
    }
  }

  app.beforeStart(async () => {
    app.getLogger("logger").set(
      "aggregate",
      new AggregateTransport({
        level: "INFO",
        file: app.config.logaggregate.commonLogPath
      })
    );
  });

  if (app.config.coreMiddleware.indexOf("requestLog") < 0) {
    app.config.coreMiddleware.push("requestLog");
  }
};
