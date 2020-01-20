<?php
/**
 * @package Deeplo Csv Importer
 * Plugin Name: Deeplo Importer
 * Author: Deeplo Working Group
 * Author URI: http://www.mywebsite.com
 */
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );

class deeplo_csv_importer {

	function register(){
		add_action('admin_enqueue_scripts', array($this, 'style'));
		add_action('admin_menu', array($this, 'apri_menu' ));
	}
	function apri_menu () {
		add_menu_page( 'Csv Import', 'Deeplo Csv', 'manage_options', 'deeplo_plugin', array($this,'pagina_index'), '', 26 );
	}
	function pagina_index () {
		require_once plugin_dir_path( __FILE__  ) . 'deeplo_index.php';
	}
	function style() {
		wp_enqueue_style( 'pluginstyle', plugins_url('/style/mystyle.css', __FILE__));
	}
}

if (class_exists('deeplo_csv_importer')) {
	$csvimporter = new deeplo_csv_importer;
	$csvimporter->register();
}

?>