<?php
include(__DIR__ . '/functions.php');

// disable caches
header('Expires: Sun, 01 Jan 2014 00:00:00 GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', FALSE);
header('Pragma: no-cache');

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

<main class="container">
  <button>demo button</button>
  <div id="jstree"></div>
</main>


<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/jstree/3.2.1/themes/default/style.min.css'>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js'></script>
<script src='https://cdnjs.cloudflare.com/ajax/libs/jstree/3.3.3/jstree.min.js'></script>
<script>
  const list = <?= json_encode($list) ?>;
  const listbuild = <?= json_encode($listbuild) ?>;
</script>
<script src="<?= path2web(__DIR__ . '/index.js') ?>"></script>