var LISTS = [];
if (typeof listbuild == "object") {
	LISTS = listbuild;
}

// create ul root
var ul = document.createElement("ul");

for (var key in LISTS) {
	/**
	 * @type {Array}
	 */
	var files = LISTS[key];

	var ulfolder = document.createElement("li");
	ulfolder.textContent = key.replace(/^\/build/s, "");
	var ulfiles = document.createElement("ul");
	for (let index = 0; index < files.length; index++) {
		/**
		 * @type {string}
		 */
		var file = files[index];
		var ulfile = document.createElement("li");
		ulfile.id = "child_node_" + (index + 1);
		ulfile.textContent = getFileName(file);
		ulfile.setAttribute("href", `/index.php?render=${file}`);
		ulfile.setAttribute("data-jstree", json_encode({ type: "file" }));

		// add files to ul folders
		ulfiles.appendChild(ulfile);
	}

	// add to ul folder
	ulfolder.appendChild(ulfiles);
	// add to ul root
	ul.appendChild(ulfolder);
}

var jstre = document.getElementById("jstree");
jstre.appendChild(ul);

function json_encode(obj) {
	return JSON.stringify(obj);
}

function getFileName(fullPath) {
	var startIndex =
		fullPath.indexOf("\\") >= 0
			? fullPath.lastIndexOf("\\")
			: fullPath.lastIndexOf("/");
	var filename = fullPath.substring(startIndex);
	if (filename.indexOf("\\") === 0 || filename.indexOf("/") === 0) {
		filename = filename.substring(1);
	}
	return filename;
}

// initialize JsTree
$(function () {
	// 6 create an instance when the DOM is ready
	$("#jstree")
		.jstree({
			plugins: ["themes", "html_data", "ui", "crrm", "types"],
			types: {
				folder: {
					icon: "far fa-folder",
				},
				file: {
					icon: "far fa-file",
				},
				default: {
					icon: "far fa-folder",
				},
			},
		})
		.bind("select_node.jstree", function (event, data) {});
	// 7 bind to events triggered on the tree
	$("#jstree").on("changed.jstree", function (e, data) {
		if (typeof data.node.li_attr.href == "string") {
			location.href = data.node.li_attr.href;
		}
	});
	// 8 interact with the tree - either way is OK
	$("#button").on("click", function () {
		$("#jstree").jstree(true).select_node("child_node_1");
		$("#jstree").jstree("select_node", "child_node_1");
		$.jstree.reference("#jstree").select_node("child_node_1");
	});
});
