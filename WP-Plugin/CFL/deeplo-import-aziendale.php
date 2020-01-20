<?php
set_time_limit(0);
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
require_once plugin_dir_path( __FILE__  ) . 'settings/PHP_SETTINGS.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DB_QUERY.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATA_LIST.php';
require_once plugin_dir_path( __FILE__  ) . 'settings/DATE_SETUP.php';

function deeplo_import_aziendale($conn,$CSV_ARRAY,$pos_dato_aziendale,$DB_LastID,$conto_macchine,$countdown_macchine,$Meta_Num) {
$tipologia_macchina_check = $CSV_ARRAY[0];
$tipologia_macchina = "";
    switch ($tipologia_macchina_check) {
        case 'Vs/Vd':
            $tipologia_macchina = "Aziendale";
            break;
        case 'Km0':
            $tipologia_macchina = "Km0";
        default:
            # code...
            break;
    }

    $piccolo_test = $CSV_ARRAY[$pos_dato_aziendale['targa']];
    $check_prezzo = $CSV_ARRAY[$pos_dato_aziendale['costo_totale']];
    $controllo_veicolo_esistente = check_veicolo_aziendale($piccolo_test, $conn);
    //echo $check_prezzo . "<br>";
    if (($controllo_veicolo_esistente == false) and ($check_prezzo != "-")) {
        $km_percorsi = str_replace(",", "", $CSV_ARRAY[$pos_dato_aziendale['km_percorsi']]);
        if ($CSV_ARRAY[$pos_dato_aziendale['km_percorsi']] == "N/A") {
            $km_percorsi = '0';
        } else {}
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
            $tipologia_macchina,                        
            #'make' => 
            "0",
            #'model' => 
            "0",
            #'frdate'
            "2019-05-07",
            #'price' => 
            $output = str_replace(".", "", $CSV_ARRAY[$pos_dato_aziendale['costo_totale']]),
            #'body_style' => 10
            "0",
            #'trasmission' => 
            "",
            #'engine' => 
            "",
            #'color' =>
            $CSV_ARRAY[$pos_dato_aziendale['colore']],
            #'milleage' =>
            $km_percorsi,
            #'immatricolazione' =>
            $CSV_ARRAY[$pos_dato_aziendale['immatricolazione']],
            #'iva' =>
            $CSV_ARRAY[$pos_dato_aziendale['iva']],
            #'power_kw' =>
            $CSV_ARRAY[$pos_dato_aziendale['kw']],
            #'ultima_valutazione' =>
            $CSV_ARRAY[$pos_dato_aziendale['ultima_valutazione']],
            #'targa' =>
            $CSV_ARRAY[$pos_dato_aziendale['targa']],
            #Tipologia
            $tipologia_macchina
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
            'wpcm_color',
            'wpcm_mileage',
            'wpcm_immatricolazione',
            'wpcm_iva',
            'wpcm_power_kw',
            'wpcm_ultima_valutazione',
            'wpcm_targa',
            'tipologia'
        );
        $titolo_post = $CSV_ARRAY[$pos_dato_aziendale['versione']];
        $Post_Name_1 = str_replace([' ','.','-'],'',$titolo_post);
        $Post_Name = str_replace(['(',')','/','[',']','+',],'',$Post_Name_1);
        $guid = "http://localhost:8888/cfl/?post_type=wpcm_vehicle&#038;p=". $DB_LastID;
        $DB_POST_QUERY = DB_POST($DB_LastID, $titolo_post, $Post_Name, $guid, $conn);
        $CAR_COUNT = count($data);
        if (ob_get_level() == 0) ob_start();

        flush();
        ob_flush();

        foreach ($data as $meta) {  
                
            $output = preg_replace('/[^(\x20-\x7F)]*/','', $meta);
            /*
            echo "<br>";
            echo $prefix[$Meta_Num] . " : " . $output;
            echo "<br>";
			*/
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
                $Query_Nome_Marca = QUERY_NOME("NISSAN Aziendale/Km0",$conn);

                if ($Query_Nome_Marca->num_rows > 0) {

                    while($row = $Query_Nome_Marca->fetch_assoc()) {
                        
                        $Marca = $row["term_id"];
                        $DB_Marca_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Marca,$conn);
                    }
                } else {
                    $DB_INSERT_MARCA = QUERY_INSERT($Term_ID, "NISSAN Aziendale/Km0", $conn, 0);
                    $DB_Marca_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Term_ID,$conn);
                }
            } else {}
            if ($Meta_Num == '7') {
                $Query_Nome_Modello = QUERY_NOME($CSV_ARRAY[$pos_dato_aziendale['modello']],$conn);
                $Query_Nome_Marca = QUERY_CHECK("NISSAN Aziendale/Km0", $conn);
            
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
                    $DB_INSERT_MODELLO = QUERY_INSERT($Term_ID, $CSV_ARRAY[$pos_dato_aziendale['modello']], $conn, $Marca_Name);
                    $Query_Modello_Select = QUERY_CHECK($CSV_ARRAY[$pos_dato_aziendale['modello']], $conn);
                    $DB_Modello_Insert = QUERY_INSERT_2($DB_LastID,$VALORE,$Term_ID,$conn);
                    }
                } else {}
            if ($Meta_Num == '13') {
            $colore_deeplo = $CSV_ARRAY[$pos_dato_aziendale['colore']];
            $colore_deeplo = "$colore_deeplo";
            $check_colore = strstr($colore_deeplo, '(', true);
            $colore_sub = substr_replace($check_colore, "", -1);
            $Colore_Good = str_replace([' '],'-',$colore_sub);
            $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$Colore_Good,$conn);
            }
            if (($Meta_Num == '15') or ($Meta_Num == '8')) {
            $data_imm = aziendale_setup($CSV_ARRAY[$pos_dato_aziendale['immatricolazione']]);
            $DB_POSTMETA = QUERY_INSERT_2($DB_LastID, $VALORE,$data_imm,$conn);
            }
            if (($Meta_Num == '13') or ($Meta_Num == '15') or ($Meta_Num == '8') or ($Meta_Num == '7') or ($Meta_Num == '6')) {} else {
            $DB_POSTMETA = QUERY_INSERT_2 ($DB_LastID, $VALORE,$output,$conn);
            }
            $Meta_Num++;
        }

    $coutdown_macchine++;
    ob_end_flush();
    } else {
        if (ob_get_level() == 0) ob_start();
        echo "Veicolo già esistente" . "<br>";
        flush();
        ob_flush();
        ob_end_flush();
        $conto_macchine--;
    }
    //$test_output = "Caricamento Veicoli: " . $coutdown_macchine . "/" . $conto_macchine . "<br>";
}

?>
