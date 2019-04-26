"use strict";

module.exports = () => {
  return async (ctx, next) => {
    await next();

    if (ctx.url !== "/") {
      ctx.getLogger("requestLogger").info();
    }
  };
};
