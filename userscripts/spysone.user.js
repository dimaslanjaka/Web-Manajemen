// ==UserScript==
// @name         SpysOne Proxy Grabber
// @namespace    http://web-manajemen.blogspot.com/
// @version      1.0
// @description  try to grabbing proxies from spysone
// @author       Dimas Lanjaka <dimaslanjaka[at]gmail.com>
// @match        https://spys.one/*
// @match        http://spys.one/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @updateURL    https://rawgit.com/dimaslanjaka/Web-Manajemen/master/userscripts/spysone.user.js
// @downloadURL  https://rawgit.com/dimaslanjaka/Web-Manajemen/master/userscripts/spysone.user.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAF5JREFUeNrtkTESABAQxPD/R6tsE2dUGYUtFJvLDKf93KevHJAjpBorAQWSBIKqFASC4G0pCAkm4GfaEvgYXl0T6HBaE97f0vmnfYHbZOMLZCx9ISdKWwjOWZSC8GYm4SUGwfYgqI4AAAAASUVORK5CYII=

// ==/UserScript==

var global_index = 0,
  global_proxies = [];
(function () {
  'use strict';

  var wrap = document.querySelectorAll('td');
  for (var i = 0; i < wrap.length; i++) {
    var td = wrap[i];
    var ip = td.querySelector('.spy14');
    if (ip) {
      if (!ip.innerText.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{2,8}/gm)) continue;
      global_proxies.push(ip.innerText);
    }
    if (i == wrap.length - 1) {
      checkSpys();
    }
  }
})();

function checkSpys() {
  if (typeof global_proxies[global_index] != 'undefined') {
    $.post('https://ns.webmanajemen.com/proxy/receiver', {
      save: global_proxies[global_index]
    }).always(function () {
      global_index++;
      if (global_index < global_proxies.length) {
        checkSpys();
      }
    });
  }
}