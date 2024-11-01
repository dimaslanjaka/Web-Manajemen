// git clone https://github.com/twbs/bootstrap.git tmp/bootstrap
// cd tmp/bootstrap

// latest version
// git fetch --all --tags --prune
// git pull origin main --prune

// change version
// git checkout tags/<tag> -b <branch>

// build
// npm install
// npm run css
// with js
// npm run dist

const sass = require("sass");
const path = require("path");

const pkgtwbs = require("../tmp/bootstrap/package.json");
const { writefile } = require("sbg-utility");
const version = pkgtwbs.version.replace(/\./gm, "-");
const filename = "bootstrap-" + version + "-wrapper.css";
const result = sass.compile(
	path.join(__dirname, "bootstrap-wrapper-builder.scss")
);
const saveto = path.join(__dirname, "../css", filename);
writefile(saveto, result.css);
