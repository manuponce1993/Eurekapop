 $("document").ready(function () {
    var $carousel = $('#multi-carousel-events');
    $carousel.carousel({
        cycle: true
    });
    var handled=false;//global variable

    $carousel.bind('slide.bs.carousel', function (e) {
        var current=$(e.target).find('.item.active');
        var indx=$(current).index();
        if((indx+2)>$('.carousel-indicators li').length)
            indx=-1
         if(!handled)
         {
            $('.carousel-indicators li').removeClass('active')
            $('.carousel-indicators li:nth-child('+(indx+2)+')').addClass('active');
         }
        else
         {
            handled=!handled;//if handled=true make it back to false to work normally.
         }
    });

    $(".carousel-indicators li").on('click',function(){
       //Click event for indicators
       $(this).addClass('active').siblings().removeClass('active');
       //remove siblings active class and add it to current clicked item
       handled=true; //set global variable to true to identify whether indicator changing was handled or not.
    });

    $('#carta-facebook').on('mouseenter', function () {
        $('#carta-facebook span').addClass('facebook')
        $('#carta-facebook p').addClass('facebook')
    }).on('mouseleave', function () {
        $('#carta-facebook span').removeClass('facebook')
        $('#carta-facebook p').removeClass('facebook')
    })

    $('#carta-instagram').on('mouseenter', function () {
        $('#carta-instagram span').addClass('instagram')
        $('#carta-instagram p').addClass('instagram')
    }).on('mouseleave', function () {
        $('#carta-instagram span').removeClass('instagram')
        $('#carta-instagram p').removeClass('instagram')
    })

    $('#carta-twitter').on('mouseenter', function () {
        $('#carta-twitter span').addClass('twitter')
        $('#carta-twitter p').addClass('twitter')
    }).on('mouseleave', function () {
        $('#carta-twitter span').removeClass('twitter')
        $('#carta-twitter p').removeClass('twitter')
    })

    $('#carta-youtube').on('mouseenter', function () {
        $('#carta-youtube span').addClass('youtube')
        $('#carta-youtube p').addClass('youtube')
    }).on('mouseleave', function () {
        $('#carta-youtube span').removeClass('youtube')
        $('#carta-youtube p').removeClass('youtube')
    })

    $(".modal-booking").on('hidden.bs.modal', function(event) {
        event.preventDefault();
        $(".booking-fotos").hide()
        $(".booking-videos").hide()
    });

    $(".modal-booking").on('shown.bs.modal', function(event) {
        event.preventDefault();
        $(".booking-fotos").show("")
        $(".booking-videos").hide("")
    });

    $(".booking-btn-videos").on('click', function(event) {
        event.preventDefault();
        $(".booking-fotos").hide("slow")
        $(".booking-videos").show("slow")
    });

    $(".booking-btn-fotos").on('click', function(event) {
        event.preventDefault();
        $(".booking-videos").hide("slow")
        $(".booking-fotos").show("slow")
    });

    $('.btn-booking-mas-videos').on('mouseenter', function(event) {
        event.preventDefault();
        $(this).addClass('mas-videos-youtube')
    }).on('mouseleave', function(event) {
        event.preventDefault();
        $(this).removeClass('mas-videos-youtube')
    });;

    $('#formularioContacto').on('submit', function(event) {
        event.preventDefault();
        var nombre = $('#name-form1-7').val();
        var email = $('#email-form1-7').val();
        var tel = $('#phone-form1-7').val();
        var msj = $('#message-form1-7').val();
        var body = 'Nombre: '+nombre+'<br>Mail: '+email+'<br>Teléfono: '+tel+'<br>Mensaje: '+msj;
        $('#btnEnviar').val('Enviando...');
        $('#btnEnviar').prop('disabled', 'disabled');
        setTimeout(function () { }, 5000);
        Email.send({
            Host : "eurekapop.com.ar",
            Username : "",
            Password : "",
            To : 'contacto@eurekapop.com.ar',
            From : 'consultas@eurekapop.com.ar',
            Subject : "Consulta de formulario",
            Body : body
        }).then(function () {
            $('#btnEnviar').text('Enviar');
            $('#btnEnviar').removeAttr('disabled');
            swal("Enviado!","Te responderemos a la brevedad","success");
            $('#formularioContacto').trigger("reset");
        }, function () {
            $('#btnEnviar').text('Enviar');
            $('#btnEnviar').removeAttr('disabled');
            swal("Error!","No se ha podida enviar el mensaje","error");
            $('#formularioContacto').trigger("reset");
        })
        return false;
    });
})



let modalId = $('#image-gallery');

$(document)
  .ready(function () {

    loadGallery(true, 'a.thumbnail');

    //This function disables buttons when needed
    function disableButtons(counter_max, counter_current) {
      $('#show-previous-image, #show-next-image')
        .show();
      if (counter_max === counter_current) {
        $('#show-next-image')
          .hide();
      } else if (counter_current === 1) {
        $('#show-previous-image')
          .hide();
      }
    }

    /**
     *
     * @param setIDs        Sets IDs when DOM is loaded. If using a PHP counter, set to false.
     * @param setClickAttr  Sets the attribute for the click handler.
     */

    function loadGallery(setIDs, setClickAttr) {
      let current_image,
        selector,
        counter = 0;

      $('#show-next-image, #show-previous-image')
        .click(function () {
          if ($(this)
            .attr('id') === 'show-previous-image') {
            current_image--;
          } else {
            current_image++;
          }

          selector = $('[data-image-id="' + current_image + '"]');
          updateGallery(selector);
        });

      function updateGallery(selector) {
        let $sel = selector;
        current_image = $sel.data('image-id');
        $('#image-gallery-title')
          .text($sel.data('title'));
        $('#image-gallery-image')
          .attr('src', $sel.data('image'));
        disableButtons(counter, $sel.data('image-id'));
      }

      if (setIDs == true) {
        $('[data-image-id]')
          .each(function () {
            counter++;
            $(this)
              .attr('data-image-id', counter);
          });
      }
      $(setClickAttr)
        .on('click', function () {
          updateGallery($(this));
        });
    }
  });

// build key actions
// $(document)
//   .keydown(function (e) {
//     switch (e.which) {
//       case 37: // left
//         if ((modalId.data('bs.modal') || {})._isShown && $('#show-previous-image').is(":visible")) {
//           $('#show-previous-image')
//             .click();
//         }
//         break;

//       case 39: // right
//         if ((modalId.data('bs.modal') || {})._isShown && $('#show-next-image').is(":visible")) {
//           $('#show-next-image')
//             .click();
//         }
//         break;

//       default:
//         return; // exit this handler for other keys
//     }
//     e.preventDefault(); // prevent the default action (scroll / move caret)
//   });
