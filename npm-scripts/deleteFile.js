const fs = require('fs')

function deleteFile(path) { return new Promise((res, rej) => {
  if (!fs.existsSync(path)) return res();
  fs.unlink(path, (err) => {
    if (err) {
      return rej(err)
    }
    return res();
  })
})}

module.exports = deleteFile
