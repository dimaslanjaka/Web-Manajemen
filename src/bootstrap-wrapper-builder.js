// clone https://github.com/twbs/bootstrap.git /tmp/bootstrap
// cd /tmp/bootstrap && npm install

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
