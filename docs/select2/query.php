<?php

require __DIR__ . '/vendor/autoload.php';
header('Content-Type: application/json');

$param = [];
if (isset($_REQUEST['q'])) {
  $param['q'] = trim(urldecode($_REQUEST['q']));
}
if (isset($_REQUEST['page'])) {
  $param['page'] = trim(urldecode($_REQUEST['page']));
}
if (empty($param)) return;

$curl = new dimasCurl();
$curl->loadGit($param);
$response = $curl->saveGit();

echo json_encode($response, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
