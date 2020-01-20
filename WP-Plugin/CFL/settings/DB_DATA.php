<?php
function DB_CONNECT () {
$path = get_home_path() . '/wp-config.php';
include $path;
$db = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
return $db;
}
?>