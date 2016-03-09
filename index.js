import R from 'ramda';
import sorted from 'sorted-object';
import latest from 'latest-version';

// depObject :: String -> Object
const depObject = R.pipe(R.split('@'), R.apply(R.objOf));

// completeDep :: String -> Promise Object
const completeDep = R.ifElse(
  R.contains('@'),
  depObject,
  item => latest(item).then(R.pipe(R.concat('^'), R.objOf(item))));

// reject :: String -> Promise.reject(String)
const reject = reason => Promise.reject(reason);

// saveToDeps :: Array[String] -> Object
const saveToDeps = deps => {
  if (R.not(R.is(Array, deps))) {
    return reject('deps should be an Array[String]');
  }
  if (R.not(R.all(R.is(String), deps))) {
    return reject('deps should be an Array[String]');
  }

  return Promise.all(deps.map(completeDep)).then(R.pipe(
    R.mergeAll,
    sorted
  ));
};

export default saveToDeps;
