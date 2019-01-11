'use strict';
// TODO: Delete this file in next version
const FileTransport = require('egg-logger').FileTransport;
const aliSlsLogTo = require('./aliSlsLogTo');

module.exports = app => {
  class AggregateTransport extends FileTransport {
    log(level, args, meta) {
      if (level !== 'ERROR') {
        aliSlsLogTo(app, this.options.file)(level, args, meta);
      }
    }
  }

  class AggregateErrorTransport extends FileTransport {
    log(level, args, meta) {
      aliSlsLogTo(app, this.options.file)(level, args, meta);
    }
  }

  app.beforeStart(async () => {
    app.getLogger('aliSlsLogger').set('aggregate', new AggregateTransport(
      { level: 'INFO', file: app.config.logaggregate.path }));

    app.getLogger('errorLogger')
      .set('aggregateError', new AggregateErrorTransport(
        { level: 'ERROR', file: app.config.logaggregate.errorPath }));
  });
};
