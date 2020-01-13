// ==UserScript==
// @name         Socklist.net proxy grabber
// @namespace    http://web-manajemen.blogspot.com/
// @version      1.0
// @description  try to grabbing proxies from Socklist.net
// @author       Dimas Lanjaka <dimaslanjaka[at]gmail.com>
// @match        https://sockslist.net/*
// @match        http://sockslist.net/*
// @grant        none
// @require      http://code.jquery.com/jquery-3.4.1.min.js
// @updateURL    https://rawgit.com/dimaslanjaka/Web-Manajemen/raw/master/userscripts/socklist.user.js
// @downloadURL  https://rawgit.com/dimaslanjaka/Web-Manajemen/raw/master/userscripts/socklist.user.js
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAACVBMVEUAAGcAAABmzDNZt9VtAAAAAXRSTlMAQObYZgAAAF5JREFUeNrtkTESABAQxPD/R6tsE2dUGYUtFJvLDKf93KevHJAjpBorAQWSBIKqFASC4G0pCAkm4GfaEvgYXl0T6HBaE97f0vmnfYHbZOMLZCx9ISdKWwjOWZSC8GYm4SUGwfYgqI4AAAAASUVORK5CYII=
// ==/UserScript==
var global_index = 0, global_proxies = [];
(function () {
  'use strict';
  var t = document.querySelector('table.proxytbl');
  if (t) {
    var tr = t.querySelectorAll('tr');
    for (var i = 0; i < tr.length; i++) {
      var el = tr[i];
      var ip = el.querySelectorAll('.t_ip');
      if (!ip.length) continue;
      var port = el.querySelectorAll('.t_port');
      if (!port.length) continue;
      var proxy = ip[0].innerText + ':' + port[0].innerText;
      global_proxies.push(proxy);
      console.log(proxy)
    }
  }
})();
function checkSpys() {
  if (typeof global_proxies[global_index] != 'undefined') {
      $.post('http://agcontents.000webhostapp.com/proxy-receiver.php', { save: global_proxies[global_index] }).always(function () {
          global_index++;
          if (global_index < global_proxies.length) {
              checkSpys();
          }
      });
  }
}