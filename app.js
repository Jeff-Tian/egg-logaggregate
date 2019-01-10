'use strict';

const FileTransport = require('egg-logger').FileTransport;
const fs = require('fs');

function aliSlsLogTo(app, file) {
  return function aliSlsLog(level, args, meta) {
    fs.appendFile(file, JSON.stringify({
      '@appname': app.name,
      '@env': app.config.env || process.env.NODE_ENV,
      '@servername': (meta || {}).hostname,
      '@timestamp': new Date(Date.now()),
      level,
      args,
      meta,
    }) + '\n', () => {
    });
  };
}

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
    app.getLogger('logger').set('aggregate', new AggregateTransport(
      { level: 'INFO', file: app.config.logaggregate.path }));

    app.getLogger('errorLogger')
      .set('aggregateError', new AggregateErrorTransport(
        { level: 'ERROR', file: app.config.logaggregate.errorPath }));
  });
};
