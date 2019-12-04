"use strict";

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next();

      if (
        (ctx.app.config.customLogger.requestLogger.excludeUrls || []).indexOf(
          ctx.url
        ) < 0
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
