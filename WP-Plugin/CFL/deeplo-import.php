<?php
set_time_limit(0);
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
require_once plugin_dir_path( __FILE__  ) . 'settings/DB_DATA.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/PHP_SETTINGS.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DB_QUERY.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATA_LIST.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATE_SETUP.php';
echo "Caricamento dei veicoli in corso, attendere il messaggio di conferma.....";
$conn = DB_CONNECT();
$DB_LastID = POSTS_LAST_ID($conn);
EDITLOCK_FIX($conn);
$dir = __FILE__ . "FILE_AUTO.csv";
$FILE = fopen($url_file,"r");
while(!feof($FILE)) {
	$csv[]=
	fgetcsv($FILE, 0,"#");
}
fclose($FILE);
$pos_dato = setup_row($csv);
$pos_dato_aziendale = setup_row_aziendale($csv);
$countdown_macchine = 1;
$conto_macchine = (count($csv) - 3);
$csv_select = count($csv);
$check_tipo_file = array();
foreach ($csv as $CSV_FILE) 

{
	if ($i == 2) {
		foreach($CSV_FILE as $CSV_RIGA) {
			# Divido la riga in singoli dati
			$split = explode(";", $CSV_RIGA);
			foreach($split as $CSV_DATO) {
					array_push($check_tipo_file, $CSV_DATO);
				}
			}
		$check_tipo_file = $check_tipo_file[0];
		//echo $check_tipo_file;
		$i++;
	}
	if ($i >= 4) {
		$CSV_ARRAY = array();
		foreach($CSV_FILE as $CSV_RIGA) {
			# Divido la riga in singoli dati
			$split = explode(";", $CSV_RIGA);
			//print_r($split);

			foreach($split as $CSV_DATO) {
				if ($CSV_DATO == "") {
					array_push($CSV_ARRAY, "N/A");
				} else {
					array_push($CSV_ARRAY, $CSV_DATO);
				}
			}
			$Meta_Num = 0;
			$DB_LastID++;
			switch ($check_tipo_file) {
				case 'Tipo':
					require_once plugin_dir_path( __FILE__  ) . 'deeplo-import-aziendale.php';
					deeplo_import_aziendale($conn,$CSV_ARRAY,$pos_dato_aziendale,$DB_LastID,$countdown_macchine,$conto_macchine,$Meta_Num);
				break;
				case 'Id interno':
					require_once plugin_dir_path( __FILE__  ) . 'deeplo-import-usato.php';
					deeplo_import_usato($conn,$CSV_ARRAY,$pos_dato,$DB_LastID,$conto_macchine,$countdown_macchine,$Meta_Num);
				break;	
			}	
		}
	} else {$i++;}
}
$messaggio_successo = <<<EOD
<head>
<!-- Required meta tags -->
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
<link href='https://fonts.googleapis.com/css?family=Audiowide' rel='stylesheet'>
<link href='https://fonts.googleapis.com/css?family=ABeeZee' rel='stylesheet'>
<!-- jQuery library -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>

<!-- Popper JS -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>

<!-- Latest compiled JavaScript -->
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>  
</head>
<body>
    <div class="container justify-content-center" style="margin:auto">
		<div class="jumbotron text-center justify-content-center" style="background-color:rgba(189, 195, 199,1.0);margin:auto">
			<h1 class="display-4" style="color:#27ae60">Messaggio di confema</h1>
			<br>
			<hr>
            <p class="lead" > I VEICOLI SONO STATI CARICATI CON SUCCESSO</p>
			<hr>
            <p class="float-right">Deeplo Working Group</p>
		</div>
	</div>
</body>
EOD;
echo $messaggio_successo;
?>