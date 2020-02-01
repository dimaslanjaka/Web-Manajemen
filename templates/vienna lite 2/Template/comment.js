var loadJS = function (url, implementationCode, location) {
  //url is URL of external file, implementationCode is the code
  //to be called from the file, location is the location to
  //insert the <script> element

  var scriptTag = document.createElement('script');
  scriptTag.src = url;

  scriptTag.onload = implementationCode;
  scriptTag.onreadystatechange = implementationCode;

  location.appendChild(scriptTag);
};
loadJS('//www.blogblog.com/dynamicviews/4224c15c4e7c9321/js/comments.js')


function initComments() {
  //Global setting
  Config.maxThreadDepth = 3;
  Display_Emo = true;
  Replace_Youtube_Link = false;
  Replace_Image_Link = false;
  Replace_Force_Tag = false;
  Replace_Image_Ext = ['JPG', 'GIF', 'PNG', 'BMP'];


  //Pengaturan Emoticon
  Emo_List = [
    ':)', 'http://twemoji.maxcdn.com/36x36/1f600.png',
    ':(', 'http://twemoji.maxcdn.com/36x36/1f615.png',
    'hihi', 'http://twemoji.maxcdn.com/36x36/1f601.png',
    ':-)', 'http://twemoji.maxcdn.com/36x36/1f60f.png',
    ':D', 'http://twemoji.maxcdn.com/36x36/1f603.png',
    '=D', 'http://twemoji.maxcdn.com/36x36/1f62c.png',
    ':-d', 'http://twemoji.maxcdn.com/36x36/1f604.png',
    ';(', 'http://twemoji.maxcdn.com/36x36/1f61e.png',
    ';-(', 'http://twemoji.maxcdn.com/36x36/1f62d.png',
    '@-)', 'http://twemoji.maxcdn.com/36x36/1f616.png',
    ':P', 'http://twemoji.maxcdn.com/36x36/1f61c.png',
    ':o', 'http://twemoji.maxcdn.com/36x36/1f62e.png',
    ':&gt;)', 'http://twemoji.maxcdn.com/36x36/1f606.png',
    '(o)', 'http://twemoji.maxcdn.com/36x36/1f609.png',
    ':p', 'http://twemoji.maxcdn.com/36x36/1f614.png',
    ':-?', 'http://twemoji.maxcdn.com/36x36/2753.png',
    '(p)', 'http://twemoji.maxcdn.com/36x36/1f619.png',
    ':-s', 'http://twemoji.maxcdn.com/36x36/1f625.png',
    '(m)', 'http://twemoji.maxcdn.com/36x36/1f620.png',
    '8-)', 'http://twemoji.maxcdn.com/36x36/1f60e.png',
    ':-t', 'http://twemoji.maxcdn.com/36x36/1f624.png',
    ':-b', 'http://twemoji.maxcdn.com/36x36/1f634.png',
    'b-(', 'http://twemoji.maxcdn.com/36x36/1f635.png',
    ':-#', 'http://twemoji.maxcdn.com/36x36/1f637.png',
    '=p~', 'http://twemoji.maxcdn.com/36x36/1f35c.png',
    '$-)', 'http://twemoji.maxcdn.com/36x36/1f4b5.png',
    '(y)', 'http://twemoji.maxcdn.com/36x36/1f44d.png',
    '(f)', 'http://twemoji.maxcdn.com/36x36/1f33a.png',
    'x-)', 'http://twemoji.maxcdn.com/36x36/1f60d.png',
    '(k)', 'http://twemoji.maxcdn.com/36x36/1f496.png',
    '(h)', 'http://twemoji.maxcdn.com/36x36/1f44f.png',
    'cheer', 'http://twemoji.maxcdn.com/36x36/1f378.png',
  ];


  //Config Force tag list, define all in lower case
  Force_Tag = [
    '[pre]', '<pre>',
    '[/pre]', '</pre>',
    '<pre class="brush: plain; title: ; notranslate" title="">', '&lt;code&gt;',
    '</pre>', '</code>'
  ];

  loadJS('../emoji-unpacked.js', function () {
    var avatar = $("#comments");
    avatar.find('.comment_avatar img').each(function () {
      var ava = $(this).attr('src');
      $(this).show().attr('src', ava.replace(/\/s[0-9]+(\-c)?\//, "/s100-c/"));
    });
  });
}

