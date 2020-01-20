<?php
function setup_row ($csv) {
    $time = 0;
        foreach ($csv as $check) {
            if ($time == 2) {
                foreach ($check as $y) {
                $split = explode(";", $y);
                $marca = array_search('Marca', $split);
                $codice = array_search('Codice', $split);
                $modello = array_search('Modello/Versione', $split);
                $colore = array_search('Colore', $split);
                $cilindrata = array_search('Cilindrata', $split);
                $km = array_search('Km', $split);
                $porte = array_search('Porte', $split);
                $immatricolazione = array_search('Data 1 imm', $split);
                $accessori = array_search('Accessori', $split);
                $iva = array_search('IVA', $split);
                $venditaprivati = array_search('Prezzo vendita Privati', $split);
                $nrfoto = array_search('Nr.Foto', $split);
                $kw = array_search('KW', $split);
                $cv = array_search('CV', $split);
                $alimentazione = array_search('Alimentazione', $split);
                $posti = array_search('Posti', $split);
                $cambio = array_search('Cambio', $split);
                $neopatentati = array_search('Neo Patentati', $split);
                $numproprietari = array_search('Num Proprietari', $split);
                $ultimarevisione = array_search('Ultima revisione', $split);
                $pubweb = array_search('PubWeb', $split);
                $trazione = array_search('Trazione', $split);
                $id_interno = array_search('Id interno', $split);
                $destinazione = array_search('Destinazione', $split);
                $targa = array_search('Targa', $split);
                $array = array(
                'marca' => $marca,
                'codice' => $codice,
                'modello' => $modello,
                'colore' => $colore,
                'cilindrata' => $cilindrata,
                'km' => $km,
                'porte' => $porte,
                'immatricolazione' => $immatricolazione,
                'accessori' => $accessori,
                'iva' => $iva,
                'venditaprivati' => $venditaprivati,
                'nrfoto' => $nrfoto,
                'kw' => $kw,
                'cv' => $cv,
                'alimentazione' => $alimentazione,
                'posti' => $posti,
                'cambio' => $cambio,
                'neopatentati' => $neopatentati,
                'numproprietari' => $numproprietari,
                'ultimarevisione' => $ultimarevisione,
                'pubweb' => $pubweb,
                'trazione' => $trazione,
                'id_interno' => $id_interno,
                'destinazione' => $destinazione,
                'targa' => $targa
            );
                return $array;
            }
            }else{$time++;}
        }
}
function setup_row_aziendale ($csv) {
    $time = 0;
        foreach ($csv as $check) {
            if ($time == 2) {
                foreach ($check as $y) {
                $split = explode(";", $y);
                $tipo = array_search('Tipo', $split);
                $stato = array_search('Stato', $split);
                $Rifto = array_search('Rif.to', $split);
                $Modello = array_search('Modello', $split);
                $Versione = array_search('Versione', $split);
                $Colore = array_search('Colore', $split);
                $Kw = array_search('Kw', $split);
                $immatricolazione = array_search('Data Imm', $split);
                $iva = array_search('IVA', $split);
                $costo_totale = array_search('Prezzo di vendita', $split);
                $Km_Percorsi = array_search('Km Percorsi', $split);
                $ultima_valutazione = array_search('Data ultima val.', $split);
                $targa = array_search('Targa', $split);
                $array = array(
                'tipo' => $tipo,
                'stato' => $stato,
                'Rifto' => $Rifto,
                'modello' => $Modello,
                'versione' => $Versione,
                'colore' => $Colore,
                'kw' => $Kw,
                'iva' => $iva,
                'immatricolazione' => $immatricolazione,
                'costo_totale' => $costo_totale,
                'km_percorsi' => $Km_Percorsi,
                'ultima_valutazione' => $ultima_valutazione,
                'targa' => $targa
            );
                return $array;
            }
            }else{$time++;}
        }
}
function check_veicolo($interno, $conn ) {
    $Query_ID = "SELECT meta_value from wp_postmeta where meta_value='$interno' and meta_key='id_interno'";
    $ID = $conn->query($Query_ID);
    if ($ID->num_rows > 0) {
        while($row = $ID->fetch_assoc()) {
            $Term_ID = $row["term_id"];
        }
        return true;
     } else {
        return false;
    }
}
function check_veicolo_aziendale($targa, $conn ) {
    $Query_ID = "SELECT meta_value from wp_postmeta where meta_value='$targa' and meta_key='wpcm_targa'";
    $ID = $conn->query($Query_ID);
    if ($ID->num_rows > 0) {
        return true;
     } else {
        return false;
    }
}
?>