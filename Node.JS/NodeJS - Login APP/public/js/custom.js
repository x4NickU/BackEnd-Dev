sessionStorage.setItem("round", 0);
var arr = [];
sessionStorage.setItem("Totals", JSON.stringify(arr));
function addRecord() {
    var preRound = sessionStorage.getItem("round");
    var _round = preRound + 1;
    var text = document.getElementById('text').value;
    var _id = 'button' + _round;
    var _form = 'form' + _round;
    var _id = 'value' + _form;
    var buttonHTML = "<button type='button' class='btn btn-outline-dark pulsante' id='"+_id+"'><span class='label-input100'>Composition name: "+text+"</span></button>";
    $('#addButton').append(buttonHTML);
    var button = document.getElementById(_id);
    button.onclick = () => {
        openForm(_form);
    }
    sessionStorage.setItem("round", _round);
    sessionStorage.setItem(_id, text);
    document.getElementById('text').value = "";
}

function openForm(formID) {
    var metriQuadri = 'metri' + formID;
    var priceHR = 'price' + formID;
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
        var brandID = 'brand' + formID;
        // print dei prodotti con nome + prezzo + seriale
        var formHTML = "<div id='"+formID+"' class='w-full dis-none js-show-service' style='text-align: center;margin-top:1em'>" +
        "<span style='font-size:16px'class='label-input100'>Form Name  "+test+"</span>" + 
        "<select style='margin-top:2em' name='"+presetID+"' id='"+presetID+"' class='form-control input-lg'>" + 
        "<option value=''>Select Preset</option>" + 
        "</select>" + 
        "<br />" + 
        "<select name='"+brandID+"' id='"+brandID+"' class='form-control input-lg'> " +
         "<option value=''>Brand</option>" +
        "</select>" + 
        "<br />" + 
        "<div id='productlist' class='productlist'></div>" +
        "<div style='margin:auto;margin-top:1em;width:50%' class='wrap-input100 validate-input'>" + 
        "<input class='input100' style='height:1em' type='text' class='"+metriQuadri+"' id='"+metriQuadri+"' name='"+metriQuadri+"' placeholder='MQ'>"  + 
        "<span class='focus-input100'></span>" + 
        "</div>" + 
        "<div style='margin:auto;margin-top:1em;width:50%' class='wrap-input100 validate-input'>" + 
        "<input class='input100' style='height:1em' type='text' class='"+priceHR+"' id='"+priceHR+"' name='"+priceHR+"' placeholder='€ /hr'>"  + 
        "<span class='focus-input100'></span>" + 
        "</div>";
        $('#Set').append(formHTML);
        $('#' + formID).slideDown();
        sessionStorage.setItem(formID, 'open');
        var html_code = '';
        axios.post('/app/application', {
            case: 'select'
          })
          .then(function (response) {
            var data = JSON.parse(response.data.data);
            data.forEach(rows => {
                html_code += '<option value="'+rows.name+'">'+rows.name+'</option>';
            });
            $("#"+presetID+"").html(html_code)
            var selectPreset = document.getElementById(presetID);
            selectPreset.onchange = () => {
                
                setBrand(brandID,selectPreset,formID,data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }
    
}
function setBrand(brandID,selectPreset,formID,data){
    var selectValue = selectPreset.value;
    var brandValue = document.getElementById(brandID);
    var html_code = "";
    data.forEach(element => {
        if(element.name == selectValue) {
            element.set.forEach(brand => {
                html_code += '<option value="'+brand[0]+'">'+brand[0]+'</option>';
            })
        }
    $("#"+brandID+"").html(html_code);
    brandValue.onchange = () => {
        setProductList(data,formID,brandValue,selectPreset);
        }
    })
}

function setProductList(composition,formID,brandValue,selectPreset) {
    var brandValue = brandValue.value;
    var productCount = 0;
    var html_product = '';
    var itemSerial = [];
    document.getElementById(formID).getElementsByClassName('#productlist').innerHTML = "";
    composition.forEach(rows => {
        rows.set.forEach(array => {
            if (array[0] == brandValue && rows.name == selectPreset.value) {
                var preArray = [];
                array.forEach(data => {
                    if(array[0] == data) return;
                    itemSerial.push(data);
                })   
            }
        })
    })
    axios.post('/app/application', {
        case: 'getProducts',
        items: JSON.stringify(itemSerial)
      })
      .then(function (response) {

        if (response.data.donuts == "empty") {
            html_product += '<span style="font-size:12px" class="label-input100">Error</span><br />';$("#"+formID+"").children("#productlist").html(html_product);
            return
        } 

        console.log(response.data.donuts);
        var data = JSON.parse(response.data.donuts);
        console.log(data);
        var total_price = 0;
        data.forEach(rows => {
            //var productID = 'product' + productCount;
            html_product += '<span style="font-size:14px;margin-top:1em" class="label-input100">Serial: '+rows.serial+'</span><br />';
            html_product += '<span style="font-size:12px" class="label-input100">Name: '+rows.name+'</span><br />';
            html_product += '<span style="font-size:12px" class="label-input100">Price: '+rows.price+'</span><br />';
            //productCount++;
            var toFloat = parseFloat(rows.price);
            total_price += toFloat;
        });
        var totals = {formID : formID, total : total_price};
        var sess = sessionStorage.getItem("Totals")
        var arr = JSON.parse(sess);
        console.log(arr);
        arr.push(totals);
        console.log(arr);
        var obj = JSON.stringify(arr);
        sessionStorage.setItem("Totals", obj);

        var x = total_price.toString();
        html_product += '<span style="font-size:16px"  class="label-input100">Total price: '+x+'</span><br />';

        $("#"+formID+"").children("#productlist").html(html_product);
      })
      .catch(function (error) {
        console.log(error);
      });
}
// Check all price session and sum all [[formid][money]]
function calculateTotal() {
    var sess = sessionStorage.getItem("Totals");
    var totals = JSON.parse(sess);
    console.log(totals)
    var priceTotal = 0;
    totals.forEach(obj => {
        priceTotal += obj.total;
    });
    document.getElementById("totals").innerHTML = "Total: " + priceTotal + "€";
}

// What's next? mh... mettere dropdown con contenuto tutte le composizioni, un altro per le marche, input mq(fatto bene), input costo /hr, finire il pulsante per il submit
// Pannello admin per aggiungere composizioni, prodotti
// Composizioni best idea -> [[marca,codice1,codice2,codice3 bla bla],[],[],[],[]]