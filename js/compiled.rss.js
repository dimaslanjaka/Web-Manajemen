if (typeof window.jQuery != 'undefined') {
  var dataLabel = $('[data-label]');
  if (dataLabel.length) {
    dataLabel.each(function (i, obj) {
      var labelName = obj.getAttribute('data-label'), elementType = obj.getAttribute('data-type');
      if (labelName && labelName != '') {
        var urlj = 'https://cors-anywhere.herokuapp.com/https://www.webmanajemen.com/feeds/posts/summary/-/' + labelName + '?alt=json&max-results=10';
        try {
          $.getJSON(urlj, function (json) {
            var entry = json.feed.entry, elItems = '';
            for (var index = 0; index < entry.length; index++) {
              var item = entry[index], title = item.title.$t, link = item.link[4].href;
              if (elementType == 'menu-item') {
                elItems += '<li id="menu-item" class="menu-item menu-item-type-post_type menu-item-object-page  menu-item"><a class="collapsible-header waves-effect" id="link-menu-item" title="'+title+'" href="' + link + '">' + title.substring(0,20) + '...</a></li>';
              }
            }
            if (elementType == 'menu-item') {
              obj.querySelector('ul.sub-menu').innerHTML = elItems;
            }
          });
        } catch (error) {
          obj.remove();
        }
      }
    })
  }
}