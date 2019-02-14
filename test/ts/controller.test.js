"use strict";

const assert = require("assert");
const request = require("supertest");
const mm = require("egg-mock");
const runscript = require("runscript");
const utils = require("../utils");
const path = require("path");
const baseDir = path.join(__dirname, "../fixtures/apps/app-ts");
const fs = require("fs");
const mkdirp = require("mz-modules/mkdirp");
const rimraf = require("mz-modules/rimraf");

describe("mock controller test", () => {
  before(async () => {
    await runscript(`tsc -p ${baseDir}/tsconfig.json`, { cwd: baseDir });
    const dest = path.join(baseDir, "node_modules/egg");
    await rimraf(dest);
    await mkdirp(path.dirname(dest));
    fs.symlinkSync("../../../../../", dest);
  });

  afterEach(mm.restore);

  let app;

  beforeEach(async () => {
    app = utils.app("apps/app-ts");
    await app.ready();
  });

  after(async () => {
    await app.close();
    assert.deepStrictEqual(app._app.stages, [
      "configWillLoad",
      "configDidLoad",
      "didLoad",
      "willReady",
      "didReady",
      "serverDidReady",
      "beforeClose"
    ]);
  });

  it("should log controller name", async () => {
    request(app.callback())
      .get("/foo")
      .expect(200)
      .expect("bar", err => {
        assert(!err);
      });

    await new Promise(resolve => setTimeout(resolve, 1000));

    app.expectLog(/bar info/);
    app.expectLog(/bar error/);

    const logDir = app.config.customLogger.requestLogger.file;
    const logContent = fs.readFileSync(logDir, "utf-8");
    assert(logContent.match(/@region/).length > 0);
    assert(logContent.match(/@clientip/).length > 0);
    assert(logContent.match(/@duration/).length > 0);
    assert(logContent.match(/response/).length > 0);
    assert(logContent.match(/status/).length > 0);
  });
});
