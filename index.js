import R from 'ramda';
import sorted from 'sorted-object';

// name :: String -> String
const name = R.pipe(R.split('@'), R.head);

// version :: String -> String
const version = R.pipe(R.split('@'), R.last);

const depsArrayToObjectReducer = (state, dep) =>
  R.merge(state, R.zipObj([name(dep)], [version(dep)]));

// saveToDeps :: Object -> Array[String] -> Object
const saveToDeps = (depsObject, depsList) => {
  if (R.and(R.isNil(depsObject), R.isNil(depsList))) {
    return Promise.reject('Input should not be empty');
  }
  if (R.not(R.is(Object, depsObject))) {
    return Promise.reject('depsObject should be Object');
  }
  if (R.not(R.is(Array, depsList))) {
    return Promise.reject('depsList should be Array');
  }
  if (R.not(R.all(R.is(String), depsList))) {
    return Promise.reject('depsList should be Array[String]');
  }

  const res = R.reduce(depsArrayToObjectReducer, {}, depsList);
  return Promise.resolve(sorted(res));
  // return new Promise().resolve(sorted({ meow: '^1.0.0'}));
};

export default saveToDeps;
