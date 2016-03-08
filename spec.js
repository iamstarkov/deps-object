var sortedObject = require('sorted-object');

// ZEN
var testDevDeps = ['assert@^1.3.0', 'mocha@^2.4.5'];

// depName :: String -> String
var depName = R.pipe(R.split('@'), R.head);

// depVersion :: String -> String
var depVersion = R.pipe(R.split('@'), R.last);

var pkg = this.fs.readJSON(this.destinationPath('package.json'), {});
var devDeps = testDevDeps.reduce(function (state, dep) {
  return R.merge(state, R.zipObj([depName(dep)], [depVersion(dep)]));
}, {});
pkg.devDependencies = sortedObject(R.merge((pkg.devDependencies || {}), devDeps));
this.fs.writeJSON(this.destinationPath('package.json'), pkg);


// ESLINT-INIT
var deps = concatAll([
  ['eslint', 'babel-eslint'],
  (maybeStr2arr(result.extends) || []).map(getPkgName).map(R.concat('eslint-config-')),
  (maybeStr2arr(result.plugins) || []).map(R.concat('eslint-plugin-')),
]);
return Promise.all(deps.map(latest))
  .then(function (versions) {
    this.fs.write(
      this.destinationPath('.eslintrc.json'),
      (stringify(truncateExtends(result)) + '\n')
    );
    var devDeps = R.zipObj(deps, versions.map(R.concat('^')));
    pkg.devDependencies = sortedObject(R.merge((pkg.devDependencies || {}), devDeps));
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }.bind(this))
  .catch(function (reason) {
    throw reason;
  }.bind(this));

// BABEL
var deps = concat(
  ['babel-cli', 'babel-register'],
  (result.presets || []).map(prefixPresets),
  (result.plugins || []).map(prefixPlugins)
);
return Promise.all(deps.map(latest))
  .then(function(versions) {
    var devDeps = R.zipObj(deps, versions.map(R.concat('^')));
    pkg.devDependencies = sortedObject(R.merge((pkg.devDependencies || {}), devDeps));
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }.bind(this))
  .catch(function(err) {
    throw err;
  });
