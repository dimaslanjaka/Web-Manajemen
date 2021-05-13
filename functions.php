<?php

/**
 * Recursive directory iterator
 */
function getDirContents($dir, &$results = array())
{
  $files = scandir($dir);

  foreach ($files as $key => $value) {
    $path = realpath($dir . DIRECTORY_SEPARATOR . $value);
    if (!is_dir($path)) {
      $results[] = $path;
    } else if ($value != "." && $value != "..") {
      getDirContents($path, $results);
      $results[] = $path;
    }
  }

  return $results;
}

if (!function_exists('str_starts_with')) {
  function str_starts_with($haystack, $needle, $case = true)
  {
    if ($case) {
      return strpos($haystack, $needle, 0) === 0;
    }
    return stripos($haystack, $needle, 0) === 0;
  }
}

if (!function_exists('str_ends_with')) {
  function str_ends_with($haystack, $needle, $case = true)
  {
    $expectedPosition = strlen($haystack) - strlen($needle);
    if ($case) {
      return strrpos($haystack, $needle, 0) === $expectedPosition;
    }
    return strripos($haystack, $needle, 0) === $expectedPosition;
  }
}

/**
 * Convert file path into web format
 */
function path2web($arr)
{
  $noroot =  str_replace($_SERVER['DOCUMENT_ROOT'], '', $arr);
  $fixpath = str_replace('\\', '/', $noroot);
  return $fixpath;
}
