<?php

use Curl\Curl;

/**
 * Github repository fetcher
 * * Lightweight github repositories searcher
 * @author Dimas Lanjaka <dimaslanjaka@gmail.com>
 * @license MIT
 * @version 1.0.0
 * @todo Fetching github repository index faster
 */
class dimasGit extends Curl
{
  public $bname;
  public $git_response;
  private $proxy = '';
  private $reindex = 'reindex';
  private $tmp;
  private $proxyFile;
  private $CFile;

  public function __construct($base = 0)
  {
    parent::__construct($base);
    $dir = __DIR__ . '/tmp';
    if (!is_dir($dir)) {
      file_exists($dir) ? unlink($dir) : 0;
      $oldmask = umask(0);
      mkdir($dir, 0777);
      umask($oldmask);
    }
    $this->proxyFile = __DIR__ . '/proxy.txt';
    $p = [];
    if (file_exists($this->proxyFile)) {
      $p = file($this->proxyFile, FILE_SKIP_EMPTY_LINES);
      $p = array_map('trim', $p);
      if (!empty($p)) $this->proxy = $p[array_rand($p)];
    }
  }
  /**
   * Save Results
   *
   * @return void
   */
  public function saveGit()
  {
    $res = $this->response;
    $response = [];
    if ($this->error || !$res) {
      $response['error'] = true;
      $response['code'] = $this->errorCode;
      $response['msg'] = $this->errorMessage;
      $code = [7, 56, 28];
      if (in_array($this->errorCode, $code)) {
        file_put_contents($this->proxyFile, str_replace($this->proxy, '', file_get_contents($this->proxyFile)));
      }
    } else {
      $response = $res;
      file_put_contents($this->CFile, json_encode($response), LOCK_EX);
    }
    $this->git_response = $response;
    return $this;
  }
  /**
   * Load git repos
   *
   * @param array $query
   * @return $this
   */
  public function loadGit($query)
  {
    $this->setUrl('https://api.github.com/search/repositories');
    $this->bname = md5(serialize($query));
    $this->tmp = __DIR__ . '/tmp/';
    $this->CFile = $this->tmp . $this->bname . '.json';
    if (!$this->isreq($this->reindex) && file_exists($this->CFile)) {
      $this->response = json_decode(file_get_contents($this->CFile));
      $this->error = 0;
      $this->errorMessage = 0;
      return $this->saveGit();
    }
    $headers = ['Accept: text/xml,application/xml,application/xhtml+xml,text/html;q=0.9,text/plain;q=0.8,image/png,*/*;q=0.5', 'Connection: Keep-Alive', 'Cache-Control: max-age=0', 'Upgrade-Insecure-Requests: 1', 'DNT: 1', 'Keep-Alive: 300', 'Content-type: */*;charset=UTF-8', 'Accept-Charset: ISO-8859-1,utf-8;q=0.7,*;q=0.7', 'Accept-Language: en-us,en;q=0.5', 'Pragma: no-cache', 'Origins: https://translate.google.co.id'];
    $this->setHeaders($headers);
    $this->setUserAgent(!isset($_SERVER['HTTP_USER_AGENT']) ? 'Mozilla/5.0 (Linux; Android 7.0; Redmi Note 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.80 Mobile Safari/537.36' : $_SERVER['HTTP_USER_AGENT']);
    $this->setReferrer('https://translate.google.co.id/m/translate');
    $this->setOpt(CURLOPT_ENCODING, 'gzip');
    $this->setOpt(CURLOPT_AUTOREFERER, true);
    $this->setOpt(CURLOPT_SSL_VERIFYPEER, false);
    $this->setOpt(CURLOPT_CAINFO, realpath(__DIR__ . '/cacert.pem'));
    $this->setOpt(CURLOPT_COOKIESESSION, true);
    $this->setOpt(CURLOPT_RETURNTRANSFER, true);
    $this->setOpt(CURLOPT_FOLLOWLOCATION, true);
    $this->setTimeout(300);
    if (!empty($this->proxy)) {
      $this->setProxy($this->proxy);
      $this->setProxyTunnel(1);
    }
    $this->get($query);
    return $this->saveGit();
  }

  /**
   * Check request URL.
   *
   * @param string $name
   *
   * @return void
   */
  public function isreq($name)
  {
    if (!ctype_alnum($name)) {
      return false;
    }

    return isset($_REQUEST[$name]) ? trim($_REQUEST[$name]) : false;
  }
}
