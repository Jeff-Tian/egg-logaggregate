const Transport = require("egg-logger").Transport;
const fs = require("fs");

module.exports = app => {
    app.beforeStart(async () => {
        app.getLogger("logger")
            .set("aggregate", new AggregateTransport({level: "INFO"}));

        console.log("hello log aggregator");
    });


    class AggregateTransport extends Transport {
        log(level, args, meta) {
            fs.appendFileSync(app.config.logaggregate.path, JSON.stringify({
                "@appname": app.config.logaggregate.appName,
                "@env": app.config.env || process.env.NODE_ENV,
                "@servername": (meta || {}).hostname,
                "@timestamp": new Date(Date.now()),
                level,
                args,
                meta
            }) + "\n");
        }
    }
};
