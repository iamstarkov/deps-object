import test from 'ava';
import saveToDeps from './index';

test('should saveToDeps', (t) =>
  t.same(saveToDeps('unicorns'), 'unicorns'));

test('should saveToDeps invalid input', (t) =>
  t.same(saveToDeps(), undefined));
