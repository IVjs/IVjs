const fs = require('fs');
const join = require('path').join;

const pkg = join(__dirname, '..', 'package.json')

function getPackageJson () {
  return JSON.parse(fs.readFileSync(pkg, 'utf8'));
}

module.exports = getPackageJson;
