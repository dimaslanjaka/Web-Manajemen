String.prototype.CSS = function() {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = this;
  var h = document.getElementsByTagName('head')[0];
  if (window.addEventListener) {
    window.addEventListener("load", function() {
      h.parentNode.insertBefore(l, h);
    }, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", function() {
      h.parentNode.insertBefore(l, h);
    });
  } else {
    window.onload = h.parentNode.insertBefore(l, h);
  }
}

String.prototype.JS = function() {
  var element = document.createElement("script");
  element.src = this;
  if (window.addEventListener) {
    window.addEventListener("load", function() {
      document.body.appendChild(element);
    }, false);
  } else if (window.attachEvent) {
    window.attachEvent("onload", function() {
      document.body.appendChild(element);
    });
  } else {
    window.onload = document.body.appendChild(element);
  }
}