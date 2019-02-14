"use strict";

const path = require("path");
const mm = require("egg-mock");
const eggPath = path.join(__dirname, "..");

exports.app = (name, options) => {
  options = formatOptions(name, options);

  return mm.app(options);
};

function formatOptions(name, options) {
  let baseDir;
  if (typeof name === "string") {
    baseDir = name;
  } else {
    // name is options
    options = name;
  }
  return Object.assign(
    {},
    {
      baseDir,
      customEgg: eggPath,
      cache: false
    },
    options
  );
}
