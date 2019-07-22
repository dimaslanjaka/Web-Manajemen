String.prototype.CSS = function() {
  var l = document.createElement('link');
  l.rel = 'stylesheet';
  l.href = this;
  var h = document.getElementsByTagName('head')[0],
    event = window.addEventListener || window.attachEvent || window.onload;
  event('load', function() {
    return h.parentNode.insertBefore(l, h);
  });
}

