



(function ($) {
    "use strict";
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if(
            $(input).attr('name') == 'name' || 
            $(input).attr('name') == 'subname'
            ) {
                if($(input).val().trim().match(/^([a-z]{1,6}[ ']){0,3}([ÉÈÊËÜÛÎÔÄÏÖÄÅÇA-Z]{1}[éèëêüûçîôâïöäåa-z]{2,}[- ']){0,3}[A-Z]{1}[éèëêüûçîôâïöäåa-z]{2,}$/) == null) {
                    return false;
                }else{
                    return true;
                }
            } else {
                if($(input).val().trim() == ''){
                    return false;
                }
        }              
        if($(input).attr('name') == 'username') {
                if($(input).val().trim().match(/[^A-Za-z0-9]/) == null) {
                    return true;
                }else{
                    return false;
                }
            } else {
                if($(input).val().trim() == ''){
                    return false;
                }
            }
            if($(input).attr('name') == 'email') {
                if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                    return false;
            } else {
                if($(input).val().trim() == ''){
                    return false;
                }
            }
        }   
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);