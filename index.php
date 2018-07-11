<?php
/**
 * This makes our life easier when dealing with paths. Everything is relative
 * to the application root now.
 */
define('BASE_PATH', realpath(dirname(__DIR__)));

define('PUBLIC_PATH', BASE_PATH.'/public');

define('RUNNING_FROM_ROOT', true);
ini_set('max_execution_time', 300);
echo "hhhhh";
exit;
include 'public/index.php';

