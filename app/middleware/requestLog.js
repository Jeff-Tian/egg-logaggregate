"use strict";

const R = require("ramda");

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();

      if (
        !R.includes(
          ctx.url,
          ctx.app.config.customLogger.requestLogger.excludeUrls || []
        )
      ) {
        ctx.getLogger("requestLogger").info();
      }
    } catch (ex) {
      if (ex.status) {
        ctx.status = ex.status;
      }

      ctx.error = ex;

      ctx.getLogger("requestLogger").error(ex);
      throw ex;
    }
  };
};
