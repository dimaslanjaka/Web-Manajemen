<?php
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
  try {
    $f = __DIR__ . '/' . $_REQUEST['file'];
    if (!file_exists($f)) throw new Exception('File does not exists');
    $str = file_get_contents($f);
    $doc = new DOMDocument();
    @$doc->loadHTML($css . $str);
    echo $doc->saveHTML();
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
  <script src="https://cdn.jsdelivr.net/gh/dimaslanjaka/Web-Manajemen@master/WMI/bootstrap.utility.js"></script>
<?php

}
