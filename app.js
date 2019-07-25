"use strict";

module.exports = app => {
  app.beforeStart(async () => {
    // console.log("app config = ", app.config);
    // app.getLogger("logger").set(
    //   "aggregate",
    //   new AggregateTransport({
    //     level: "INFO",
    //     file: app.config.logaggregate.commonLogPath,
    //     formatter: meta => JSON.stringify({ xxx: "yyy", ...meta })
    //   })
    // );
  });

  if (app.config.coreMiddleware.indexOf("requestLog") < 0) {
    app.config.coreMiddleware.push("requestLog");
  }
};
