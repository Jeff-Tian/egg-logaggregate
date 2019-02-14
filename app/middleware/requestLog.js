"use strict";

module.exports = () => {
  return async (ctx, next) => {
    await next();

    ctx.getLogger("requestLogger").info("request", {
      response: ctx.body,
      status: ctx.status
    });
  };
};
