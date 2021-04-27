/**
 * @type {HTMLTextAreaElement}
 */
const textarea = document.getElementById("input"),
	output = document.getElementById("output"),
	initText = document.getElementById("initText").innerText,
	/**
	 * @type {HTMLTextAreaElement}
	 */
	textareas = document.getElementsByTagName("textarea");

// listen input to render markdown result
textarea.addEventListener("keyup", render);
// listen all textarea to auto expand
for (let index = 0; index < textareas.length; index++) {
	const elTA = textareas[index];
	elTA.addEventListener("paste", autoExpand);
	elTA.addEventListener("input", autoExpand);
	elTA.addEventListener("keyup", autoExpand);
	elTA.addEventListener("click", autoExpand);
}

window.addEventListener("load", function (_windows, _event) {
	autoExpand();
	render();
});
window.addEventListener("resize", autoExpand);

function autoExpand() {
	var heightLimit = 200; /* Maximum height: 200px */
	for (const etextarea in textareas) {
		if (Object.hasOwnProperty.call(textareas, etextarea)) {
			const elTextarea = textareas[etextarea];
			elTextarea.style.height = ""; /* Reset the height*/
			elTextarea.style.height =
				Math.min(elTextarea.scrollHeight, heightLimit) + "px";

			elTextarea.style.height = "inherit";
			elTextarea.style.height = elTextarea.scrollHeight + "px";
		}
	}
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

	if (textarea.value.length) {
		output.innerHTML = html;
		document.getElementById("outputHTML").value = html;
	} else {
		output.innerHTML = `<h3>${initText}</h3>`;
	}
}
