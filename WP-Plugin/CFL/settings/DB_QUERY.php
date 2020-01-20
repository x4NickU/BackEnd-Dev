<?php

function EDITLOCK_FIX($conn) {
    $EDITLOCK_FIX = "DELETE FROM wp_postmeta WHERE meta_key = '_edit_lock'";
    $ID = $conn->query($EDITLOCK_FIX);
} 

function POSTS_LAST_ID($conn) {
    $POSTS_ID = "SELECT ID from wp_posts where ID = (select MAX(ID) from wp_posts)";
    $ID = $conn->query($POSTS_ID);
    if ($ID->num_rows > 0) {
	    // output data of each row
	    while($row = $ID->fetch_assoc()) {
            $DB_LastID = $row["ID"];
            return $DB_LastID;
        }
    }
}
function DB_POST($DB_LastID, $CSV_ARRAY, $Post_Name, $guid, $conn){
    $DB_POST = "INSERT INTO wp_posts (ID, post_title, post_status, comment_status, ping_status, post_name, post_parent, guid, post_type) 
    VALUES ($DB_LastID, '$CSV_ARRAY', 'publish', 'closed', 'closed', '$Post_Name', '0', '$guid', 'wpcm_vehicle')";
    $DB_POST_QUERY = $conn->query($DB_POST);
    return $DB_POST_QUERY;
}
function QUERY_ID($conn) {
    $Query_ID = "SELECT term_id from wp_terms where term_id = (select MAX(term_id) from wp_terms)";
    $ID = $conn->query($Query_ID);
    return $ID;
}
function QUERY_NOME ($CSV_ARRAY,$conn) {
    $Query_Name_Term = "SELECT term_id from wp_terms where name = '$CSV_ARRAY'";
    $Query_Name_Check = $conn->query($Query_Name_Term);
    return $Query_Name_Check;
}
function QUERY_INSERT ($Term_ID, $CSV_ARRAY, $conn,$optional) {
    $DB_INSERT_MARCA = "INSERT INTO wp_terms (term_id,name,slug,term_group) VALUES ('$Term_ID', '$CSV_ARRAY', '$CSV_ARRAY',0)";
    $DB_INSERT_MARCA_VISIBLE = "INSERT INTO wp_term_taxonomy (term_taxonomy_id,term_id,taxonomy,description,parent,count) VALUES ('', '$Term_ID', 'wpcm_make_model', '', '$optional', '0')";
    $Query = $conn->query($DB_INSERT_MARCA);
    $Query = $conn->query($DB_INSERT_MARCA_VISIBLE);
}
function QUERY_INSERT_2 ($DB_LastID, $VALORE, $output,$conn) {
    $DB_POSTMETA = "INSERT INTO wp_postmeta (post_id,meta_key,meta_value) VALUES ('$DB_LastID', '$VALORE', '$output')";
    $Query = $conn->query($DB_POSTMETA);
    return $Query;
}
function QUERY_CHECK ($CSV_ARRAY,$conn) {
    $Query_Name_Marca = "SELECT term_id from wp_terms where name = '$CSV_ARRAY'";
    $Query_Name_Check_Marca = $conn->query($Query_Name_Marca);
    return $Query_Name_Check_Marca;
}

function deeplo_insert($output, $conn, $Opzione_Deeplo) {
    $Query_ID = "SELECT $Opzione_Deeplo from wp_deeplocar where $Opzione_Deeplo = '$output'";
    $ID = $conn->query($Query_ID);
    if ($ID->num_rows > 0) {
        while($row = $ID->fetch_assoc()) {
            $Term_ID = $row[$Opzione_Deeplo];
        }
        //echo "Si" . "<br>";
        //echo $Term_ID;
     } else {
        $DB_POSTMETA = "INSERT INTO wp_deeplocar ('$Opzione_Deeplo') VALUES ('$output')";
        $Query = $conn->query($DB_POSTMETA);
    }
}
?>