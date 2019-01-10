'use strict';

const path = require('path');

module.exports = appInfo => {
  const config = {};

  const logDir = path.join(appInfo.root, 'logs', appInfo.name);

  config.logaggregate = {
    path: `${path.join(logDir, 'aggregate.json.log')}`,
    errorPath: `${path.join(logDir, 'aggregate-error.json.log')}`,
  };

  return config;
};
