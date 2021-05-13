/**
 * Usage
 * <code>
 *     createCse("id_element");
 * </code>
 */

window.id_cse = "ignielCSE";

function createCse(id) {
  if (typeof id == "string") {
    window.id_cse = id;
  }
  var cx = "bdcdd8d729cb6b0dd";
  if (typeof GOOGLE_CSE_KEY === "string") {
    cx = GOOGLE_CSE_KEY;
  }
  var gcse = document.createElement("script");
  gcse.type = "text/javascript";
  gcse.async = true;
  gcse.src = protocol_url() + "www.google.com/cse/cse.js?cx=" + cx;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(gcse, s);

  // create style
  var style = document.createElement("style");
  style.innerText = createStyle(id);
  document.head.appendChild(style);
}

function createStyle(id) {
  return `#${id}Wrapper {
  margin: 0px;
  padding: 0px;
  text-align: center;
  border-top: 0px;
  border: 1px solid #008c5f;
  border-top: 0px;
}
#${id}Wrapper h3 {
  font-size: 18px;
  font: bold 18px Tahoma, sans-serif;
  margin: 0px 0px 5px 0px;
  background: #008c5f;
  color: #fff;
  text-align: left;
  text-transform: uppercase;
  overflow: hidden;
  padding: 7px 20px;
}
#${id} {
  padding: 0 20px 10px 20px;
  text-align: left;
  width: auto;
  height: 100%;
  line-height: 18px;
}
#${id} .cse .gsc-control-cse,
.gsc-control-cse {
  padding: 0px;
}
#${id} .gsc-control-cse {
  margin: 0px;
  padding: 0px;
}
#${id} .gsc-control-cse .gsc-table-result {
  margin: 0 0 15px 0;
}
#${id} .gsc-results {
  width: 100%;
}
#${id} .gsc-search-box,
#${id} .gsc-above-wrapper-area,
#${id} .gsc-resultsHeader {
  display: none;
}
#${id} .gsc-webResult .gsc-result {
  padding: 0px;
}
#${id} .gsc-webResult .gsc-result:nth-child(4) {
  border-bottom: 0;
}
#${id} .gs-result .gs-title,
#${id} .gs-result .gs-title * {
  text-decoration: none;
  color: #008c5f;
  font-size: 14px;
  font-weight: 600;
  padding-bottom: 18px;
}
#${id} .gs-result .gs-snippet {
  font-size: 12px;
}
#${id} .gsc-reviewer,
#${id} .gs-result a.gs-visibleUrl,
#${id} .gs-result .gs-visibleUrl {
  color: #767676;
}
#${id} .gsc-table-cell-thumbnail,
#${id} .gs-promotion-image-cell {
  padding-right: 10px;
}
#${id} .gsc-results .gsc-cursor-box {
  margin: 0px;
}
#${id} .gsc-preview-reviews ul {
  margin: 0px;
}
#${id} .gsc-cursor .gsc-cursor-page.gsc-cursor-current-page,
#${id} .gsc-cursor .gsc-cursor-page {
  color: #fff;
  text-decoration: none;
  margin: 5px 10px 0 0;
  padding: 5px 10px;
  border-radius: 5px;
  display: inline-block;
}
#${id} .gsc-cursor .gsc-cursor-page.gsc-cursor-current-page {
  background: #2f303f !important;
}
#${id} .gsc-cursor .gsc-cursor-page {
  background: #008c5f;
}
#${id} .gsc-cursor .gsc-cursor-page:hover {
  background: #2f303f;
}
#${id} .gsc-url-top {
  padding: 0px;
}
#${id} .gs-webResult .gs-snippet,
.gs-imageResult .gs-snippet,
.gs-fileFormatType {
  color: #2f303f;
}
#${id} .gsc-thumbnail-inside {
  padding: 0px;
}
`;
}

function protocol_url() {
  return document.location.protocol === "https://" ? "https://" : "http://";
}

function gcseCallback() {
  if (document.readyState !== "complete")
    return google.setOnLoadCallback(gcseCallback, true);
  google.search.cse.element.render({
    gname: "gsearch",
    div: window.id_cse /*Div#id*/,
    tag: "searchresults-only",
    attributes: { linkTarget: "" },
  });

  var element = google.search.cse.element.getElement("gsearch");
  element.execute("php");
}

window.__gcse = {
  parsetags: "explicit",
  callback: gcseCallback,
};
