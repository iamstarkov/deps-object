import test from 'ava';
import saveToDeps from './index';

test('should saveToDeps', (t) =>
  t.same(saveToDeps('unicorns'), 'unicorns'));

test('should saveToDeps empty input', (t) =>
  t.throws(saveToDeps(), /Input should not be empty/));

test('should saveToDeps invalid depsObject', (t) =>
  t.throws(saveToDeps('', []), /depsObject should be Object/));

test('should saveToDeps invalid depsList', (t) =>
  t.throws(saveToDeps({}, ''), /depsList should be Array/));

test('should saveToDeps invalid depsList[String]', (t) =>
  t.throws(saveToDeps({}, [1, 2]), /depsList should be Array\[String\]/));
