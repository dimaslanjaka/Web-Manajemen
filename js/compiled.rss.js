var MD5;

if (typeof CryptoJS != 'undefined') {
  MD5 = function (str) {
    return CryptoJS.MD5(str);
  }
} else {
  MD5 = function (str) {
    return str;
  }
}

function parse_url(url) {
  var a = document.createElement('a');
  a.href = url;
  result = {
    protocol: a.protocol,
    query: a.pathname,
    host: a.host,
    hostname: a.hostname,
    hash: a.hash
  };

  return result;
}

function parse_query(url_string, name) {
  var url = new URL(url_string);
  return url.searchParams.get(name);
}

var restartCache = parse_query(location.href, 'reload');
if (!restartCache) {
  restartCache = parse_query(location.href, 'max-results');
}
if (!restartCache) {
  restartCache = parse_query(location.href, 'label');
}

var request;
var localDataKey = 'ajaxCache';
var localData = {
  get: function () {
    result = localStorage.getItem(localDataKey);
    if (typeof result == 'string') {
      return JSON.parse(result);
    }
    return {};
  }
}

var localCache = {
  /**
   * timeout for cache in millis
   * @type {number}
   */
  timeout: 30000,
  /**
   * @type {{_: number, data: {}}}
   **/
  data: localData.get(),
  remove: function (url) {
    delete localCache.data[url];
  },
  exist: function (url) {
    var live = false;
    var expired = false;
    if (localCache.data[url] && typeof localCache.data[url] == 'object') {
      if (localCache.data[url].hasOwnProperty('_')) {
        expired = (new Date().getTime() - localCache.data[url]._) < localCache.timeout;
        live = new Date().getTime() - localCache.data[url]._;
      }
    }
    var opt = {
      'url': url,
      'data': localCache.data[url],
      'live': live,
      'timeout': localCache.timeout,
      'expired': expired
    }
    var e = opt.data && !opt.expired;
    //console.log(opt, e);
    return e;
  },
  get: function (url) {
    //console.log('Get cache ' + url, localCache.data[url].data);
    return localCache.data[url].data;
  },
  set: function (url, cachedData, callback) {
    console.log('Save cache ' + url);
    localCache.remove(url);
    localCache.data[url] = {
      _: new Date().getTime(),
      data: cachedData
    };
    if ($.isFunction(callback)) callback(cachedData);
    localStorage.setItem(localDataKey, JSON.stringify(localCache.data));
    localCache.data = JSON.parse(localStorage.getItem(localDataKey));
  }
};

var ajid;
var run_ajid = null;

$.ajaxPrefilter(function (options, originalOptions, jqXHR) {
  run_ajid = ((options.hasOwnProperty('usecache') ? true : false) && !restartCache);
  //console.log('ajaxPrefilter using cache ' + options.hasOwnProperty('usecache'));
  //console.info(run_ajid);
  if (run_ajid) {
    var complete = originalOptions.complete || $.noop;
    var success = originalOptions.success || $.noop;
    if (originalOptions.hasOwnProperty('data')) {
      ajid = MD5(originalOptions.url + JSON.stringify(originalOptions.data));
    } else {
      ajid = MD5(originalOptions.url);
    }

    var url = ajid;
    //remove jQuery cache as we have our own localCache
    options.cache = false;
    //console.error(restartCache);
    options.beforeSend = function () {
      if (!options.hasOwnProperty('defer') || !options.defer) {
        if (localCache.exist(url)) {
          //console.log(url, 'exists')
          complete(localCache.get(url));
          success(localCache.get(url));
          return false;
        } else {
          //console.log(url, 'not exists');
        }
        return true;
      } else {
        if (!localCache.exist(id)) {
          jqXHR.promise().done(function (data, textStatus) {
            localCache.set(id, data);
          });
        }
        return true;
      }
    };
    options.complete = function (data, textStatus) {
      localCache.set(url, data, complete);
    };
  }
});


$.ajaxTransport("+*", function (options, originalOptions, jqXHR, headers, completeCallback) {
  //console.log('ajaxTransport using cache ' + options.hasOwnProperty('usecache'));
  if (run_ajid === null) run_ajid = ((options.hasOwnProperty('usecache') ? true : false) && !restartCache);
  //console.info(run_ajid);
  if (!ajid) {
    if (originalOptions.hasOwnProperty('data')) {
      ajid = MD5(originalOptions.url + JSON.stringify(originalOptions.data));
    } else {
      ajid = MD5(originalOptions.url);
    }
  }
  var id = ajid;
  options.cache = false;

  if (localCache.exist(id) && run_ajid) {
    return {
      send: function (headers, completeCallback) {
        completeCallback(200, "OK", localCache.get(id));
      },
      abort: function () {
        /* abort code, nothing needed here I guess... */
      }
    };
  }
});

//console.log(typeof window.jQuery != 'undefined');
if (typeof window.jQuery != 'undefined') {
  var dataLabel = $('[data-label]');
  //console.log('labels', dataLabel);
  //console.log('labelLength', dataLabel.length)
  if (dataLabel.length) {
    dataLabel.each(function (i, obj) {
      var labelName = obj.getAttribute('data-label'),
        elementType = obj.getAttribute('data-type'),
        labelUrl = encodeURIComponent('https://www.webmanajemen.com/feeds/posts/summary/-/' + labelName + '?alt=json&max-results=10');
      if (labelName && labelName != '') {
        var urlj = 'https://dimaslanjaka.000webhostapp.com/receiver/index.php?mode=native&url=' + labelUrl;
        //console.log(labelName, labelUrl, decodeURIComponent(labelUrl));
        try {
          request = $.ajax({
            url: urlj,
            usecache: true,
            method: 'GET',
            success: processRSS
          });
        } catch (error) {
          obj.remove();
        }
      }
      /**
       * Process RSS
       * @param {JQueryXHR} json
       */
      function processRSS(json) {
        //console.log('data', json)
        if (json.hasOwnProperty('responseJSON')) {
          json = json.responseJSON;
        }
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