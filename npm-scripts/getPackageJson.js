const getJsonFile = require('./getJsonFile');
const join = require('path').join;

const pkg = join(__dirname, '..', 'package.json')

function getPackageJson () {
  return getJsonFile(pkg, 'utf8');
}

module.exports = getPackageJson;
