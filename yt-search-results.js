function getQueryVariable(variable) {
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}
var queries = getQueryVariable("q");

var yturl = 'https://www.googleapis.com/youtube/v3/search?q='+queries+'&part=snippet&maxResults=5&key=AIzaSyAx6gnU8v7jQDi6ZFg_ERCtJRJUIC9VuoQ';
$.getJSON(yturl, function(data) {
  var html1st = '<div style="position: relative;padding-bottom: 56.25%;padding-top: 25px;height: 0;"><iframe style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;" src="https://www.youtube.com/embed/';
  var html2nd = '?autoplay=1&fs=1&iv_load_policy=1&showinfo=1&rel=1&cc_load_policy=1&start=0&end=0&vq=large&origin=https://webmanajemen.xyz" frameborder=0" allowfullscreen></iframe></div>';
