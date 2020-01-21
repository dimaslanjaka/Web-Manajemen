(function() {
  if (typeof swal != 'undefined') {
    var ads_h = '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-7975270895217217" data-ad-slot="4894289831" data-ad-format="link" data-full-width-responsive="true"></ins>';
    swal({
      title: 'Donate With Click ^_^',
      /*type: 'info',*/
      content: {
        element: 'div',
        attributes: {
          innerHTML: ads_h + '<li class="fas fa-link"></i> <a href="//web-manajemen.blogspot.com"><b>Website Development Indonesia</b></a> '
        }
      },
      buttons: {
        cancel: {
          text: " Bad!",
          value: null,
          visible: true,
          className: "fas fa-thumbs-down text-danger border border-danger bg-white",
          closeModal: true,
        },
        confirm: {
          text: " Great!",
          value: true,
          visible: true,
          className: "fas fa-thumbs-up text-success border border-success bg-white",
          closeModal: true
        }
      },
      closeOnEsc: false,
      closeOnClickOutside: false
    });
  }
  var ad = document.createElement('script');
  ad.type = 'text/javascript';
  ad.setAttribute('async', true);
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
        if (obj.getElementsByTagName('iframe').length) return;
        (adsbygoogle = window.adsbygoogle || []).push({});
        obj.setAttribute('pushed', 'true');
      }
    });
  }
})();