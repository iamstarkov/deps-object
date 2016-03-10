import R from 'ramda';
import sorted from 'sorted-object';
import latest from 'latest-version';
import Promise from 'pinkie-promise';

const reject = Promise.reject.bind(Promise);
const resolve = Promise.resolve.bind(Promise);
const all = Promise.all.bind(Promise);

// depObject :: String -> Object
const depObject = R.pipe(
  R.split('@'),
  R.splitAt(-1),
  R.map(R.join('@')),
  R.apply(R.objOf)
);

// depLatestObject :: String -> Object
const depLatestObject = item => R.pipeP(
  latest,
  R.concat('^'),
  R.objOf(item)
)(item);

// completeDependency :: String -> Promise Object
const completeDependency = R.ifElse(R.contains('@'), depObject, depLatestObject);

// isArrayOfStrings :: Input -> Boolean
const isArrayOfStrings = R.both(R.is(Array), R.all(R.is(String)));

// depsObject :: Array[String] -> Object -> Object
const depsObject = (deps, initDeps = {}) => R.pipeP(resolve,
  R.unless(isArrayOfStrings, () => reject('deps should be an Array[String]')),
  R.unless(() => R.is(Object, initDeps), () => reject('initDeps should be an Object')),
  R.map(completeDependency),
  all,
  R.prepend(initDeps),
  R.mergeAll,
  sorted
)(deps);

export default depsObject;
