//Button timer js
function startTimer(seconds){var buttons=$(".claim-button");buttons.each(function(i,button){button=$(button);var org_text=button.text();if(!org_text)org_text=button.val();button.prop("disabled",true).text(seconds).val(seconds);var i=setInterval(function(){seconds-=1;if(seconds<=0){clearInterval(i);button.prop("disabled",false).text(org_text).val(org_text);}else{button.text(seconds).val(seconds);}},1000);window.disableButtonTimer=function(){clearInterval(i);};});}
//Check js
$(function(){function check(){if(!document.getElementById("tester")){if(typeof disableButtonTimer=="function"){disableButtonTimer();}
$(".claim-button").prop("disabled",true).text("Please disable AdBlock and reload").val("Please disable AdBlock and reload");}}
check();setInterval(check,1000);});
//Mmc.js
$(document).mousemove(function(){$.post("",{mmc:true});$(document).off("mousemove");});
