/**
 * Tab Switcher
 * @author dimas lanjaka <dimaslanjaka[at]gmail.com>
 * @url https://codepen.io/dimaslanjaka/pen/LYEvERq
 */

if (typeof jQuery == 'undefined') {
  var headTag = document.getElementsByTagName("head")[0];
  var jqTag = document.createElement('script');
  jqTag.type = 'text/javascript';
  jqTag.src = 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js';
  jqTag.onload = initT;
  headTag.appendChild(jqTag);
} else {
  initT();
}

function initT() {
  var urlc = parse_url(),
    urlp = urlc.searchObject,
    defaultlang = 'id',
    translator = true;
  if (urlp.hasOwnProperty('hl')) {
    cC(urlp.hl);
  } else {
    if (typeof defaultlang != 'undefined' && defaultlang != '') {
      cC(defaultlang);
    } else if (typeof WMI != 'undefined' && typeof WMI.defaultlang != 'undefined' && WMI.defaultlang != '') {
      cC(WMI.defaultlang);
    }

    $(document).on('change', '[id="hl-switch"]', function(e) {
      e.preventDefault();
      cC($(this).val());
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
    if ($('#hl-switch').length) return;
    var cC = $("div[hl], div[hreflang]"),
      translatorEl = `<div class="fixed-bottom" id="WMItranslator">
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
    if (cC.length) {
      cC.each(function(i, el) {
        el = $(el);
        if (el.attr('hl')) {
          translatorEl += '<option value="' + el.attr('hl') + '">' + getCountryLanguage(el.attr('hl')) + '</option>';
        } else if (el.attr('hreflang')) {
          translatorEl += '<option value="' + el.attr('hreflang') + '">' + getCountryLanguage(el.attr('hreflang')) + '</option>';
        }
      });
      translatorEl += `</select>
</div>
    </form>
    </div>
  </div>

</div>
</div>`;
      $('body').append(translatorEl);
    }
  }

  function cC(hl) {
    $("div[hl], div[hreflang]").fadeOut('slow');
    var cC = $("div[hl='" + hl + "'], div[hreflang='" + hl + "']");
    if (cC.length) {
      if (cC.length === 1) {
        cC.fadeIn(300);
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
}