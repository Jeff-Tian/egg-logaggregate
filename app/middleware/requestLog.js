"use strict";

module.exports = () => {
  return async (ctx, next) => {
    await next();

    if (
      (ctx.config.customLogger.requestLogger.excludeUrls || []).indexOf(
        ctx.url
      ) < 0
    ) {
      ctx.getLogger("requestLogger").info();
    }
  };
};
