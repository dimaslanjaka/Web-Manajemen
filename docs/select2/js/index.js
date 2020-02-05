/**
 * Load CSS asynchronously
 * @see https://www.webmanajemen.com/2020/01/load-css-asynchronously.html
 * @todo loading css asynchronously for better performance
 * @param {String|Array} e
 * @param {HTMLScriptElement} t
 * @param {String} n
 */
function loadCSS(e, t, n) {
  "use strict";
  var load = function (URL, Script, Media) {
    var i = document.createElement("link");
    var o = Script || document.getElementsByTagName("script")[0];
    i.rel = "stylesheet";
    i.href = URL;
    i.media = "only x";
    o.parentNode.insertBefore(i, o);
    setTimeout(function () {
      i.media = Media || "all"
    });
  }
  if (Array.isArray(e)) {
    for (var index = 0; index < e.length; index++) {
      load(e[index], t, n);
    }
  } else {
    load(e, t, n);
  }
}
/**
 * Format single repo into result html pagging
 * @param {Object} repo
 */
function formatRepo(repo) {
  if (repo.loading) {
    //console.log(repo.loading);
    return repo.text;
  }
  //console.log(repo)
  var markup = "<div class='select2-result-repository clearfix'>" +
    "<div class='select2-result-RepoAvatar'><img src='" + repo.owner.avatar_url + "' /></div>" +
    "<div class='select2-result-RepoMeta'>" +
    "<div class='select2-result-RepoTitle'>" + repo.full_name + "</div>";

  if (repo.description) {
    markup += "<div class='select2-result-RepoDesc'>" + repo.description + "</div>";
  }

  markup += "<div class='select2-result-RepoStats'>" +
    "<div class='select2-result-RepoForked'><i class='fas fa-flash'></i> " + repo.forks_count + " Forks</div>" +
    "<div class='select2-result-RepoStars'><i class='fas fa-star'></i> " + repo.stargazers_count + " Stars</div>" +
    "<div class='select2-result-RepoWatchers'><i class='fas fa-eye'></i> " + repo.watchers_count + " Watchers</div>" +
    "</div>" +
    "</div></div>";

  return markup;
}

function formatRepoSelection(repo) {
  return repo.full_name || repo.text;
}
!(function (d, i, m, a, s) {
  var load = function (dd, ii, mm, aa, ss) {
    var r, sc = ii.createElement(aa);
    sc.async = true;
    sc.src = mm;
    sc.onload = sc.onreadystatechange = function () {
      if (!r && typeof ss == 'function' && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        ss(dd, load);
      }
    };
    var b = document.getElementsByTagName(a)[0];
    b.parentNode.insertBefore(sc, b);
  }
  if (Array.isArray(m)) {
    for (var index = 0; index < m.length; index++) {
      if (index == m.length - 1) {
        load(d, i, m[index], a, s);
      } else {
        load(d, i, m[index], a);
      }
    }
  } else {
    load(d, i, m, a, s);
  }
})(window, document, ['https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-rc.2/js/select2.full.js'], 'script', function (w, l) {
  'use strict';
  loadCSS(['https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.0/css/all.min.css', './css/style.css', './css/select2.min.css']);

  if (typeof window.jQuery == 'undefined') {
    return l(w, document, 'https://unpkg.com/sweetalert/dist/sweetalert.min.js', 'script', function (w, l) {
      swal("jQuery Error", "Please reload the browser").then(function(c){
        location.reload()
      });
    });
  }
  var $ajax = $("#sl2");
  var init = $ajax.select2({
    ajax: {
      url: "./query.php",
      dataType: 'json',
      delay: 250,
      data: function (params) {
        return {
          q: params.term, // search term
          page: params.page
        };
      },
      processResults: function (data, params) {
        //console.log(data, params);
        if (typeof data.error != 'undefined') {
          console.log(data)
          return {
            "results": [
              {
                id: '00101230',
                name: "ERROR",
                full_name: "ERROR CURL",
                description: data.msg,
                text: data.msg,
                fork: false,
                forks_count: 0,
                stargazers_count: 0,
                watchers_count: 0,
                owner: {
                  avatar_url: 'img/index.php?size=500x250&type=png&bg=f00&color=ffffff&text=' + data.code
                }
              }
            ],
            "pagination": {
              "more": true
            }
          }
        }

        params.page = params.page || 1;

        return {
          results: data.items,
          pagination: {
            more: params.page * 30 < data.total_count
          }
        };


      },
      cache: true
    },

    escapeMarkup: function (markup) {
      return markup;
    },
    minimumInputLength: 1,
    templateResult: formatRepo,
    templateSelection: formatRepoSelection,
    theme: 'adwitt'
  });
});