'use strict';

const fs = require('fs');
const path = require('path');
const { app } = require('egg-mock/bootstrap');
const assert = require('power-assert');

describe('test/app.test.js', () => {
  it('should log to aggreate.json.log', async () => {
    const ctx = app.mockContext({ url: '/whatever' });
    ctx.logger.info('this is a info');
    ctx.logger.error('this is test error');

    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    const logDir = path.join(__dirname, '../logs/egg-logaggregate');
    const logContent = fs.readFileSync(
      path.join(logDir, 'aggregate.json.log'), 'utf-8');
    const errorContent = fs.readFileSync(
      path.join(logDir, 'aggregate-error.json.log'), 'utf-8');
    assert(logContent.match(/@appname/).length > 0);
    assert(logContent.match(/this is a info/).length > 0);
    assert(logContent.match(/this is test error/) === null);
    assert(errorContent.match(/this is test error/).length > 0);
  });
});
