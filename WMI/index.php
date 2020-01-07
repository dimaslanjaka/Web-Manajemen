<?php
if (isset($_REQUEST['file'])) {
  try {
    $f = __DIR__ . '/' . $_REQUEST['file'];
    if (!file_exists($f)) throw new Exception('File does not exists');
    $str = file_get_contents($f);
    $doc = new DOMDocument();
    @$doc->loadHTML($str);
    echo $doc->saveHTML();
  } catch (\Throwable $th) {
    echo $th->getMessage();
  }
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
