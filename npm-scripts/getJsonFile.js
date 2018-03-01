const fs = require('fs');

function getJsonFile(pkg) {
  return JSON.parse(fs.readFileSync(pkg, 'utf8'));
}

module.exports = getJsonFile;
