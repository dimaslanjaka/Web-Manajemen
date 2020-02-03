var $ajax = $(".js-example-data-ajax");
loadCSS(['https://git.webmanajemen.com/Web-Manajemen/css/compiled.block.css', 'https://git.webmanajemen.com/Web-Manajemen/css/compiled.min.css', './css/style.css', './css/select2.min.css']);
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

(function (d, i, m, a, s) {
  var r;
  a = i.createElement(a);
  a.async = true;
  a.src = m;
  a.onload = a.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState == 'complete')) {
      r = true;
      s();
    }
  };
  var b = document.body.firstChild;
  b.parentNode.insertBefore(a, b);
})(window, document, 'https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.0-rc.2/js/select2.full.js', 'script', function () {
  $ajax.select2({
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
                id: 00101230,
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
  $(document).one('click', 'input.select2-search__field', function(e){
    e.preventDefault();
    $(this).addClass('form-control');
  })
});

