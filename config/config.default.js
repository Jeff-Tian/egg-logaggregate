'use strict';

module.exports = appInfo => {
    const config = {};

    config.logaggregate = {
        path: "logs/uni-academy-bff/uni-academy-bff-aggregate.json.log",
        errorPath: "logs/uni-academy-bff/uni-academy-bff-aggregate-error.json.log",
        appName: appInfo.name
    };
}
