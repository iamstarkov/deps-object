import test from 'ava';
import assert from 'assert';
import R from 'ramda';
import saveToDeps from './index';
import latest from 'latest-version';

const deepEqual = R.curryN(2, assert.deepEqual);

test('valid but empty input', () =>
  saveToDeps([])
    .then(deepEqual({})));

test('basic', () =>
  saveToDeps(['a@1.0.0'])
    .then(deepEqual({ a: '1.0.0' })));

test('sorted', () =>
  saveToDeps(['b@1.0.0', 'a@1.0.0'])
    .then(deepEqual({ a: '1.0.0', b: '1.0.0' })));

test('latest version', () =>
  latest('ava').then(version =>
    saveToDeps(['ava'])
      .then(deepEqual({ ava: `^${version}` }))));

test('mixed', () =>
  latest('mocha').then(version =>
    saveToDeps(['a@1.0.0', 'mocha'])
      .then(deepEqual({ a: '1.0.0', mocha: `^${version}` }))));

const errorMessage = /deps should be an Array\[String\]/;
test('empty input', (t) =>
  t.throws(saveToDeps(), errorMessage));

test('invalid deps', (t) =>
  t.throws(saveToDeps(''), errorMessage));

test('invalid deps[String]', (t) =>
  t.throws(saveToDeps([1, 2]), errorMessage));
