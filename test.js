import test from 'ava';
import saveToDeps from './index';
import { deepEqual } from 'assert';

test('basic assert.deepEqual', () => saveToDeps({}, ['a@^1.0.0'])
  .then(res => {
    deepEqual(res, { a: '^1.0.0' });
  }));

test('sorted assert.deepEqual', () => saveToDeps({}, ['b@1.0.0', 'a@1.0.0'])
  .then(res => {
    deepEqual(res, { a: '1.0.0', b: '1.0.0' });
  }));

test('basic t.same', t => saveToDeps({}, ['meow@^1.0.0'])
  .then(res => {
    t.same(res, { meow: '^1.0.0' });
  }));

test('sorted t.same', t => saveToDeps({}, ['b@1.0.0', 'a@1.0.0'])
  .then(res => {
    t.same(res, { a: '1.0.0', b: '1.0.0' });
  }));
