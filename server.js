const path = require("upath");
const fs = require("fs-extra");
const express = require("express");
const Bluebird = require("bluebird");

Bluebird.all([
	() => {
		if (
			fs.existsSync(path.join(__dirname, "src/bootstrap-wrapper-builder.js"))
		) {
			// import bootstrap builder
			return import("src/bootstrap-wrapper-builder");
		}
	},
])
	.then(() => {
		const app = express();
		// serve static files
		const staticPaths = [
			path.join(__dirname, "css"),
			path.join(__dirname, "test"),
		];
		staticPaths
			.filter((dir) => fs.existsSync(dir))
			.map((dir) => {
				return {
					dir,
					files: fs.readdirSync(dir).map((file) => path.join(dir, file)),
				};
			})
			.flat()
			.forEach((o) => {
				/*
		o.files.forEach((file) => {
			console.log("register static", file);
			app.use(express.static(file));
		});
    */
				const pathname = o.dir.replace(path.toUnix(__dirname), "");
				console.log("register static", pathname, "->", o.dir);
				app.use(pathname, express.static(o.dir));
				app.use(express.static(o.dir));
			});
		return app;
	})
	.then((app) => {
		const server = app.listen(4000, function () {
			const host = "localhost";
			const port = server.address().port;
			console.log("listening on http://" + host + ":" + port + "/");
		});
	});
