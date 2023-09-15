const sass = require("sass");
const path = require("path");
const pkgtwbs = require("../tmp/bootstrap/package.json");
const { writefile } = require("sbg-utility");
const version = pkgtwbs.version.replace(/\./gm, "-");
const filename = "bootstrap-" + version + "-utility.css";
const result = sass.compile(
	path.join(__dirname, "bootstrap-utility-only.scss"),
	{
		style: "expanded",
		loadPaths: [path.join(__dirname, "../node_modules"), "./node_modules"],
	}
);
const saveto = path.join(__dirname, "../css", filename);
writefile(saveto, result.css);
