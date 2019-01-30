"use strict";
const fs = require("fs");

// TODO: Delete this file in next version
module.exports = function aliSlsLogTo(app, file) {
  return function aliSlsLog(level, args, meta) {
    fs.appendFile(
      file,
      JSON.stringify({
        "@appname": app.name,
        "@env": app.config.env || process.env.NODE_ENV,
        "@servername": (meta || {}).hostname,
        "@timestamp": new Date(Date.now()),
        level,
        args,
        meta
      }) + "\n",
      () => {}
    );
  };
};
