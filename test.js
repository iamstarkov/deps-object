import test from 'ava';
import saveToDeps from './index';

test('basic', (t) =>
  t.same(saveToDeps({}, ['meow@^1.0.0']), { meow: '^1.0.0' }));

test('sorted', (t) =>
  t.same(saveToDeps({}, ['b@1.0.0', 'a@1.0.0']), { a: '1.0.0', b: '1.0.0' }));

test('empty input', (t) =>
  t.throws(saveToDeps(), /Input should not be empty/));

test('invalid depsObject', (t) =>
  t.throws(saveToDeps('', []), /depsObject should be Object/));

test('invalid depsList', (t) =>
  t.throws(saveToDeps({}, ''), /depsList should be Array/));

test('invalid depsList[String]', (t) =>
  t.throws(saveToDeps({}, [1, 2]), /depsList should be Array\[String\]/));
