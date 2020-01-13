// ==UserScript==
// @name         https://free-proxy-list.net/ proxy grabber
// @namespace    http://web-manajemen.blogspot.com/
// @version      1.0
// @description  try to grabbing proxies from https://free-proxy-list.net/
// @author       Dimas Lanjaka <dimaslanjaka[at]gmail.com>
// @match        https://free-proxy-list.net/*
// @match        http://free-proxy-list.net/*
// @grant        none
// @require      https://code.jquery.com/jquery-3.4.1.min.js
// @updateURL    https://rawgit.com/dimaslanjaka/Web-Manajemen/master/userscripts/freeproxylist.user.js
// @downloadURL  https://rawgit.com/dimaslanjaka/Web-Manajemen/master/userscripts/freeproxylist.user.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAF5JREFUeNrtkTESABAQxPD/R6tsE2dUGYUtFJvLDKf93KevHJAjpBorAQWSBIKqFASC4G0pCAkm4GfaEvgYXl0T6HBaE97f0vmnfYHbZOMLZCx9ISdKWwjOWZSC8GYm4SUGwfYgqI4AAAAASUVORK5CYII=
// ==/UserScript==
var global_index = 0, global_proxies = [];
(function () {
  'use strict';
  parsingFPL();
  $(document).on('click', 'ul.pagination *', parsingFPL);
})();

function parsingFPL() {
  var t = document.querySelector('table.table');
  if (t) {
    var tr = t.querySelectorAll('tbody tr');
    var ii = 0;
    for (var i = 0; i < tr.length; i++) {
      var el = tr[i];
      var td = el.querySelectorAll('td');
      if (!td.length) continue;
      var ip = td[0].innerText;
      var port = td[1].innerText;
      if (!port.length || !ip.length) continue;
      var proxy = ip + ':' + port;
      if (!proxy.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{2,8}/gm)) continue;
      global_proxies.push(proxy);
      ii++;
      if (i == tr.length - 1 || i == ii) {
        checkSPL();
      }
    }
  }
}

function checkSPL() {
  if (typeof global_proxies[global_index] != 'undefined') {
    $.post('https://agcontents.000webhostapp.com/proxy-receiver.php', { save: global_proxies[global_index] }).always(function () {
      global_index++;
      if (global_index < global_proxies.length) {
        checkSPL();
      }
    });
  }
}