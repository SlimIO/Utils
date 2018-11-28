# Utils
Slim.IO Utils. This package/project is dedicated to the SlimIO Stack (he features are added to this package to allow a better maintainability within several subprojects).

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm).

```bash
$ npm install @slimio/utils
```

## Exported Functions

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

## Project commands

To generate the documentation run the following command:

```bash
npm run doc
```

To run tests and get coverage

```bash
npm run coverage
npm run report
```
