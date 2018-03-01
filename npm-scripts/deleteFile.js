const fs = require('fs')

function deleteFile(path) { return new Promise((res, rej) => {
  fs.unlink(path, (err) => {
    if (err) rej(err)
    res();
  })
})}

module.exports = deleteFile
