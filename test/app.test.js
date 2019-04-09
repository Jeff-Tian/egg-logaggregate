"use strict";

const fs = require("fs");
const path = require("path");
const { app } = require("egg-mock/bootstrap");
const assert = require("power-assert");

describe("default test/app.test.js", () => {
  it("should change default log fields", async () => {
    const ctx = app.mockContext({ url: "/whatever" });
    ctx.logger.info("this is a info");
    ctx.logger.error("this is test error");

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    app.expectLog(/this is a info/);
    app.expectLog(/this is test error/);
  });
});

describe("test/app.test.js", () => {
  it("should log to with @ fields", async () => {
    const ctx = app.mockContext({ url: "/whatever", starttime: Date.now() });
    ctx.logger.info("this is a info");
    ctx.logger.error("this is test error");

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    const logDir = path.join(__dirname, "../logs/egg-logaggregate");
    const logContent = fs.readFileSync(
      path.join(logDir, "common.json.log"),
      "utf-8"
    );

    assert(logContent.match(/@region/).length > 0);
    assert(!logContent.match(/@clientip/));
    assert(!logContent.match(/@duration/));
    assert(!logContent.match(/args/));
    assert(logContent.match(/@servername/).length > 0);
    assert(!logContent.match(/url/));
    assert(logContent.match(/this is a info/).length > 0);
    assert(logContent.match(/this is test error/).length > 0);
  });
});
