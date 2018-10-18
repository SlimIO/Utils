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
