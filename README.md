# deps-object

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> Transform dependencies Array into an Object

## Install

    npm install --save deps-object

## Usage

```js
import depsObject from 'deps-object';

depsObject(['ava', 'nyc@^6.0.0', 'rimraf@2.5.2', '@sindresorhus/df'])
  .then(item => console.log(item));
  /* {
    "@sindresorhus/df": "^1.0.1",
    "ava": "^0.12.0",
    "nyc": "^6.0.0",
    "rimraf":"'2.5.2".
  } */
```

## API

### depsObject(deps)

    // depsObject :: Array[String] -> Promise Object`

Return a promise that resolves to dependencies object.

#### deps

*Required*  
Type: `Array[String]`

Dependencies list. Specify dependency with `@`, otherwise result version will be latest one with `^` prefix.

## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/deps-object
[npm-image]: https://img.shields.io/npm/v/deps-object.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/deps-object
[travis-image]: https://img.shields.io/travis/iamstarkov/deps-object.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/deps-object
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/deps-object.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/deps-object
[depstat-image]: https://david-dm.org/iamstarkov/deps-object.svg?style=flat-square
