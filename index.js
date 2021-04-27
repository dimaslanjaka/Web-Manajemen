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
	ulfolder.textContent = key;
	var ulfiles = document.createElement("ul");
	for (let index = 0; index < files.length; index++) {
		var file = files[index];
		var ulfile = document.createElement("li");
		ulfile.id = "child_node_" + (index + 1);
		ulfile.textContent = file;

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

// initialize JsTree
$(function () {
	// 6 create an instance when the DOM is ready
	$("#jstree").jstree();
	// 7 bind to events triggered on the tree
	$("#jstree").on("changed.jstree", function (e, data) {
		console.log(data.selected);
	});
	// 8 interact with the tree - either way is OK
	$("button").on("click", function () {
		$("#jstree").jstree(true).select_node("child_node_1");
		$("#jstree").jstree("select_node", "child_node_1");
		$.jstree.reference("#jstree").select_node("child_node_1");
	});
});
