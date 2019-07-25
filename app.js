"use strict";

module.exports = app => {
  const eggLogAggregateConfig = require("./config/config.default")(app);

  app.config.logger = {
    ...app.config.logger,
    ...eggLogAggregateConfig.logger
  };

  if (app.config.coreMiddleware.indexOf("requestLog") < 0) {
    app.config.coreMiddleware.push("requestLog");
  }
};
