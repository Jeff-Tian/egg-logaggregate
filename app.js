'use strict';

const FileTransport = require('egg-logger').FileTransport;
const fs = require('fs');

module.exports = app => {
  class AggregateTransport extends FileTransport {
    log(level, args, meta) {
      if (level !== 'ERROR') {
        fs.appendFile(this.options.file, JSON.stringify({
          '@appname': app.name,
          '@env': app.config.env || process.env.NODE_ENV,
          '@servername': (meta || {}).hostname,
          '@timestamp': new Date(Date.now()),
          level,
          args,
          meta,
        }) + '\n', () => {
        });
      }
    }
  }

  class AggregateErrorTransport extends FileTransport {
    log(level, args, meta) {
      fs.appendFile(this.options.file, JSON.stringify({
        '@appname': app.name,
        '@env': app.config.env || process.env.NODE_ENV,
        '@servername': (meta || {}).hostname,
        '@timestamp': new Date(Date.now()),
        level,
        args,
        meta,
      }) + '\n', () => {
      });
    }
  }

  app.beforeStart(async () => {
    app.getLogger('logger').set('aggregate', new AggregateTransport(
      { level: 'INFO', file: app.config.logaggregate.path }));

    app.getLogger('errorLogger')
      .set('aggregateError', new AggregateErrorTransport(
        { level: 'ERROR', file: app.config.logaggregate.errorPath }));
  });
};
