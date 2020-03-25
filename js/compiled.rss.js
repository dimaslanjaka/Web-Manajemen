var localCache = {
  data: {},
  remove: function(url) {
    delete localCache.data[url];
  },
  exist: function(url) {
    return localCache.data.hasOwnProperty(url) && localCache.data[url] !== null;
  },
  get: function(url) {
    console.log('Getting in cache for url' + url);
    return localCache.data[url];
  },
  set: function(url, cachedData, callback) {
    localCache.remove(url);
    localCache.data[url] = cachedData;
    if ($.isFunction(callback)) callback(cachedData);
  }
};

if (typeof window.jQuery != 'undefined') {
  jQuery.ajaxSetup({
    beforeSend: function(xhr, settings) {},
    complete: function(res) {}
  });
  var dataLabel = $('[data-label]');
  if (dataLabel.length) {
    dataLabel.each(function(i, obj) {
      /**
       * @var {JQuery.jqXHR} req
       */
      var req;
      var labelName = obj.getAttribute('data-label'),
        elementType = obj.getAttribute('data-type'),
        labelUrl = encodeURIComponent('https://www.webmanajemen.com/feeds/posts/summary/-/' + labelName + '?alt=json&max-results=10');
      if (labelName && labelName != '') {
        var urlj = 'https://dimaslanjaka.000webhostapp.com/receiver/index.php?mode=native&url=' + labelUrl;
        //console.log(labelName, labelUrl, decodeURIComponent(labelUrl));
        try {
          req = $.ajax({
            url: urlj,
            cache: true,
            beforeSend: function() {
              if (localCache.exist(url)) {
                var data = localCache.get(url);
                processRSS(data);
                req.abort();
                return false;
              }
              return true;
            },
            complete: function(jqXHR, textStatus) {
              localCache.set(url, jqXHR, processRSS);
            },
            success: processRSS
          });
        } catch (error) {
          obj.remove();
        }
      }

      function processRSS(json) {
        console.log(json)
        if (typeof json.feed == 'undefined') {
          console.log(urlj, json);
          return;
        }
        var entry = json.feed.entry,
          elItems = '';
        for (var index = 0; index < entry.length; index++) {
          var item = entry[index],
            title = item.title.$t,
            link = item.link[4].href;
          if (elementType == 'menu-item') {
            elItems += '<li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" title="' + title + '" href="' + link + '">' + title.substring(0, 20) + '...</a></li>';
          }
        }
        if (elementType == 'menu-item') {
          obj.querySelector('ul.sub-menu').innerHTML = elItems;
        }
      }
    });
  }
}