'use strict';

module.exports = appInfo => {
  console.log(appInfo);

  const config = {};

  config.logger = {
    ...config.logger,
    outputJSON: true,
  };

  config.customLogger = {
    aliLogger: {
      file: 'egg-web.json.log',
      contextFormatter(meta) {
        return JSON.stringify({ ...meta, '@env': 'test', '@appname': appInfo.name, '@timestamp': new Date() });
      },
    },
  };

  return config;
};
