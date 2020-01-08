<?php
require __DIR__ . '/dom.php';

/**
 * Load template
 *
 * @return str_get_html
 */
function loadTheme()
{
  $xml = file_get_contents(__DIR__ . "/../theme.xml");
  $xml = html_entity_decode($xml);
  $html = str_get_html($xml);
  $s = ['css' => [], 'scr' => []];
  foreach ($html->find('link,style') as $skin) {
    $s['css'][] = $skin->outertext;
  }
  foreach ($html->find('b:skin,b:template') as $skin) {
    $s['css'][] = '<style>' . $skin->innertext . '</style>';
  }
  foreach ($html->find('script[src]') as $skin) {
    $s['scr'][] = $skin->outertext;
  }
  $html->find('article', 0)->innertext = '';
  //var_dump($html->find('article', 0)->outertext, implode('', $s));
  return str_get_html(implode('', $s['css']) . $html->find('article', 0)->outertext . implode('', $s['scr']));
}
/**
 * remove elements
 *
 * @param string $str
 * @param string $selector
 * @return string
 */
function removeElement($str, $selector)
{
  $html = str_get_html($str);
  if ($html->find($selector)) {
    foreach ($html->find($selector) as $e) {
      $e->outertext = '';
    }
  }
  return $html->save();
}
