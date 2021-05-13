var fs = require("fs");
var path = require("path");
var jsminify = require("terser").minify;
var gulp = require("gulp");
var CleanCSS = require("clean-css");
const through = require("through2");
var gulpRanInThisFolder = process.cwd();
var htmlminify = require("html-minifier").minify;
var UglifyJS = require("uglify-js");
const del = require("del");
const { write, dirname, listFolder } = require("./gulp/func");
var sass = require("node-sass");

gulp.task("default", function () {
	return gulp
		.src("src/")
		.pipe(
			through.obj(function (chunk, enc, callback) {
				//console.log("Work Directory", chunk.path); // this should log now
				listFolder(chunk.path).forEach(async function (value, index, arr) {
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
												if (
													csspath.endsWith(".scss") ||
													csspath.endsWith(".sass")
												) {
													let sassOpt = {
														file: csspath,
													};
													if (minifycss) {
														sassOpt.outputStyle = "compressed";
													}
													sass.render(sassOpt, function (error, result) {
														if (!error) {
															//console.log(result.css.toString());
															//console.info("scss compiled successfully");
															html +=
																"<style>" +
																result.css.toString("utf-8") +
																"</style>";
															//console.log(html);
														}
													});
												} else {
													if (minifycss) {
														new CleanCSS({
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
														const terser_opt = {
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
																const tryuglify = UglifyJS.minify(jspath).code;
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
									//console.log(html);
									setTimeout(() => {
										write(resultfile, html);
									}, 1000);
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

gulp.task("clean", function () {
	return del("build/");
});

module.exports = gulp.series("clean", "default", "watch");
