# Utils
![V0.6.1](https://img.shields.io/badge/version-0.6.1-blue.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/github/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![1DEP](https://img.shields.io/badge/Dependencies-1-yellow.svg)

Slim.IO Utils. This package/project is dedicated to the SlimIO Stack (he features are added to this package to allow a better maintainability within several subprojects).

## Requirements
- Node.js v10 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/utils
# or
$ yarn add @slimio/utils
```

## API

### taggedString(chaines: string, ...keys: any[]): Clojure;
This method is inspired from Tagged Literal (look at the [MDN Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits))

### createDirectory(path: string): void;
Create a directory at the given path. This method trigger `fs.mkdir` but catch the **ENOENT** error if the directory exist.

### assertEntity(entity: object): void;
Valid an entity object properties
```js
const entity = {
    name: "myEntity",
    description: "desc",
    parent: 10,
    descriptors: {}
};
assertEntity(entity);
```

### assertMIC(mic: object): void;
Valid a Metric Identity Card object properties

```js
const MIC = {
    name: "myMIC",
    entityId: 1,
    unit: "unit",
    interval: 10,
    max: 100,
    description: "desc"
};
assertMIC(MIC);
```

### assertAlarm(alarm: object): void;
Valid an alarm object properties

```js
const alarm = {
    message: "message",
    severity: 1,
    entityId: 2,
    correlateKey: "test_corrKey"
};
assertAlarm(alarm);
```

### assertCorrelateID(CID: string): void;
Valid a correlateID

```js
assertCorrelateID("1#test_corrkey");
```

## License
MIT
