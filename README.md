# Utils
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Utils/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/github/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![1DEP](https://img.shields.io/badge/Dependencies-1-yellow.svg)
[![Build Status](https://travis-ci.com/SlimIO/Utils.svg?branch=master)](https://travis-ci.com/SlimIO/Utils) [![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/Utils.svg)](https://greenkeeper.io/)

SlimIO Utils. This package has been created for internal usage (Features are added to the package to avoid spreading of similar functionalities across multiple projects).

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

<details><summary>taggedString(chaines: string, ...keys: any[]): Clojure</summary>
<br />

This method is inspired from Tagged Literal (look at the [MDN Documentation](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Litt%C3%A9raux_gabarits))

Useful to build string templates:
```js
const { strictEqual } = require("assert");
const tpl = taggedString`hello ${0}`;

strictEqual(tpl("fraxken"), "hello fraxken");
```

Template properties can be either **index** or **key**:
```js
const { strictEqual } = require("assert");
const tpl = taggedString`hello ${"name"}`;

strictEqual(tpl({ name: "fraxken" }), "hello fraxken");
```
</details>

<details><summary>createDirectory(path: string): void</summary>
<br />

Create a directory at the given path. This method trigger `fs.mkdir` but catch the **ENOENT** error if the directory exist.
</details>

<details><summary>assertEntity(entity: SlimIO.RawEntity): void</summary>
<br />

Assert an Entity Object.
```js
assertEntity({
    name: "myEntity",
    description: "desc",
    parent: 10,
    descriptors: {}
});
```
</details>

<details><summary>assertMIC(mic: SlimIO.RawIdentityCard): void</summary>
<br />

Assert an MicIdentityCard Object.
```js
assertMIC({
    name: "myMIC",
    entityId: 1,
    unit: "unit",
    interval: 10,
    max: 100,
    description: "desc"
});
```
</details>

<details><summary>assertAlarm(alarm: SlimIO.RawAlarm): void</summary>
<br />

Assert an Alarm Object.
```js
assertAlarm({
    message: "message",
    severity: 1,
    entityId: 2,
    correlateKey: "test_corrKey"
});
```
</details>

<details><summary>assertCorrelateID(CID: SlimIO.CID): void</summary>
<br />

Assert a correlate id (Alarm correlate id).
```js
assertCorrelateID("1#test_corrkey");
```
</details>

<details><summary>assertCK(correlateKey: string): void</summary>
<br />

Assert a correlate key (Alarm correlate key).
```js
assertCK("test_corrkey");
```
</details>

<details><summary>privateProperty(target: object, propertyKey: string|symbol|number, value?: any): void</summary>
<br />

Define a private (**non-enumable**, **non-configurable**) property on the target.

```js
const assert = require("assert");

const obj = {};
privateProperty(obj, "foo", "bar");
assert.deepEqual(Object.keys(obj), []);

obj.foo = "world!";
assert.strictEqual(obj.foo, "world!");
assert.throws(() => {
    delete obj.foo;
}, { name: 'TypeError' });
```
</details>

## License
MIT
