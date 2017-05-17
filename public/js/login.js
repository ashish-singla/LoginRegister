 $(document).on("keypress", '#loginPassword', function(e) {
    if(e.keyCode == 13) {
          if($('#loginBtn').is(':disabled')==false) {
            validateLoginForm();
          } 
    }      
  });
  $(document).on("keypress", '#modelPasswordLogin', function(e) {
    if(e.keyCode == 13) {
          if($('#modalLoginBtn').is(':disabled')==false) {
            validateLogin('#modalLoginForm');
          } 
    }      
  }); 
  $(document).ready(function(){
    $('.loading').addClass('hide');
    $("#frogetBtn").attr('disabled', false); 
   });

  var validEmail=false;
  function validateLogin(formId)  {
  resetErrors ();
  var loginEmail; 
  var loginPassword;  
  var errorEmail;
  var errorPassword;
  var loader;

 if (formId === '#modalLoginForm') {
    $('#modalLoginBtn').attr('disabled', true);
    loginEmail = $('#modalEmailLogin').val();
    loginPassword = $('#modelPasswordLogin').val();
    errorEmail = '#errorEmailLogin';
    errorPassword='#errorModelLoginPassword';
    loader='#modalLoginFormLoader';
  }

  if (loginEmail === '') {
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('Please Enter Email');
    return false;
  } else if ( !validateEmail(loginEmail) ) {
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('Please enter valid Email');
    return false;
  } else if ( validEmail === false ) {
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('This Email Id is not registered');
    return false;
  } else if (loginPassword === '') {
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorPassword).text('Please Enter Password');
    return false;
  } else{
      $(loader).removeClass('hide');
       $.ajax({
        url: '/checkLogin',
          method: 'POST',
          data: {
              'Email': loginEmail,
              'pass':  loginPassword
          },
          success: function(data){
            console.log(data);
          if(data[0].length==0){
              $(loader).addClass('hide');
              $(errorPassword).text('Password does not match');
          }
          else{
            $(errorPassword).text(' ');
            
          }
          },
          dataType: 'JSON',
      });    
  }
}

function validateLoginForm(){
  var isEmail = $("#loginEmail").val();     
  var loginPassword =$("#loginPassword").val();  
  var errorEmail= $('#errorEmail');
  var  errorPassword = '#errorLoginPassword';
  if(isEmail.trim() === '') {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorEmail).text('Please Enter Email');
    return false;
  } else if (loginPassword.trim() === '') {
    $("#loginBtn").removeAttr('disabled');
    $('#modalLoginBtn').removeAttr('disabled');
    $(errorPassword).text('Please Enter Password');
    return false;
  }
  else{
    $('.loading').removeClass('hide');
       $.ajax({
        url: '/checkLogin',
          method: 'POST',
          data: {
              'Email': isEmail,
              'pass':  loginPassword
          },
          success: function(data){
            $('.loading').addClass('hide');
            console.log(data,'data');
          if(!data.result){
              $(errorPassword).text('username/password does not match');
          }
          else{
            window.location.href='/client';
          }
          },
          dataType: 'JSON',
      });    
  }

}

var emailValidate = function (email, form) {
  var isEmail = $(email).val();     
  var errorMsgId;
  var successMsgId;
 if (form === 'loginForm') {
    errorMsgId = '#errorEmail';
    successMsgId = '#successEmail';
  } else if (form === 'registerForm') {
    errorMsgId = '#errorEmailR';
  } else if (form === 'modalLoginForm') {
    errorMsgId = '#errorEmailLogin';
    successMsgId = '#successEmailLogin';
  } else if (form === 'modalForgetEmail') {
    errorMsgId = '#errorForgetEmail';
  }
  if(isEmail == "") {
    $(errorMsgId).text('Please Enter Email');
    return false;
  }
  if (form==='registerForm' && (!validateEmail(isEmail)) ) {
   $(errorMsgId).text('Please enter valid Email');
    return false;
  } 
  if (form === 'registerForm') {
    $('.loading').removeClass('hide');
      $.ajax({
        url: '/checkEmail',
          method: 'POST',
          data: {
              'Email': isEmail
          },
          success: function(data){console.log(data[0],'asdddddddddddddddd');
            $('.loading').addClass('hide');
             if(data[0]){
               $(errorMsgId).text('This Email Id is already registered');
               validEmail = false;
               return false;
             }else{
              $(errorMsgId).text('');
              validEmail = true;
              return true;
             }
          },
          dataType: 'JSON',
      });   
  }  
  else if(form === 'loginForm' || form === 'modalLoginForm'){
    $('.loading').removeClass('hide');
      $.ajax({
        url: '/checkEmail',
          method: 'POST',
          data: {
              'Email': isEmail
          },
          success: function(data){
            $('.loading').addClass('hide');
             if(data[0][0].isValidated==-10){
               $(errorMsgId).text('This Email Id is not registered');
               if(form === 'loginForm')
               $("#loginBtn").attr('disabled', true);
                /*else if(form === 'modalForgetEmail')
                 $("#frogetBtn").attr('disabled', true); */
                 validEmail= false;
                return false;
             }
             else{
                $(errorMsgId).text(' ');
                $("#loginBtn").attr('disabled',false);
               /* $("#frogetBtn").attr('disabled', false);*/
                validEmail= true;
                return true;
             }
          },
          dataType: 'JSON',
      });   
  } else if(form === 'modalForgetEmail'){
    //$('.loading').removeClass('hide');
      $.ajax({
        url: '/checkEmail',
          method: 'POST',
          data: {
              'Email': isEmail
          },
          success: function(data){
            //$('.loading').addClass('hide');
             if(data[0][0].isValidated==-10){
               $(errorMsgId).text('This Email Id is not registered');
               /*if(form === 'loginForm')
               $("#loginBtn").attr('disabled', true);
                else*/ if(form === 'modalForgetEmail')
                 $("#frogetBtn").attr('disabled', true); 
                 validEmail= false;
                return false;
             }
             else{
                $(errorMsgId).text(' ');
                /*$("#loginBtn").attr('disabled',false);*/
                $("#frogetBtn").attr('disabled', false);
                validEmail= true;
                return true;
             }
          },
          dataType: 'JSON',
      });   
  }
  
}

  function validateRegister(){
    resetErrors ();
    var emailR=$('#registerEmail').val().trim();
    var registerPassword=$('#registerPassword').val().trim();
    var confirmRegisterPassword=$('#confirmRegisterPassword').val().trim();
    var address1=$('#address1').val().trim();
    var address2=$('#address2').val().trim();
    var address3=$('#address3').val().trim();
    var state=$('#state').val();
    var city=$('#city').val().trim();
    var pincode=$('#pincode').val().trim();
    var contactno=$('#contactno').val().trim();
    var contactperson=$('#contactperson').val().trim();
    $('#loginEmail').val('');
    $('#errorEmail').text('');
    $('#errorPassword').text('');
    $('#loginPassword').val();

    if (contactperson === '') {
      $('#contactperson').focus();
      $('#errorContactPerson').text('Please Enter Contact Person Name');
    } else if (emailR === '') {
        $('#registerEmail').focus();
        $('#errorEmailR').text('Please enter Email Id');
    } else if ( !validateEmail(emailR) ) {
      $('#registerEmail').focus();
      $('#errorEmailR').text('Please enter valid Email');
    } else if (registerPassword === '') {
      $('#registerPassword').focus();
      $('#errorRegisterPassword').text('Please enter Password');
    } else if ( registerPassword !== '' && (!(passwordValidate(registerPassword))) ) {
      $('#registerPassword').focus();
     $('#errorRegisterPassword').text('Atleast 6 and maximum 15 characters');
    } else if (confirmRegisterPassword === '') {
      $('#confirmRegisterPassword').focus();
      $('#errorConfirmPassword').text('Please enter Confirm Password');
    } else if ( !(confirmpassword(registerPassword,confirmRegisterPassword)) ) {
      $('#confirmRegisterPassword').focus();
      $('#errorConfirmPassword').text('Password not matched');
    } else if (address1 === '') {
      $('#address1').focus();
      $('#errorAddress').text('Please Enter Addresss');
    } else if (pincode === '') {
      $('#pincode').focus();
      $('#errorPincode').text('Please enter Pincode');
    } else if (pincode.length < 6) {
      $('#pincode').focus();
      $('#errorPincode').text('Enter valid Pincode');
    } else if (pincode.length > 6) {
      $('#pincode').focus();
      $('#errorPincode').text('Enter valid Pincode');
    } else if (!pincode.match(/^[0-9]+$/)) {
      $('#pincode').focus();
      $('#errorPincode').text('Enter valid Pincode');
    } else if (state === '') {
      $('#state').focus();
      $('#errorState').text('Please Select State ');
    } else if (city === '') {
      $('#city').focus();
      $('#errorCity').text('Please Select City');
    } else if (contactno === '') {
      $('#contactno').focus();
      $('#errorContact').text('Please Enter Contact No.');
    } else if (!contactno.match(/^[0-9]+$/)) {
      $('#contactno').focus();
      $('#errorContact').text('Enter valid Contact No');
    } else if (contactno.length < 10) {
      $('#contactno').focus();
      $('#errorContact').text('Enter 10 digit Contact No.');
    } else if (contactno.length > 10) {
      $('#contactno').focus();
      $('#errorContact').text('Enter 10 digit Contact No.');
    } else if($("#companyType").val()==""){
      $('#industryType').focus();
      $('#errorComapnyName').text('Please Select Company Type');
    } else if(validEmail == false) {
        $('#registerEmail').focus();
        $('#errorEmailR').text('This Email Id is already registered');
    } else if(validEmail == true){ 
            $('.loading').removeClass('hide');
               $.ajax({
                url: '/clientRegisteration',
                  method: 'POST',
                  data: {
                    email: emailR,
                    password: registerPassword,
                    address1: address1,
                    address2: address2,
                    address3: address3,
                    state: state,
                    city: city,
                    pincode: pincode,
                    contactno: contactno,
                    name: contactperson
                  },
                  success: function(data){
                    $('.loading').addClass('hide');
                    console.log(data,'data');
                  if(!data.result){
                      $(errorPassword).text('Please try again');
                  }
                  else{
                    window.location.href='/client';
                  }
                  },
                  dataType: 'JSON',
              }); 
            resetSignUp();
        }
  }
  function resetErrors(){
  $('#errorEmail').text('');
  $('#errorLoginPassword').text('');
  $('#errorEmailR').text('');
  $('#errorRegisterPassword').text('');
  $('#errorConfirmPassword').text('');
  $('#errorAddress').text('');
  $('#errorCountry').text('');
  $('#errorState').text('');
  $('#errorCity').text('');
  $('#errorPincode').text('');
  $('#errorContact').text('');
  $('#errorContactPerson').text('');
  $('#errorCompany').text('');
  $('#errorIndustryType').text('');
  $('#errorComapnyName').text('');
  $('#errorEmailLogin').text('');
  $('#successEmailLogin').text('');
  $('#errorForgetEmail').text('');
  $('#successForgetEmail').text('');
  $('#successForgetEmail').text('');
  $('#errorDirectorName').text('');
}

var resetSignUp = function() {
  var emailR=$('#registerEmail').val('');
    var registerPassword=$('#registerPassword').val('');
    var confirmRegisterPassword=$('#confirmRegisterPassword').val('');
    var address1=$('#address1').val('');
    var address2=$('#address2').val('');
    var address3=$('#address3').val('');
    var state=$('#state').val('');
    var city=$('#city').val('');
    var pincode=$('#pincode').val('');
    var contactno=$('#contactno').val('');
    var contactperson=$('#contactperson').val('');
    var company=$('#company').val('');
    $('#modalEmailLogin').val('');
    $('#modelPasswordLogin').val('');
    $('#forgetEmail').val('');
}
function showHideRadio(id1,id2,value){
  if($("#"+id2).hasClass("fa-check-circle-o")){
    $("#"+id2).removeClass("fa-check-circle-o");
  }
  if($("#"+id2).hasClass("fa-circle-o")==false){
      $("#"+id2).addClass("fa-circle-o");
  }
  if($("#"+id1).hasClass("fa-circle-o")==true){
      $("#"+id1).removeClass("fa-circle-o");
  }
  if($("#"+id1).hasClass("fa-check-circle-o")==false){
     $("#"+id1).addClass("fa-check-circle-o");
  }
  $("#companyType").val(value);
}
function validateForgetEmail(){
  var emailForget=$('#forgetEmail').val();
  if(emailForget === '') {
     $('#forgetEmail').focus();
    $('#errorForgetEmail').text('Please Enter Email');
    $("#frogetBtn").attr('disabled', false);   
    return false;
  } else if ( !validateEmail(emailForget) ) {
      $('#forgetEmail').focus();
      $('#errorForgetEmail').text('Please enter valid Email');
      return false;
  } else {
  $('#errorForgetEmail').text('');  
  //emailValidate('#forgetEmail', 'modalForgetEmail');
  $("#frogetBtn").attr('disabled', true);   
  $('.loading').removeClass('hide');
  //$('#loaderForgetP').removeClass('hide');
  //$('#loader').removeClass('hide');
    $.ajax({
          url: '/forgotPassword',
            method: 'POST',
            data: {
                'Email':$("#forgetEmail").val()
            },
            success: function(data){
               
               //$('#loaderForgetP').addClass('hide');
               $('.loading').addClass('hide');
               if(data.value == 1) {
               $('#frogetBtn').attr('disabled', true);
               $('#successForgetEmail').text('window close automatically in 2 minute use this url to reset password due to not using mail service: '+ data.msg);
               setTimeout(function(){
                $('#forgetEmail').val('');
                $('#frogetBtn').attr('disabled', false);
                resetErrors();
                closeModal('#forgetModalClose');
               },20000);
             } else if(data.value == 3) {
               $('#frogetBtn').attr('disabled', false);
               $('#errorForgetEmail').text('This Email Id is not registered');
             } else {
               $('#frogetBtn').attr('disabled', false);
               $('#errorForgetEmail').text('Please try again later');
             }
            },
            dataType: 'JSON',
   });
 }   
}
var passwordValidate = function (password) {
  if(password.length < 6 || password.length > 15){
    return false;
  }
  else{
    return true;
  }
}
var confirmpassword = function (password, confirmpassword) {
  if (password === confirmpassword) {
    return true;
  } else {
    return false;
  }
}