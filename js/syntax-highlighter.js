//<![CDATA[
function loadCSS(e, t, n) {
  "use strict";
  var i = window.document.createElement("link");
  var o = t || window.document.getElementsByTagName("script")[0];
  i.rel = "stylesheet";
  i.href = e;
  i.media = "only x";
  o.parentNode.insertBefore(i, o);
  setTimeout(function() {
    i.media = n || "all"
  });
}
loadCSS('https://cdnjs.cloudflare.com/ajax/libs/prism/1.12.2/themes/prism-okaidia.min.css');
var pre = document.querySelectorAll("pre"); //:not(:has(code))
//automated on single pre
if (pre.length) {
  for (var index = 0; index < pre.length; index++) {
    var element = pre[index];
    if (!element.querySelectorAll('code').length) {
      element.innerHTML = '<code>' + element.innerHTML + '</code>';
    }
    var code = element.querySelectorAll('code');
    code[0].classList.toggle('language-markup');
    if (element.hasAttribute('lang')) {
      var lang = element.getAttribute('lang');
      if (lang != '') {
        code[0].classList.remove('language-markup');
        code[0].classList.toggle('language-' + lang);
      }
    }
  }
}

function downloadJSAtOnload() {
  (function(scripts) {
    var i = 0,
      l = scripts.length;
    for (; i < l; ++i) {
      var element = document.createElement("script");
      element.src = (scripts[i]);
      (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(element);
    }
  })(['https://cdnjs.cloudflare.com/ajax/libs/prefixfree/1.0.7/prefixfree.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.12.2/prism.min.js']);
}
if (window.addEventListener) {
  window.addEventListener("load", downloadJSAtOnload, false);
} else if (window.attachEvent) {
  window.attachEvent("onload", downloadJSAtOnload);
} else {
  window.onload = downloadJSAtOnload
};
//]]>