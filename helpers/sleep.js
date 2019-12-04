"use strict";

const R = require("ramda");

const curriedSetTimeout = time => func => setTimeout(func, time);
const promisify = func => new Promise(func);
const sleep = R.compose(
  promisify,
  curriedSetTimeout,
  R.multiply(1000)
);

module.exports = sleep;
