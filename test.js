import test from 'ava';
import assert from 'assert';
import R from 'ramda';
import depsObject from './index';
import latest from 'latest-version';

const deepEqual = R.curryN(2, assert.deepEqual);

test('valid but empty input', () =>
  depsObject([])
    .then(deepEqual({})));

test('basic', () =>
  depsObject(['a@1.0.0'])
    .then(deepEqual({ a: '1.0.0' })));

test('basic with scoped modules', () =>
  depsObject(['@sindresorhus/df@1.0.0'])
    .then(deepEqual({ '@sindresorhus/df': '1.0.0' })));

test('sorted', () =>
  depsObject(['b@1.0.0', 'a@1.0.0'])
    .then(deepEqual({ a: '1.0.0', b: '1.0.0' })));

test('latest version', () =>
  latest('ava').then(version =>
    depsObject(['ava'])
      .then(deepEqual({ ava: `^${version}` }))));

test('mixed', () =>
  latest('mocha').then(version =>
    depsObject(['a@1.0.0', 'mocha'])
      .then(deepEqual({ a: '1.0.0', mocha: `^${version}` }))));

const errorMessage = /deps should be an Array\[String\]/;
test('empty input', (t) =>
  t.throws(depsObject(), errorMessage));

test('invalid deps', (t) =>
  t.throws(depsObject(''), errorMessage));

test('invalid deps[String]', (t) =>
  t.throws(depsObject([1, 2]), errorMessage));

test('invalid dep', (t) =>
  t.throws(depsObject(['nnnope']), /`nnnope` doesn't exist/));
