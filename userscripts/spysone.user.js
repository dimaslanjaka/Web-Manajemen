// ==UserScript==
// @name         SpysOne Proxy Grabber
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://spys.one/*
// @match        http://spys.one/*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// ==/UserScript==

(function() {
    'use strict';

    var wrap = document.querySelectorAll('td');
    for (var i = 0; i < wrap.length; i++){
        var td = wrap[i];
        var ip = td.querySelector('.spy14');
        if (ip){
            if (!ip.innerText.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\:\d{2,8}/gm)) continue;
            $.post('https://cors-anywhere.herokuapp.com/http://agcontents.000webhostapp.com/proxy-receiver.php', {save: ip.innerText});
        }
    }
})();
