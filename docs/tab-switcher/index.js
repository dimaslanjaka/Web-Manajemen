/**
 * Tab Switcher
 * @author dimas lanjaka <dimaslanjaka[at]gmail.com>
 * @url https://codepen.io/dimaslanjaka/pen/LYEvERq
 */

var urlc = parse_url(),
  urlp = urlc.searchObject,
  translator = true;
  if (typeof defaultlang == 'undefined'){
    var defaultlang = 'id';
  }
if (urlp.hasOwnProperty('hl')) {
  cC(urlp.hl);
} else {
  if (typeof defaultlang != 'undefined' && defaultlang != '') {
    cC(defaultlang);
  } else if (typeof WMI != 'undefined' && typeof WMI.defaultlang != 'undefined' && WMI.defaultlang != '') {
    cC(WMI.defaultlang);
  }
  /*
  $(document).on('change', '[id="hl-switch"]', function(e) {
    e.preventDefault();
    cC($(this).val());
  });
  */
  document.addEventListener('change', function (e) {
    if (e.target && e.target.id == 'hl-switch') {
      cC(e.target.value);
    }
  });
}

function parse_url(url) {
  if (!url) {
    url = location.href;
  }
  var parser = document.createElement('a'),
    searchObject = {},
    queries, split, i;
  // Let the browser do the work
  parser.href = url;
  // Convert query string to object
  queries = parser.search.replace(/^\?/, '').split('&');
  for (i = 0; i < queries.length; i++) {
    split = queries[i].split('=');
    searchObject[split[0]] = split[1];
  }
  return {
    protocol: parser.protocol,
    host: parser.host,
    hostname: parser.hostname,
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    searchObject: searchObject,
    hash: parser.hash,
    protohost: parser.protocol + '//' + parser.host
  };
}

function loadCountry(callback) {
  var ad = document.createElement('script');
  ad.type = 'text/javascript';
  ad.setAttribute('async', true);
  ad.src = 'https://git.webmanajemen.com/page/js/country/country.js?' + Math.random();
  ad.setAttribute('data-ad-client', 'ca-pub-7975270895217217');
  var sc = document.getElementsByTagName('script')[0];
  sc.parentNode.insertBefore(ad, sc);
  ad.onload = callback;
}

function createTranslator() {
  //if ($('#hl-switch').length) return;
  if (document.querySelectorAll('#hl-switch').length) return;
  //var cC = $("div[hl], div[hreflang]");
  var cC = document.querySelectorAll("div[hl], div[hreflang]");
  if (cC.length) {
    var translatorEl = `<div id="WMItranslator">
<div class="card p-0 m-0" style="width:12em">
<!-- Card content -->
<div class="card-body p-0 m-0">
<div class="card-text p-0 m-0">
<form action="">
  <div class="input-group">
<div class="input-group-prepend">
<span class="input-group-text" id="basic-addon1"><i class="fas fa-language"></i></span>
</div>
<select name="" id="hl-switch" class="form-control">`;
    cC.forEach(function (el, i) {
      if (el.getAttribute('hl')) {
        translatorEl += '<option value="' + el.getAttribute('hl') + '">' + getCountryLanguage(el.getAttribute('hl')) + '</option>';
      } else if (el.getAttribute('hreflang')) {
        translatorEl += '<option value="' + el.getAttribute('hreflang') + '">' + getCountryLanguage(el.getAttribute('hreflang')) + '</option>';
      }
    });
    translatorEl += `</select>
</div>
</form>
</div>
</div>

</div>
</div>`;
    //$('body').append(translatorEl);
    document.body.innerHTML += translatorEl;
  }
}

function cC(hl) {
  //$("div[hl], div[hreflang]").fadeOut('slow');
  fadeOut(document.querySelectorAll("div[hl], div[hreflang]"), 300);
  //var cC = $("div[hl='" + hl + "'], div[hreflang='" + hl + "']");
  var cC = document.querySelectorAll("div[hl='" + hl + "'], div[hreflang='" + hl + "']");
  if (cC.length) {
    if (cC.length === 1) {
      //cC.fadeIn(300);
      fadeIn(cC, 300);
    } else {
      cC[0].style.display = 'block';
    }
    if (typeof translator != 'undefined' && translator) {
      if (typeof getCountryName == 'undefined') {
        loadCountry(createTranslator);
      } else {
        createTranslator();
      }
    }
  }
}

function fadeOut(el, time) {
  if (!time) time = 300;
  if (!el) return;
  if (el instanceof NodeList) {
    for (let index = 0; index < el.length; index++) {
      const element = el[index];
      fadeOutC(element);
    }
  } else {
    fadeOutC(el);
  }
}
/**
 * FadeOut Control Element
 * @param {HTMLElement} el
 * @param {Number} time
 */
function fadeOutC(el, time) {
  var fadeEffect = setInterval(function () {
    if (!el.style.opacity) {
      el.style.opacity = 1;
    }
    if (el.style.opacity > 0) {
      el.style.opacity -= 0.1;
    } else {
      var timer = clearInterval(fadeEffect);
      el.style.display = 'none';
    }
    el.style.transition = `opacity ${time / 1000} linear`;
  }, time);
}

function fadeIn(el, time) {
  if (!el) return;
  if (!time) time = 300;
  if (el instanceof NodeList) {
    for (let index = 0; index < el.length; index++) {
      const element = el[index];
      fadeInC(element, time);
    }
  } else {
    fadeInC(el, time);
  }
}
/**
 * FadeIn Control Element
 * @param {HTMLElement} el
 * @param {Number} time
 */
function fadeInC(el, time) {
  el.style.transition = `opacity ${time / 1000} linear`;
  el.style.opacity = 0;

  var last = +new Date();
  var tick = function () {
    el.style.opacity = +el.style.opacity + (new Date() - last) / time;
    last = +new Date();

    if (+el.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16);
    } else {
      el.style.display = 'block';
      //showAnim(el);
    }
  };

  tick();
}

var AnimationStep = 10; //pixels
var AnimationInterval = 50; //milliseconds

function showAnim(el) {
  if (el instanceof NodeList) {
    for (let index = 0; index < el.length; index++) {
      const element = el[index];
      showAC(element);
    }
  } else {
    showAC(el);
  }
}
/**
 *
 * @param {HTMLElement} el
 * @param {*} height
 */
function showAC(el) {
  el.style.display = "block";
  var height = el.clientHeight;
  el.style.height = "0px";
  Animate(el, height);
}

function Animate(element, targetHeight) {
  var curHeight = element.clientHeight;
  if (curHeight >= targetHeight)
    return true;
  element.style.height = (curHeight + AnimationStep) + "px";
  window.setTimeout(function () {
    Animate(element, targetHeight);
  }, AnimationInterval);
  return false;
}