# egg-logaggregate

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
