<?php
set_time_limit(0);
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
require_once plugin_dir_path( __FILE__  ) . 'settings/PHP_SETTINGS.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DB_QUERY.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATA_LIST.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATE_SETUP.php';
function deeplo_import_usato($conn,$CSV_ARRAY,$pos_dato,$DB_LastID,$conto_macchine,$countdown_macchine,$Meta_Num) {
   
    $piccolo_test = $CSV_ARRAY[$pos_dato['id_interno']];
    $controllo_veicolo_esistente = check_veicolo($piccolo_test, $conn);
    if (($controllo_veicolo_esistente == false) and ($CSV_ARRAY[$pos_dato['venditaprivati']] != 'N/A') and ($CSV_ARRAY[$pos_dato['destinazione']] == 'Privati') ) {
        $data = array (
            #'edit_last'
            "1",
            #slide_template
            "default",
            #'expiration'
            "",
            #'sold'
            "0",
            #'Featured'
            "0",
            #'condition' => 
            "Usato",                                
            #'make' => 
            "0",
            #'model' => 
            "0",
            #'frdate'
            "2019-05-07",
            #'price' => 
            $output = str_replace(".", "", $CSV_ARRAY[$pos_dato['venditaprivati']]),
            #'body_style' => 10
            $output = str_replace(".", ",", $CSV_ARRAY[$pos_dato['codice']]),
            #'trasmission' => 
            "",
            #'engine' => 
            "",
            #'alimentazione' =>
            $CSV_ARRAY[$pos_dato['alimentazione']],
            #marca
            $CSV_ARRAY[$pos_dato['marca']],
            #'codice' => 
            $output = str_replace(".", ",", $CSV_ARRAY[$pos_dato['codice']]),
            #'modello' 
            $CSV_ARRAY[$pos_dato['modello']],
            #'color' =>
            $CSV_ARRAY[$pos_dato['colore']],
            #'cilindrata' => 
            $CSV_ARRAY[$pos_dato['cilindrata']],
            #'milleage' => 
            $output = str_replace(".", "", $CSV_ARRAY[$pos_dato['km']]),
            #'doors' => 20
            $CSV_ARRAY[$pos_dato['porte']],
            #'immatricolazione' => 
            $CSV_ARRAY[$pos_dato['immatricolazione']],
            #'accessori' => 
            $CSV_ARRAY[$pos_dato['accessori']],
            #'iva' => 
            $CSV_ARRAY[$pos_dato['iva']],
            #'venditaprivati' => 
            $CSV_ARRAY[$pos_dato['venditaprivati']],
            #'nrfoto' => 
            $CSV_ARRAY[$pos_dato['nrfoto']],
            #'power_kw' => 
            $CSV_ARRAY[$pos_dato['kw']],
            #'power_hp' => 
            $CSV_ARRAY[$pos_dato['cv']],
            #'alimentazione' =>
            $CSV_ARRAY[$pos_dato['alimentazione']],
            #'posti' =>
            $CSV_ARRAY[$pos_dato['posti']],
            #'cambio' => 30
            $CSV_ARRAY[$pos_dato['cambio']],
            #'neopatentati' => 
            $CSV_ARRAY[$pos_dato['neopatentati']],
            #numproprietario=>
            $CSV_ARRAY[$pos_dato['numproprietari']],
            #'ultimarevisione' => 
            $CSV_ARRAY[$pos_dato['ultimarevisione']],
            #'pubweb' => 
            $CSV_ARRAY[$pos_dato['pubweb']],
            #'trazione' => 
            $CSV_ARRAY[$pos_dato['trazione']],
            #ID INTERNO
            $CSV_ARRAY[$pos_dato['id_interno']],
            #Tipologia
            "Usato",
            #Targa
            $CSV_ARRAY[$pos_dato['targa']]
            );
        $prefix= array (
            '_edit_last',
            'slide_template',
            'wpcm_expiration',
            'wpcm_sold',
            'wpcm_featured',
            'wpcm_condition',
            'wpcm_make',
            'wpcm_model',
            'wpcm_frdate',
            'wpcm_price',
            'wpcm_body_style',
            'wpcm_transmission',
            'wpcm_engine',
            'wpcm_fuel_type',
            'wpcm_marca',
            'wpcm_codice',
            'wpcm_modello',
            'wpcm_color',
            'wpcm_cilindrata',
            'wpcm_mileage',
            'wpcm_doors',
            'wpcm_immatricolazione',
            'wpcm_accessori',
            'wpcm_iva',
            'wpcm_venditaprivati',
            'wpcm_nrfoto',
            'wpcm_power_kw',
            'wpcm_power_hp',
            'wpcm_alimentazione',
            'wpcm_posti',
            'wpcm_cambio',
            'wpcm_neopatentati',
            'wpcm_numproprietario',
            'wpcm_ultimarevisione',
            'wpcm_pubweb',
            'wpcm_trazione',
            'id_interno',
            'tipologia',
            'wpcm_targa'
            );
        $Post_Titolo = $CSV_ARRAY[$pos_dato['modello']];
        $Marca_Take = $CSV_ARRAY[$pos_dato['marca']];
        $Post_Name_1 = str_replace([' ','.',],'-',$Post_Titolo);

        $Post_Name = str_replace(['(',')','/','[',']',],'',$Post_Name_1);
        $guid = "http://localhost:8888/cfl/?post_type=wpcm_vehicle&#038;p=". $DB_LastID;
        $DB_POST_QUERY = DB_POST($DB_LastID, $Post_Titolo, $Post_Name, $guid, $conn);
        $CAR_COUNT = count($data);
        if (ob_get_level() == 0) ob_start();
        flush();
        ob_flush();

        foreach ($data as $meta) {  

            $test_output = "Caricamento Veicoli: " . $countdown_macchine . "/" . $conto_macchine . "<br>";      
            $output = preg_replace('/[^(\x20-\x7F)]*/','', $meta);

            //echo "<br>";
            //echo $prefix[$Meta_Num] . " : " . $output;
            //echo "<br>";
            
            $VALORE = $prefix[$Meta_Num];
            $ID = QUERY_ID($conn);

            if ($ID->num_rows > 0) {
                // output data of each row
                while($row = $ID->fetch_assoc()) {
                    $Term_ID = $row["term_id"];
                }
            }

            $Term_ID++;

            if ($Meta_Num == '6') {
                $Query_Nome_Marca = QUERY_NOME($Marca_Take,$conn);

                if ($Query_Nome_Marca->num_rows > 0) {

                    while($row = $Query_Nome_Marca->fetch_assoc()) {
                        
                        $Marca = $row["term_id"];
                        $DB_Marca_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Marca,$conn);
                    }
                } else {
                    $DB_INSERT_MARCA = QUERY_INSERT($Term_ID, $Marca_Take, $conn, 0);
                    $DB_Marca_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Term_ID,$conn);
                }
            } else {}

            if ($Meta_Num == '7') {
            $Query_Nome_Modello = QUERY_NOME($Post_Titolo,$conn);
            $Query_Nome_Marca = QUERY_CHECK($Marca_Take,$conn);
            
            if ($Query_Nome_Marca->num_rows > 0) {
                while($row = $Query_Nome_Marca->fetch_assoc()) {
                    $Marca_Name = $row["term_id"];
                }
            }

            sleep(0.2);
            if ($Query_Nome_Modello->num_rows > 0) {

                while($row = $Query_Nome_Modello->fetch_assoc()) {

                    $Modello = $row["term_id"];
                    $DB_Modello_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Modello,$conn);
                }
                } else {
                $DB_INSERT_MODELLO = QUERY_INSERT($Term_ID, $Post_Titolo, $conn, $Marca_Name);
                $Query_Modello_Select = QUERY_CHECK($Post_Titolo, $conn);
                $DB_Modello_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Term_ID,$conn);
                }
            } else {}
            if (($Meta_Num == '8') or ($Meta_Num == '21')) {

                $data_imm = data_setup($CSV_ARRAY[$pos_dato['immatricolazione']]);
                $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$data_imm,$conn);
            }
            if (($Meta_Num == '13') or ($Meta_Num == '28')) {

                $carburante_input = $CSV_ARRAY[$pos_dato['alimentazione']];
                $Opzione_Deeplo = 'Carburante';
                switch ($carburante_input) {

                    case 'benzina senza piombo':
                        $Carburante_take = 'Benzina';
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Carburante_take,$conn);
                        break;
                
                    case 'gas liquido':
                        $Carburante_take = 'GPL';
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Carburante_take,$conn);
                        break;

                    default:
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$output,$conn);
                        break;
                }
            }
            if ($Meta_Num == '31') {
                $input_neopatentati = $CSV_ARRAY[$pos_dato['neopatentati']];
                switch ($input_neopatentati) {
                    case '0':
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,"No",$conn);
                        break;
                    case '1':
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,"Si",$conn);
                        break;
                    case "N/A":
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,"N/A",$conn);
                        break;
                }
            }

            if ($Meta_Num == '17') {

                $Opzione_Deeplo = 'Colore';
                $colore_deeplo =  ($CSV_ARRAY[$pos_dato['colore']]);
                $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$colore_deeplo,$conn);
                deeplo_insert($colore_deeplo,$conn,$Opzione_Deeplo);
            }
            if ($Meta_Num == '30') {

                $cambio_input = $CSV_ARRAY[$pos_dato['cambio']];
                $Opzione_Deeplo = 'Cambio';
                switch ($cambio_input) {

                    case 'CVT':
                        $Cambio_take = 'CVT';
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Cambio_take,$conn);
                        break;

                    case 'Metano':
                        $Cambio_take = 'Manuale';
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Cambio_take,$conn);
                        break;

                    case 'Automatico/Sequenziale':
                        $Cambio_take = 'Automatico';
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Cambio_take,$conn);
                        break;

                    default:
                        $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$output,$conn);
                        break;
                }
            }
            if (($Meta_Num == '6') or ($Meta_Num == '7') or ($Meta_Num == '8') or ($Meta_Num == '21') or ($Meta_Num == '13') or ($Meta_Num == '28') or ($Meta_Num == '17') or ($Meta_Num == '31') or ($Meta_Num == '30')) {}else {$DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$output,$conn);}
            $Meta_Num++;
        }

        $countdown_macchine++;
        ob_end_flush();

    } else {
        if (ob_get_level() == 0) ob_start();
        echo "Veicolo già esistente" . "<br>";
        flush();
        ob_flush();
        ob_end_flush();
        $conto_macchine--;
    }

}
?>