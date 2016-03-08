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
  const res = R.reduce(depsArrayToObjectReducer, {}, depsList);
  return Promise.resolve(sorted(res));
};

export default saveToDeps;
