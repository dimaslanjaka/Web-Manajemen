var x = Up("url") || Up("u"), safelinkURL = 'https://dimaslanjaka.github.io/page/safelink.html?url=';
if (location.host != 'translate.googleusercontent.com' && x && "" != x) {
  location.replace(safelinkURL + x);
}

var EXCLUDE = /facebook\.com|twitter\.com|thumblr\.com|blog\.akarmas\.com|web\-manajemen\.blogspot\.com|dimaslanjaka\.github\.io|webmanajemen\.com|www\.blogger\.com|translate\.google\.com|translate\.googleusercontent\.com|javascript\:|\#|dimaslanjaka/gm,
  l = document.addEventListener || document.attachEvent;
l("mouseover", function(e) {
  if ("a" == (e.target.nodeName || e.srcElement.nodeName).toLowerCase()) {
    var t = e.target,
      a = t.href;
    if (e.target.host.match(/javascript\:void/gm)) {
      return;
    }
    if (!a.match(EXCLUDE)) {
      t.href = safelinkURL + btoa(a);
      t.setAttribute('target', '_blank');
      if (typeof t.classList != 'undefined') {
        t.classList.toggle('ext-link');
      } else {
        t.setAttribute('class', 'ext-link');
      }
    }
  }
});
/*
l("mouseover", function (e) {
if ("a" == (e.target.nodeName || e.srcElement.nodeName).toLowerCase()) {
var t = e.target,
a = t.href;
t.getAttribute("data-href") || a.match(EXCLUDE) || (t.setAttribute("data-href", a), t.removeAttribute("href"), t.style.textDecoration = "underline", t.style.color = "red")
}
});

l("click", function (e) {
if ("a" == (e.target.nodeName || e.srcElement.nodeName).toLowerCase()) {
e.preventDefault();
console.log(e);
var t = e.target.href || e.target.getAttribute("data-href");
return (e.target.host || t).match(EXCLUDE) ? location.href = t : Object.assign(document.createElement("a"), {
target: "_blank",
href: "https://dimaslanjaka.github.io/page/safelink.html?url=" + btoa(t)
}).click(), !1
}
});
*/
function Up(e, a) {
  a || (a = window.location.href), e = e.replace(/[\[\]]/g, "\\$&");
  var l = new RegExp("[?&]" + e + "(=([^&#]*)|&|#|$)").exec(a);
  return l ? l[2] ? decodeURIComponent(l[2].replace(/\+/g, " ")) : "" : null
}