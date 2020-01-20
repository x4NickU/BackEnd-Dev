<?php
/**
 * @package Deeplo System
 * Plugin Name: Deeplo System
 * Author: Deeplo Working Group
 * Author URI: http://www.deeplo.it
 */
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
if ( ! class_exists( 'DeeploSystem', false ) ) {
	include_once dirname( __FILE__ ) . '/mrgio.php';
}
function DS() { 
	return DeeploSystem::instance();
}

// Global for backwards compatibility.
$GLOBALS['deeplosystem'] = DS();
?>