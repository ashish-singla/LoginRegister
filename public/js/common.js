'use strict';

//Make sure jQuery has been loaded before common.js
if (typeof jQuery === "undefined") {
  throw new Error("service requires jQuery");
}

$.modal.defaults = {
  closeExisting: false,    // Close existing modals. Set this to false if you need to stack multiple modal instances.
  escapeClose: false,      // Allows the user to close the modal by pressing `ESC`
  clickClose: false,       // Allows the user to close the modal by clicking the overlay
  closeText: 'Close',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: false,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

var closeModal = function (modalId) {
  $(modalId).click();
}

/* this function take email and check for pattern */
var validateEmail = function (email) {
  var expr = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
  return expr.test(email);
};

/* function is used to show 2 icon and hide rest 2. function will also insert value in object */


$("#dropdownMenu").hover(function(){
    $("#dropdownMenuLi").addClass("open");
});
$("#dropdownMenuLi").mouseout(function(){
    $("#dropdownMenuLi").removeClass("open");
});
setTimeout(function(){
	$(".delayClass").removeClass('hide');
},100);

    $(function(){
    $(".dropdown").hover(            
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeIn("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
            },
            function() {
                $('.dropdown-menu', this).stop( true, true ).fadeOut("fast");
                $(this).toggleClass('open');
                $('b', this).toggleClass("caret caret-up");                
            });
    });
function logout(){
   $.ajax({
    url: '/logout',
      method: 'POST',
      success: function(data){
            window.location.href='/';
      },
      dataType: 'JSON',
  });         
}    