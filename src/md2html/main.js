const textarea = document.getElementById("input"),
	output = document.getElementById("output"),
	initText = document.getElementById("initText").innerText;

textarea.addEventListener("keyup", render);

var heightLimit = 200; /* Maximum height: 200px */

textarea.addEventListener("paste", autoExpand);
textarea.addEventListener("input", autoExpand);
textarea.addEventListener("keyup", autoExpand);
window.addEventListener("load", function (_windows, _event) {
	autoExpand();
	render();
});
window.addEventListener("resize", autoExpand);

function autoExpand() {
	textarea.style.height = ""; /* Reset the height*/
	textarea.style.height = Math.min(textarea.scrollHeight, heightLimit) + "px";

	textarea.style.height = "inherit";
	textarea.style.height = textarea.scrollHeight + "px";
}

function render() {
	let converter = new showdown.Converter({
			tables: true,
			simpleLineBreaks: true,
		}),
		text = textarea.value,
		htmlMD = converter.makeHtml(text),
		html = filterXSS(htmlMD); // xss sanitize-https://github.com/leizongmin/js-xss

	converter.setFlavor("github");

	if (textarea.value) {
		output.innerHTML = html;
	} else {
		output.innerHTML = `<h3>${initText}</h3>`;
	}
}
