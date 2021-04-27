var fs = require("fs");
var getDirName = require("path").dirname;
var path = require("path");
var jsminify = require("terser").minify;
var gulp = require("gulp");
var CleanCSS = require("clean-css");
const through = require("through2");
var gulpRanInThisFolder = process.cwd();
var htmlminify = require("html-minifier").minify;
var UglifyJS = require("uglify-js");
const del = require("del");

gulp.task("default", function () {
	return gulp
		.src("src/")
		.pipe(
			through.obj(function (chunk, enc, callback) {
				//console.log("Work Directory", chunk.path); // this should log now
				getFolders(chunk.path).forEach(async function (value, index, arr) {
					var rootsrc = path.join(chunk.path, value);
					var configpath = path.join(rootsrc, "config.json");
					if (fs.existsSync(configpath)) {
						var config = JSON.parse(fs.readFileSync(configpath));
						var minifyhtml = false;
						if (typeof config.minify.html == "boolean") {
							minifyhtml = config.minify.html;
						}
						var minifycss = false;
						if (typeof config.minify.css == "boolean") {
							minifycss = config.minify.css;
						}
						var minifyjs = false;
						if (typeof config.minify.js == "boolean") {
							minifyjs = config.minify.js;
						}

						for (const key in config.html) {
							if (Object.hasOwnProperty.call(config.html, key)) {
								var htmlname = config.html[key];
								var htmlpath = path.join(rootsrc, htmlname);

								if (fs.existsSync(htmlpath)) {
									var css, js;
									var html = fs.readFileSync(htmlpath);
									if (minifyhtml) {
										html = htmlminify(html);
									}

									// merging css to html
									for (const key in config.css) {
										if (Object.hasOwnProperty.call(config.css, key)) {
											var csspath = path.join(rootsrc, config.css[key]);

											if (fs.existsSync(csspath)) {
												css = fs.readFileSync(csspath).toString();
												if (minifycss) {
													await new CleanCSS({
														compatibility: "*",
													}).minify(css, function (err, output) {
														if (!err) {
															css = output.styles;
															html += "<style>" + css + "</style>";
														}
													});
												} else {
													html += "<style>" + css + "</style>";
												}
											}
										}
									}

									// merging js to html
									for (const key in config.js) {
										if (Object.hasOwnProperty.call(config.js, key)) {
											var jspath = path.join(rootsrc, config.js[key]);

											if (fs.existsSync(jspath)) {
												js = fs.readFileSync(jspath).toString();
												if (minifyjs) {
													try {
														/**
														 * @type {MinifyOptions} terser_opt
														 */
														var terser_opt = {
															toplevel: true,
															compress: {
																global_defs: {
																	"@console.log": "alert",
																},
																passes: 2,
															},
														};
														await jsminify(js, terser_opt)
															.then(function (jsmin) {
																html += "<script>" + jsmin.code + "</script>";
															})
															.catch(function (e) {
																var tryuglify = UglifyJS.minify(jspath).code;
																if (typeof tryuglify == "string") {
																	html += "<script>" + tryuglify + "</script>";
																} else {
																	html += "<script>" + js + "</script>";
																}
															});
													} catch (e) {
														console.error(e);
													}
												}
											}
										}
									}

									var resultfile = path.join(
										gulpRanInThisFolder,
										"build",
										value,
										htmlname
									);
									writeFile(resultfile, html);
								}
							}
						}
					}
				});
				callback(null, chunk);
			})
		)
		.pipe(gulp.dest("./build"));
});

gulp.task("watch", function () {
	return gulp.watch("./src/**", gulp.parallel("default"));
});

function getFolders(dir) {
	return fs.readdirSync(dir).filter(function (file) {
		return fs.statSync(path.join(dir, file)).isDirectory();
	});
}

function writeFile(path, contents, cb) {
	fs.mkdirSync(getDirName(path), { recursive: true });
	fs.writeFileSync(path, contents);
}

gulp.task("clean", function () {
	del("build/");
});

module.exports = gulp.series("clean", "default");
