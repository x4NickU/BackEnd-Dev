<?php
function data_setup ($data_immatricolazione){

    $mese_dictionary = array (
        'gen' => '01',
        'feb' => '02',
        'mar' => '03',
        'apr' => '04',
        'mag' => '05',
        'giu' => '06',
        'lug' => '07',
        'ago' => '08',
        'set' => '09',
        'ott' => '10',
        'nov' => '11',
        'dic' => '12'
    );
    $data_split = explode("-", $data_immatricolazione);
    $mese_input = $data_split[0];
    $anno_input = $data_split[1];
    $mese_output = $mese_dictionary[$mese_input];
    $anno_output = '20' . $anno_input;
    $data_output = $anno_output . "-" . $mese_output;
    return $data_output;
}
function aziendale_setup ($data_immatricolazione) {
    $data_split = explode("/", $data_immatricolazione);
    $giorno_input = $data_split[0];
    $mese_input = $data_split[1];
    $anno_input = $data_split[2];
    $data_output = $anno_input . "/" . $mese_input . "/" . $giorno_input;
    return $data_output;
}
?>