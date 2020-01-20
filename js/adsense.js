(function() {
  if (typeof swal != 'undefined') {
    var ads_h = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7975270895217217" data-ad-slot="4894289831" data-ad-format="link" data-full-width-responsive="true"></ins>';
    swal({
      title: 'Donate With Click ^_^',
      /*type: 'info',*/
      html: ads_h + '<li class="fas fa-link"></i> <a href="//web-manajemen.blogspot.com"><b>Website Development Indonesia</b></a> ',
      showCloseButton: true,
      showCancelButton: false,
      focusConfirm: false,
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
      cancelButtonAriaLabel: 'Thumbs down',
    });
  }
  var ad = document.createElement('script');
  ad.type = 'text/javascript';
  ad.async = true;
  ad.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
  ad.setAttribute('data-ad-client', 'ca-pub-7975270895217217');
  var sc = document.getElementsByTagName('script')[0];
  sc.parentNode.insertBefore(ad, sc);
  ad.onload = function(e) {
    console.log({
      adsense: e
    });
    $('.adsbygoogle').each(function(i, obj) {
      if (!obj.hasAttribute('pushed')) {
        (adsbygoogle = window.adsbygoogle || []).push({});
        obj.setAttribute('pushed', 'true');
      }
    });
  }
})();