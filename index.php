<?php
include(__DIR__ . '/functions.php');

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
  <div id="jstree"></div>
</main>

<script>
  const list = <?= json_encode($list) ?>;
  const listbuild = <?= json_encode($listbuild) ?>;
</script>