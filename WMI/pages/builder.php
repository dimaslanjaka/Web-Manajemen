<?php
require __DIR__ . '/dom.php';
libxml_use_internal_errors(true);
$xml = file_get_contents(__DIR__ . "/../theme.xml");
$html = str_get_html($xml);
foreach ($html->find('b:skin,b:template-skin') as $skin) {
  $skin->outertext = '<style>' . $skin->innertext . '</style>';
}
echo $html->find('html', 0)->outertext;
