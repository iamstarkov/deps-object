import R from 'ramda';
import sorted from 'sorted-object';
import latest from 'latest-version';
import Promise from 'pinkie-promise';

const reject = Promise.reject.bind(Promise);
const resolve = Promise.resolve.bind(Promise);
const all = Promise.all.bind(Promise);

// depObject :: String -> Object
const depObject = R.pipe(R.split('@'), R.apply(R.objOf));

// depLatestObject :: String -> Object
const depLatestObject = item => R.pipeP(
  latest,
  R.concat('^'),
  R.objOf(item)
)(item);

// completeDep :: String -> Promise Object
const completeDep = R.ifElse(R.contains('@'), depObject, depLatestObject);

// isArrayOfStrings :: Input -> Boolean
const isArrayOfStrings = R.both(R.is(Array), R.all(R.is(String)));

// saveToDeps :: Array[String] -> Object
const saveToDeps = R.pipeP(resolve,
  R.unless(isArrayOfStrings, () => reject('deps should be an Array[String]')),
  R.map(completeDep),
  all,
  R.mergeAll,
  sorted
);

export default saveToDeps;
