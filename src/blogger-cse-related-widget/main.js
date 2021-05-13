function gcseCallback() {
  if (document.readyState !== "complete")
    return google.setOnLoadCallback(gcseCallback, true);
  google.search.cse.element.render({
    gname: "gsearch",
    div: "ignielCSE",
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
(function () {
  var cx = "bdcdd8d729cb6b0dd";
  var gcse = document.createElement("script");
  gcse.type = "text/javascript";
  gcse.async = true;
  gcse.src =
    (document.location.protocol == "https:" ? "https:" : "http:") +
    "//www.google.com/cse/cse.js?cx=" +
    cx;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(gcse, s);
})();
