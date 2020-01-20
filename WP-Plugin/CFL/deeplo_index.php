<?php
defined( 'ABSPATH' ) or die( 'Che ci fai qua?' );
// Upload file
$style = "";
if(isset($_POST['but_submit'])){
  $allowed =  array('csv');
  if($_FILES['file']['name'] != ''){
    $filename = $_FILES['file']['name'];
    $uploadedfile = $_FILES['file'];
    $ext = pathinfo($filename, PATHINFO_EXTENSION);
    if(!in_array($ext,$allowed) ) {
      $style = "style='display:none;'";
      include 'errore_file.php';
  }else{
    $upload_overrides = array( 'test_form' => false );

    $movefile = wp_handle_upload( $uploadedfile, $upload_overrides );
    $imageurl = "";
    $url = $movefile['file'];
    if ( $movefile && ! isset( $movefile['error'] ) ) {
      $url_file = "$url";
      require_once plugin_dir_path( __FILE__  ) . 'deeplo-import.php';
      $style = "style='display:none;'";
    } else {
       echo $movefile['error'];
    }
  }
}
}
?>
<html lang="en">
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
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>  </head>
  <body>
      <div class ="container-fluid" id="importer" <?php echo $style?>>
            <div class="jumbotron text-center" style="background-color:rgba(189, 195, 199,1.0)">
              <h1 class="display-4">Csv Importer</h1>
              <p class="lead">Questo plugin è stato sviluppato da Deeplo Working Group per l'importazione di file csv all'interno del car managment</p>
              <hr class="my-4">
            <div class="rounded; color:black">
              <p style="color:#2c3e50;background-color:rgba(52, 73, 94,0.05)" class="float-left rounded">1. Accettarsi di avere in possesso il file con estensione .csv
              in caso contrario, premere sul pulsante <a href="https://json-csv.com/xml" target=_blank><button type="button" class="btn btn-primary btn-sm">Clicca qua</button></a>
              </p>
              <br>
              <hr>
              <p style="color:#2c3e50;background-color:rgba(52, 73, 94,0.05)" class="float-left">2. All'interno del sito deve trascinare il file nello spazio corrispondente 
              e premere su converti file</p>
              <br>
              <hr>
              <p style="color:#2c3e50;background-color:rgba(52, 73, 94,0.05)" class="float-left">3. Una volta ottenuto il file con estensione .csv premere su carica file in fondo alla pagina</p>
              <br>
              <hr>
              <p style="color:#2c3e50;background-color:rgba(52, 73, 94,0.05)" class="float-left">4. Aspettare il messaggio di conferma</p>
              <br>
              <hr>
              <p style="color:#2c3e50;background-color:rgba(52, 73, 94,0.05)" class="float-left">5. Una volta arrivato il messaggio di conferma deve andare su Annunci auto sezione Aggiorna e aggiornare i modelli e marche</p>
              <br>
              <hr>
              <p class="float-right"> Deeplo Working Group </p>

              
            </div>
        </div>
        <div class="container">
        <div class="jumbotron" style="background-color:rgba(189, 195, 199,1.0)">
          <form method='post' action='' name='myform' enctype='multipart/form-data'>
            <div class="custom-file">
                <input type="file" class="custom-file-input" name="file" id="customFile">
                <label class="custom-file-label " for="customFile" style="width: 30%;margin-left:35%">Seleziona File .csv</label>
                <hr>
                <div class="text-center">
                  <input type="submit" class="btn btn-outline-dark" name="but_submit" value="Carica File" id="submit">              </div>
                </div>
          </form>
        </div>
      </div>
      </div>
  </body>