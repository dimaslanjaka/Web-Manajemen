/*!
   * IE10 viewport hack for Surface/desktop Windows 8 bug
   * Copyright 2014-2017 The Bootstrap Authors
   * Copyright 2014-2017 Twitter, Inc.
   * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
   */

  // See the Getting Started docs for more information:
  // https://getbootstrap.com/getting-started/#support-ie10-width

  (function() {
    'use strict'

    if (navigator.userAgent.match(/IEMobile\/10\.0/)) {
      var msViewportStyle = document.createElement('style')
      msViewportStyle.appendChild(
        document.createTextNode(
          '@-ms-viewport{width:auto!important}'
        )
      )
      document.head.appendChild(msViewportStyle)
    }

  }());

  $(document).ready(function() {
    /*Back to top*/
    $(window).scroll(function() {
      if ($(this).scrollTop() > 50) {
        $('.back-to-top').fadeIn();
      } else {
        $('.back-to-top').fadeOut();
      }
    });
    // scroll body to 0px on click
    $('#back-to-top').click(function() {
      $('body,html').animate({
        scrollTop: 0
      }, 400);
      return false;
    });
    /*Tooltip*/
    $('[data-toggle="tooltip"]').tooltip();
  });