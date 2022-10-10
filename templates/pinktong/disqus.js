var mql = window.matchMedia('screen and (min-width: 350px)');
var pr = location.protocol + '//';
var site_url = pr + location.host + '/';
var gd = function (href) {
  var l = document.createElement("a");
  l.href = href;
  return l;
};
if (mql.matches) {
  if (disqus_cfg.custom_domain) {
    disqus_cfg.disqus_blogger_current_url = pr + disqus_cfg.custom_domain + gd(disqus_cfg.disqus_blogger_current_url).pathname;
    disqus_cfg.disqus_blogger_homepage_url = pr + disqus_cfg.custom_domain+'/';
    disqus_cfg.disqus_blogger_canonical_homepage_url = pr + disqus_cfg.custom_domain+'/';
  }
  console.log(disqus_cfg);
  var disqus_loaded = disqus_cfg.disqus_loaded;
  var disqus_shortname = disqus_cfg.disqus_shortname;
  var disqus_url = disqus_cfg.disqus_blogger_current_url;
  var disqus_blogger_current_url = disqus_cfg.disqus_blogger_current_url;
  if (typeof disqus_blogger_current_url.length != 'undefined' && !disqus_blogger_current_url.length) {
    disqus_blogger_current_url = site_url;
  }
  var disqus_blogger_homepage_url = disqus_cfg.disqus_blogger_homepage_url;
  var disqus_blogger_canonical_homepage_url = disqus_cfg.disqus_blogger_canonical_homepage_url;

  function disqus() {
    if (!disqus_loaded) {
      disqus_loaded = true;
      var e = document.createElement("script");
      e.type = "text/javascript";
      e.async = true;
      e.src = "//" + disqus_shortname + ".disqus.com/blogger_item.js";
      (document.getElementsByTagName("head")[0] || document.getElementsByTagName("body")[0])
        .appendChild(e);
    }
  }
  //Opens comments when linked to directly
  var hash = window.location.hash.substr(1);
  if (hash.length > 8) {
    if (hash.substring(0, 8) == "comment-") {
      disqus();
    }
  }
};
window.onscroll = function (e) {
  if ((window.innerHeight + window.scrollY) >=
    document.body.offsetHeight) {
    if (!disqus_loaded) disqus();
  }
};