/**
 * Load CSS asynchronously
 * @param string e css URL
 * @param HTMLScriptElement t
 * @param string n media css
 */
function loadCSS(e, t, n) {
  "use strict";
  var i = document.createElement("link");
  var o = t || document.getElementsByTagName("script")[0];
  i.rel = "stylesheet";
  i.href = e;
  i.media = "only x";
  o.parentNode.insertBefore(i, o);
  setTimeout(function() {
    i.media = n || "all"
  });
}