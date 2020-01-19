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
 * @see https://www.webmanajemen.com/2020/01/simple-websocket.html Simple Web Socket
 *
 * @license http://opensource.org/licenses/gpl-license.php GNU Public License
 */
class WMI_websocket
{
  /**
   * Data Storage.
   *
   * @var array
   */
  private $data = [];
  /**
   * Chaining static OOP initializer.
   *
   * @var mixed
   */
  private static $_instance = null;

  /**
   * Websocket Header Initializer.
   *
   * @param bool $allow_global_domain Allowing Websocket from any domains
   * @param bool $cache               Allow Caching ? better no
   */
  public function __construct($allow_global_domain = false, $cache = false)
  {
    /*
     * Disable Bot Crawlers
     */
    header('X-Robots-Tag: noindex, nofollow', true);
    header('Content-Type: text/event-stream');
    if (!$cache) {
      header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');
      header('Cache-Control: post-check=0, pre-check=0', false);
      header('Cache-Control: no-cache');
    }
    if (isset($_SERVER['HTTP_SEC_WEBSOCKET_KEY'])) {
      header('Connection: Upgrade');
      header('HTTP/1.1 101 Web Socket Protocol Handshake');
      header('Host: ' . $_SERVER['SERVER_NAME']);
      header('X-Accel-Buffering: no');
      header('Upgrade: websocket');
      header('WebSocket-Origin: ' . $_SERVER['SERVER_NAME']);
      /**
       * Set canonical response.
       */
      $canonical = (isset($_SERVER['HTTPS']) && 'on' === $_SERVER['HTTPS'] ? 'https' : 'http') . '://' . $_SERVER['HTTP_HOST'] . strtok($_SERVER['REQUEST_URI'], '?');
      header('WebSocket-Location: ' . $canonical);
      $_SESSION['serv'] = $_SERVER;
      /*
       * @todo Encrypting Websocket Hash
       */
      header('Sec-WebSocket-Accept: ' . base64_encode(pack('H*', sha1($_SERVER['HTTP_SEC_WEBSOCKET_KEY'] . '258EAFA5-E914-47DA-95CA-C5AB0DC85B11'))));
    }
    if ($allow_global_domain) {
      header('Access-Control-Allow-Origin: *');
    }
  }

  /**
   * Chaining static OOP.
   *
   * @return self::$_instance
   */
  public static function i($allow_global_domain = false, $cache = false)
  {
    if (null === self::$_instance) {
      self::$_instance = new self($allow_global_domain = false, $cache = false);
    }

    return self::$_instance;
  }

  /**
   * Output data for javascript processing.
   *
   * @return void
   */
  public function SEND()
  {
    $data = ['msg' => 'server time: ' . date('h:i:s', time())];
    //$parse_url = parse_url($_SERVER['HTTP_REFERER']);
    $data = $this->data;
    echo 'id: ' . time() . PHP_EOL;
    $data = json_encode($data);
    echo "data: $data" . PHP_EOL;
    echo PHP_EOL;
    ob_flush();
    flush();
  }

  /**
   * Data Processing Unit
   * * Also can be chained OOP.
   *
   * @param array $data
   *
   * @return array
   */
  public function createData(array $data)
  {
    $this->data = $data;

    return $this;
  }
}

/*
Object Oriented Chaining method:

*/
$websocket = new WMI_websocket(false, false);
$websocket->createData([
  'pendapatan_max_invoice' => 45,
  'piutang_max_invoice' => 55,
  'hutang_max_invoice' => 65,
  'pengeluaran_max_invoice' => 67,
])->SEND();
WMI_websocket::i(false, false)->createData([
  'pendapatan_max_invoice' => 45,
  'piutang_max_invoice' => 55,
  'hutang_max_invoice' => 65,
  'pengeluaran_max_invoice' => 67,
])->SEND();
exit;
