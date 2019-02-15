# egg-logaggregate

> Aggregate egg logs into 2 categories: common logs and request logs.

[![NPM version][npm-image]][npm-url]
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/Jeff-Tian/egg-logaggregate)
[![Maintainability](https://api.codeclimate.com/v1/badges/1a14b40b7d69e5d08897/maintainability)](https://codeclimate.com/github/Jeff-Tian/egg-logaggregate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/1a14b40b7d69e5d08897/test_coverage)](https://codeclimate.com/github/Jeff-Tian/egg-logaggregate/test_coverage)
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![David deps][david-image]][david-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-logaggregate.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-logaggregate
[david-image]: https://img.shields.io/david/jeff-tian/egg-logaggregate.svg?style=flat-square
[snyk-image]: https://snyk.io/test/npm/egg-logaggregate/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-logaggregate
[david-url]: https://david-dm.org/jeff-tian/egg-logaggregate
[download-image]: https://img.shields.io/npm/dm/egg-logaggregate.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-logaggregate

## Why?

Aggregate egg logs into 2 categories:

- common logs: common.json.log
- request logs: request.json.log

## How?

It adds extra log transports which also append extra fields to the log file in json format:

- @env
- @timestamp
- @servername
- @region
- ...

## Installation

```shell
npm install egg-logaggregate --save
```

## Enable in your project:

In egg project's config/plugin.ts

```typescript
export default const plugin: EggPlugin = {
    //...
    logaggregate: {
        enable: true,
        package: 'egg-logaggregate'
    }
    //...
}
```

## Configuration/Customization:

This plugin is zero configuration, in other words, as soon as you installed and enabled it, then it works.
