"use strict";
const fs = require("fs");

module.exports = function aliSlsLogTo(app, file) {
  return function aliSlsLog(level, args, meta) {
    fs.appendFile(
      file,
      JSON.stringify({
        level,
        message: args[0],
        ...meta
      }) + "\n",
      () => {}
    );
  };
};
