# egg-logaggregate

## Why?
Aggregate all egg log into a single file, and integrate with Ali Sls console.

|Egg logs| --> |Aggregated log|
|--------|-----|--------------|
|common.error.log<br />egg-agent.log<br />egg-schedule.log<br />egg-web.log<br />${appInfo.name}-web.log| --> |aggregate.json.log|

![Ali Sls console](./ali-sls.png)

## Installation
```shell
npm install egg-logaggregate --save
```

## Usage
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
In egg project's config/config.{env}.ts:
```typescript
export default (appInfo: EggAppInfo) => {
    return {
        //...
        config.logaggregate = {
            path: 'logs/xxx.log',
            appName: appInfo.name
        }
        //...
    }
}
```
