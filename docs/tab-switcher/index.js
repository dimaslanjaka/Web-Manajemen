/**
 * Tab Switcher
 * @author dimas lanjaka <dimaslanjaka[at]gmail.com>
 * @url https://codepen.io/dimaslanjaka/pen/LYEvERq
 */
if (typeof defaultlang == 'undefined') {
  var defaultlang = 'id';
}
if (typeof translator == 'undefined' || typeof translator != 'boolean') {
  var translator = true;
}

if (typeof jQuery == 'undefined') {
  var headTag = document.getElementsByTagName("head")[0];
  var jqTag = document.createElement('script');
  jqTag.type = 'text/javascript';
  jqTag.src = '//ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js';
  jqTag.onload = iniT;
  headTag.appendChild(jqTag);
} else {
  iniT();
}

function iniT() {
  var urlc = parse_url(),
    urlp = urlc.searchObject;

  if (urlp.hasOwnProperty('hl')) {
    cC(urlp.hl);
  } else {
    if (typeof defaultlang != 'undefined' && defaultlang != '') {
      cC(defaultlang);
    } else if (typeof WMI != 'undefined' && typeof WMI.defaultlang != 'undefined' && WMI.defaultlang != '') {
      cC(WMI.defaultlang);
    }
  }
}

document.addEventListener('change', function (e) {
  if (e.target && e.target.id == 'hl-switch') {
    cC(e.target.value);
  }
});

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

function cC(hl) {
  var cC = $("div[hl='" + hl + "'], div[hreflang='" + hl + "']");
  //var cC = document.querySelectorAll("div[hl='" + hl + "'], div[hreflang='" + hl + "']");
  if (cC.length) {
    var timer = 300;
    $("div[hl], div[hreflang]").fadeOut(timer, function(){
      cC.fadeIn(timer);
    });

    if (typeof translator != 'undefined' && translator) {
      if (typeof getCountryName == 'undefined') {
        loadCountry(createTranslator);
      } else {
        createTranslator();
      }
    }
  }
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
      var langCode = el.getAttribute('hl');
      if (!langCode){
        langCode = el.getAttribute('hreflang');
      }
      var selected = defaultlang == langCode ? 'selected' : false;
      translatorEl += '<option value="' + langCode + '" ' + selected + '>' + getCountryLanguage(langCode) + '</option>';
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
