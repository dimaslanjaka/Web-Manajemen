<?php

/**
 * Websocket server.
 *
 * @author dimaslanjaka <dimaslanjaka@gmail.com>
 *
 * @todo receiving websocket and return all data to be live
 *
 * @version 1.4.6
 *
 * @since 1.0.0
 */
header('X-Robots-Tag: noindex, nofollow', true);
header('Content-Type: text/event-stream');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Cache-Control: no-cache');
if (isset($_SERVER['HTTP_SEC_WEBSOCKET_KEY'])) {
  header('Connection: Upgrade');
  header('HTTP/1.1 101 Web Socket Protocol Handshake');
  header('Host: ' . $_SERVER['SERVER_NAME']);
  header('X-Accel-Buffering: no');
  header('Upgrade: websocket');
  header('WebSocket-Origin: ' . $_SERVER['SERVER_NAME']);
  header('WebSocket-Location: http://' . $_SERVER['HTTP_HOST'] . '/ajax/server');
  $_SESSION['serv'] = $_SERVER;
  header('Sec-WebSocket-Accept: ' . base64_encode(pack('H*', sha1($_SERVER['HTTP_SEC_WEBSOCKET_KEY'] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))));
}
header('Access-Control-Allow-Origin: *');

function SEND($id, $msg)
{
  $data = ['msg' => $msg];
  //$parse_url = parse_url($_SERVER['HTTP_REFERER']);
  /* Data Example */
  $data = [
    'pendapatan_max_invoice' => 45,
    'piutang_max_invoice' => 55,
    'hutang_max_invoice' => 65,
    'pengeluaran_max_invoice' => 67,
  ];
  echo "id: $id" . PHP_EOL;
  $data = json_encode($data);
  echo "data: $data" . PHP_EOL;
  echo PHP_EOL;
  ob_flush();
  flush();
}

$serverTime = time();

SEND($serverTime, 'server time: ' . date('h:i:s', time()));
exit;
