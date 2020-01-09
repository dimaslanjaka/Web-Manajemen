<?php
require __DIR__ . '/func.php';
$css = <<<EOF
<!-- Font Awesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
<!-- Bootstrap core CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
<!-- Material Design Bootstrap -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/css/mdb.min.css" rel="stylesheet"><!-- Font Awesome -->
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css">
<!-- Bootstrap core CSS -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/css/bootstrap.min.css" rel="stylesheet">
<!-- Material Design Bootstrap -->
<link href="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/css/mdb.min.css" rel="stylesheet">
<div style="margin-bottom:60px"></div>
EOF;
if (isset($_REQUEST['file'])) {
  $f = __DIR__ . '/' . $_REQUEST['file'];
  try {
    if (!file_exists($f)) throw new Exception('File does not exists');
    $str = file_get_contents($f);
    $direct = '/\<\!\-\-direct\-\-\>/m';
    if (!preg_match_all($direct, $str)) {
      $nav = file_get_contents(__DIR__ . '/navbar.html');
      $style = file_get_contents(__DIR__ . '/style.html');
      $contact = file_get_contents(__DIR__ . '/contact.html');
      $footer = file_get_contents(__DIR__ . '/footer.html');
      $str = str_replace(['%WMI_STYLE%', '%WMI_NAVBAR%', '%WMI_CONTACT%', '%WMI_FOOTER%'], [$style, $nav, $contact, $footer], $str);
      $theme = loadTheme();
      $theme->find('article.post', 0)->innertext = $str;
      if (!isset($_REQUEST['build'])) {
        $theme->find('article.post', 0)->innertext .= file_get_contents(__DIR__ . '/builder.html');
      } else {
        //$str = removeElement($str, '#separator-o');
        $theme->find('article.post', 0)->innertext = str_replace('%WMI_CONTENT%', htmlentities($str), file_get_contents(__DIR__ . '/output.html'));
      }
      $str = $theme->save();
      $doc = new DOMDocument();
      @$doc->loadHTML($str);
      echo $doc->saveHTML();
    } else {
      $str = preg_replace($direct, '', $str);
      echo $str;
    }
  } catch (\Throwable $th) {
    echo $th->getMessage();
  }
} else {
  echo $css;
?>
  <div class="container m-5">
    <ol>
      <?php
      if ($handle = opendir('.')) {

        while (false !== ($entry = readdir($handle))) {
          if ($entry != "." && $entry != ".." && preg_match('/\.html$/m', $entry)) {
            echo "<li><a href='?file=$entry'>$entry</a></li>";
          }
        }

        closedir($handle);
      }
      ?>
    </ol>
  </div>

  <!-- JQuery -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <!-- Bootstrap tooltips -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.4/umd/popper.min.js"></script>
  <!-- Bootstrap core JavaScript -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.3.1/js/bootstrap.min.js"></script>
  <!-- MDB core JavaScript -->
  <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mdbootstrap/4.10.1/js/mdb.min.js"></script>
  <!--Bootstrap Utility-->
  <script src="https://rawcdn.githack.com/dimaslanjaka/Web-Manajemen/9128da3f6bc1fedafb84d09179ed679c353a2d6e/WMI/bootstrap.utility.js"></script>
<?php

}
