'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app.test.js', () => {
  it('should log to aggreate.json.log', () => {
    const ctx = app.mockContext({ url: '/whatever' });
    ctx.logger.info('this is a info');
    ctx.logger.error('this is test error');

    app.expectLog(/this is a info/);
  });
});
