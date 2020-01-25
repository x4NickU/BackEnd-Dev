/*
    "<select name='city' id='city' class='form-control input-lg'>" + 
    "<option value=''>Select city</option>" + 
    "</select>" +
*/
sessionStorage.setItem("round", 0);
function addRecord() {
    var preRound = sessionStorage.getItem("round");
    var _round = preRound + 1;
    var text = document.getElementById('text').value;
    var _id = 'button' + _round;
    var _form = 'form' + _round;
    var buttonHTML = "<button type='button' class='btn btn-outline-dark pulsante' id='"+_id+"'><span class='label-input100'>Composition name: "+text+"</span></button>";
    $('#addButton').append(buttonHTML);
    var button = document.getElementById(_id);
    button.onclick = () => {
        preOpenForm(_form);
    }
    sessionStorage.setItem("round", _round);
    var _id = 'value' + _form;
    sessionStorage.setItem(_id, text);
    document.getElementById('text').value = "";
}

function openForm(formID, composition) {
    var metriQuadri = 'metri' + formID;
    var priceHR = 'price' + formID;    
    var brand = 'brand' + formID;

    console.log(composition);
    var check = document.getElementById(formID);
    if(check != null) {
        var mqValues = document.getElementById(formID).getElementsByClassName(metriQuadri).value;
        var priceValue = document.getElementById(formID).getElementsByClassName(priceHR).value;
        switch(sessionStorage.getItem(formID)) {
            case 'open':
                sessionStorage.setItem(priceHR, priceValue);
                sessionStorage.setItem(metriQuadri, mqValues);
                $('#' + formID).slideUp();
                sessionStorage.setItem(formID, 'close');
                break;
            case 'close':
                if (sessionStorage.getItem(metriQuadri)) {
                    mqValues = sessionStorage.getItem(mqValues);
                }
                $('#' + formID).slideDown();
                sessionStorage.setItem(formID, 'open');
                break;
                }
    }else{
        var _id = 'value' + formID;
        var test = sessionStorage.getItem(_id);
        var presetID = 'preset' + formID;
        var formHTML = "<div id='"+formID+"' class='w-full dis-none js-show-service'>" +
        "<span style='font-size:16px'class='label-input100'>Form Name  "+test+"</span>" + 
        "<select style='margin-top:2em' name='"+presetID+"' id='"+presetID+"' class='form-control input-lg'>" + 
        "<option value=''>Select Preset</option>" + 
        "</select>" + 
        "<br />" + 
        "<select name='brand' id='brand' class='form-control input-lg'> " +
         "<option value=''>Select Brand</option>" +
        "</select>" + 
        "<br />" + 
        "<div style='margin-top:2em;width:50%' class='wrap-input100 validate-input'>" + 
        "<input class='input100' style='height:1em' type='text' class='"+metriQuadri+"' id='"+metriQuadri+"' name='"+metriQuadri+"' placeholder='MQ'>"  + 
        "<span class='focus-input100'></span>" + 
        "</div>" + 
        "<div style='margin-top:2em;width:50%' class='wrap-input100 validate-input'>" + 
        "<input class='input100' style='height:1em' type='text' class='"+priceHR+"' id='"+priceHR+"' name='"+priceHR+"' placeholder='€ /hr'>"  + 
        "<span class='focus-input100'></span>" + 
        "</div>" + 
        "<div class='container-contact100-form-btn'>" + 
        "<button class='contact100-form-btn'>" + 
        "<span>" + 
        "Calculate total" + 
        "<i class='fa fa-long-arrow-right m-l-7' aria-hidden='true'></i>"+ 
        "</span>"+ 
        "</button>"+
        "</div>";
        $('#Set').append(formHTML);
        $('#' + formID).slideDown();
        sessionStorage.setItem(formID, 'open');
        var html_code = '';
        var totalNames = [];
       composition.forEach(row => {
            totalNames.push(row.name)
        });
        totalNames.forEach(data => {
            html_code += '<option value="'+data+'">'+data+'</option>';
        });
        console.log(html_code);
        $("#"+presetID+"").html(html_code);
    }
}

// What's next? mh... mettere dropdown con contenuto tutte le composizioni, un altro per le marche, input mq(fatto bene), input costo /hr, finire il pulsante per il submit
// Pannello admin per aggiungere composizioni, prodotti
// Composizioni best idea -> [[marca,codice1,codice2,codice3 bla bla],[],[],[],[]]