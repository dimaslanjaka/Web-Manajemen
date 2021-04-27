<?php
include(__DIR__ . '/functions.php');

// disable caches
header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

// RENDER FILE
if (isset($_GET['render'])) {
  $file = __DIR__ . '/' . $_GET['render'];
  if (file_exists($file)) {
    return include($file);
  }
}

/// LIST DIRECTORY

$list = getDirContents(__DIR__ . '/build');
// sort list by length ()
$keys = array_map('strlen', array_values($list));
array_multisort($keys, SORT_ASC, $list);

$listbuild = [];
foreach ($list as $path) {
  $fixpath = path2web($path);
  if (is_dir($path)) {
    // path is directory, create new list key
    $listbuild[$fixpath] = [];
  } else {
    foreach ($listbuild as $listbuild_key => $listbuild_value) {
      // if list build start with directory name of $fixpath, add file to that key
      if (str_starts_with($listbuild_key, dirname($fixpath))) {
        // create an array value into list key
        $listbuild[$listbuild_key][] = $fixpath;
      }
    }
  }
}

$list = array_map('path2web', $list);
//print_r($list);
?>

<main class="container mt-4 mb-4">
  <code id="button">build/</code>
  <div id="jstree"></div>
</main>

<link rel="stylesheet" href="https://raw.githack.com/dimaslanjaka/Web-Manajemen/master/css/all.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css'>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.3/jstree.min.js'></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ho+j7jyWK8fNQe+A12Hb8AhRq26LrZ/JpcUGGOn+Y7RsweNrtN/tE3MoK7ZeZDyx" crossorigin="anonymous"></script>

<script>
  const list = <?= json_encode($list) ?>;
  const listbuild = <?= json_encode($listbuild) ?>;
</script>
<script src="<?= path2web(__DIR__ . '/index.js') ?>"></script>