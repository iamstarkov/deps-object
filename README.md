# save-to-deps

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Coveralls Status][coveralls-image]][coveralls-url]
[![Dependency Status][depstat-image]][depstat-url]

> My pioneering module

## Install

    npm install --save save-to-deps

## Usage

```js
import saveToDeps from 'save-to-deps';

saveToDeps(['ava', 'nyc@^6.0.0', 'rimraf@2.5.2'])
  .then(item => console.log(item));
  /* {
    ava: '^0.12.0',
    nyc: '^6.0.0',
    rimraf: '2.5.2'
  } */
```

## API

### saveToDeps(deps)

    // saveToDeps :: Array[String] -> Promise Object`

Return a promise that resolves to dependencies object.

#### deps

*Required*  
Type: `Array[String]`

Dependencies list. Specify dependency with `@`, otherwise result version will be latest one with `^` prefix.


## License

MIT © [Vladimir Starkov](https://iamstarkov.com)

[npm-url]: https://npmjs.org/package/save-to-deps
[npm-image]: https://img.shields.io/npm/v/save-to-deps.svg?style=flat-square

[travis-url]: https://travis-ci.org/iamstarkov/save-to-deps
[travis-image]: https://img.shields.io/travis/iamstarkov/save-to-deps.svg?style=flat-square

[coveralls-url]: https://coveralls.io/r/iamstarkov/save-to-deps
[coveralls-image]: https://img.shields.io/coveralls/iamstarkov/save-to-deps.svg?style=flat-square

[depstat-url]: https://david-dm.org/iamstarkov/save-to-deps
[depstat-image]: https://david-dm.org/iamstarkov/save-to-deps.svg?style=flat-square
