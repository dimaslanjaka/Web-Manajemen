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
/**
 * Format selected repository
 * @param {Object} repo
 */
function formatRepoSelection(repo) {
  return repo.full_name || repo.text;
}

define(["jquery", "select2", "loadcss"], function ($) {
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
        /**
         * Error return
         */
        if (typeof data.error != 'undefined') {
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
        /** Success return */
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
