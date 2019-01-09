'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/extend/application.test.js', () => {

  it('should change built-in context logger', () => {
    app.mockLog();

    const ctx = app.mockContext({ url: '/custom' });
    ctx.logger.warn('this is a custom context logger');
    ctx.logger.write('origin write');

    // assert
    app.expectLog(/\[\/custom\] this is a custom context logger/);
    app.expectLog('origin write');
  });

  it('should custom context logger', () => {
    app.mockLog('aliLogger');

    const ctx = app.mockContext({ url: '/custom' });
    const testLogger = ctx.getLogger('aliLogger');

    testLogger.warn('this is a custom context logger');

    // assert
    app.expectLog(/@env/, 'aliLogger');
    app.expectLog(/@appname/, 'aliLogger');
    app.expectLog(/@timestamp/, 'aliLogger');
  });
});
