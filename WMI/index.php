<?php
if (isset($_REQUEST['file'])) {
  $str = file_get_contents(__DIR__ . '/' . $_REQUEST['file']);
  $doc = new DOMDocument();
  @$doc->loadHTML($str);
  echo $doc->saveHTML();
} else {
  if ($handle = opendir('.')) {

    while (false !== ($entry = readdir($handle))) {
      if ($entry != "." && $entry != ".." && preg_match('/\.html$/m', $entry)) {
        echo "<a href='?file=$entry'>$entry</a><br/>";
      }
    }

    closedir($handle);
  }
}
