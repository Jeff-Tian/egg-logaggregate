const Transport = require('egg-logger').Transport;
const fs = require('fs');

module.exports = app => {
    class AggregateTransport extends Transport {
        log(level, args, meta) {
            fs.appendFileSync(app.config.logaggregate.path, JSON.stringify({
                '@appname': app.config.logaggregate.appName,
                '@env': app.config.env || process.env.NODE_ENV,
                '@servername': (meta || {}).hostname,
                '@timestamp': new Date(Date.now()),
                level,
                args,
                meta,
            }) + '\n');
        }
    }

    class AggregateErrorTransport extends Transport {
        log(level, args, meta) {
            fs.appendFileSync(app.config.logaggregate.errorPath, JSON.stringify({
                '@appname': app.config.logaggregate.appName,
                '@env': app.config.env || process.env.NODE_ENV,
                '@servername': (meta || {}).hostname,
                '@timestamp': new Date(Date.now()),
                level,
                args,
                meta,
            }) + '\n');
        }
    }

    app.beforeStart(async () => {
        app.getLogger('logger')
            .set('aggregate', new AggregateTransport({level: 'INFO'}));

        app.getLogger('errorLogger')
            .set('aggregateError', new AggregateErrorTransport({level: 'ERROR'}));
    });
};
