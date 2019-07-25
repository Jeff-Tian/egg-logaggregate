"use strict";

const fs = require("fs");
const path = require("path");
const { app } = require("egg-mock/bootstrap");
const assert = require("power-assert");

describe("default test/app-logger.test.js", () => {
  it("should change default log fields", async () => {
    app.logger.info("this is an app info");
    app.logger.error("this is test app error");

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    app.expectLog(/this is an app info/);
    app.expectLog(/this is test app error/);
  });
});

describe("test/app-logger.test.js", () => {
  it("should log to with @ fields", async () => {
    app.logger.info("this is an app info");
    app.logger.error("this is test app error");

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
    assert(logContent.match(/this is an app info/).length > 0);
    assert(logContent.match(/this is test app error/).length > 0);
  });
});
