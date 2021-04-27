const fs = require("fs");
const path = require("path");
var {dirname} = require("path");

function getFolders(dir) {
  return fs.readdirSync(dir).filter(function (file) {
    return fs.statSync(path.join(dir, file)).isDirectory();
  });
}

function writeFile(path, contents, cb) {
  fs.mkdirSync(dirname(path), {recursive: true});
  fs.writeFileSync(path, contents);
}

module.exports = {
  write: writeFile,
  listFolder: getFolders,
  dirname: dirname,
};
