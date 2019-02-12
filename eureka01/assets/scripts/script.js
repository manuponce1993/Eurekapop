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

    //----------------- Js para modal -----------------//

    // Constante para determinar en que tamaño deja de agrandar la foto al hacerle click
    const width_size = 700;

    const cantidad_shows_booking = 3;
    // Vector con:
    //  -Ids de los botones video/fotos para cada show segun la cantidad de shows definidas en la constante "btns_categorias_multimedia"
    //  -Ids de los divs idem...
    //  -Tipo (foto o video)
    const vector_booking_datos = generar_vector_booking();

    console.log(vector_booking_datos);


    $(".img-w").each(function() {
      $(this).wrap("<div class='img-c'></div>")
      let imgSrc = $(this).find("img").attr("src");
       $(this).css('background-image', 'url("' + imgSrc + '")');
    })

    $('.img-c').each(function() {
      $(this).addClass('col-4 p-0 m-0')
    });

    if ( $(window).width() > width_size) {      
      bind_click_galeria();
      $('.img-c').addClass('col-4').removeClass('col-12');
    } else {
      $('.img-c').removeClass('col-4').addClass('col-12');      
    }

    $(window).resize(function(){
       if ($(window).width() <= width_size) {
          $('.img-c').removeClass('col-4').addClass('col-12');
          $('.img-c .activeAlt').removeClass('activeAlt')
          unbind_click_galeria();
       }else{
          $('.img-c').addClass('col-4').removeClass('col-12');
          $('.activeAlt').removeClass('col-4').addClass('col-12')
          bind_click_galeria();
       }  
    })

    // $("#booking-btn-videos").on('click', function(event) {
    //     event.preventDefault();
    //     $(".booking-fotos").hide("slow")
    //     $(".booking-videos").show("slow")
    // });

    // $("#booking-btn-fotos").on('click', function(event) {
    //     event.preventDefault();
    //     $(".booking-videos").hide("slow")
    //     $(".booking-fotos").show("slow")
    // });

    

    $('.btn-booking-mas-videos').on('mouseenter', function(event) {
        event.preventDefault();
        $(this).addClass('mas-videos-youtube')
    }).on('mouseleave', function(event) {
        event.preventDefault();
        $(this).removeClass('mas-videos-youtube')
    });

    bind_click_botones_booking();

    //------------ Funciones ------------//


    function bind_click_galeria() {
      $(".img-c").click(function() {
        // let w = $(this).outerWidth()
        let w = 40
        let h = $(this).outerHeight()
        let x = $(this).offset().left
        let y = $(this).offset().top
        console.log(w,h,x,y)
        
        
        $(".activeAlt").not($(this)).remove()
        let copy = $(this).clone();
        copy.insertAfter($(this)).height(h).width(w).delay(500).addClass("activeAlt col-12")
        $(".activeAlt").css('top', y - 8);
        $(".activeAlt").css('left', x - 8);
        $(".activeAlt").addClass('img-responsive');
        
          setTimeout(function() {
            copy.addClass("positioned")
          }, 39)
      })


      $(document).on("click", ".img-c.activeAlt", function() {
        let copy = $(this)
        copy.removeClass("positioned activeAlt").addClass("postactiveAlt")
        setTimeout(function() {
          copy.remove();
        }, 500)
      })
    }

    function unbind_click_galeria(argument) {
      $(".img-c").attr("onclick", "").unbind("click");
    }

    // Agrega y elimina la clase active_multimedia al link activo.
    function link_activo_booking(idactivar,iddesactivar) {
      if (!($(idactivar).hasClass('active_multimedia'))) {
            $(idactivar).addClass('active_multimedia');
      }
      if ($(iddesactivar).hasClass('active_multimedia')) {
            $(iddesactivar).removeClass('active_multimedia');
      }
    }


    function generar_vector_booking() {
      var vector_booking = new Array();
      for (var i = 0; i < cantidad_shows_booking; i++) {
        vector_booking.push({modal: "#modal_booking"+(i+1),
                             boton_foto:'#booking-btn-fotos'+(i+1), 
                             div_foto:'#booking-fotos'+(i+1),
                             boton_video:'#booking-btn-videos'+(i+1), 
                             div_video:'#booking-videos'+(i+1) });
      }
      return vector_booking;
    }

    // $("#modal_booking1").on('hidden.bs.modal', function(event) {
    //     event.preventDefault();
    //     $("#booking-fotos1").hide()
    //     $("#booking-videos1").hide()
    // });

    // $("#modal_booking1").on('shown.bs.modal', function(event) {
    //     event.preventDefault();
    //     console.log("se abrio");
    //     $("#booking-fotos1").show("");
    //     $("#booking-videos1").hide("");
    // });


    // generar un evento onclick por cada boton definido en el vector vector_booking 
    function bind_click_botones_booking() {
      vector_booking_datos.forEach( function(value,index,array) {
          $(value.boton_foto).on('click', function(event) {
            event.preventDefault();
            $(value.div_video).hide("slow");
            $(value.div_foto).show("slow");
            link_activo_booking(value.boton_foto,value.boton_video);
          });

          $(value.boton_video).on('click', function(event) {
            event.preventDefault();
            $(value.div_foto).hide("slow");
            $(value.div_video).show("slow");
            link_activo_booking(value.boton_video,value.boton_foto);
          });

          $(value.modal).on('shown.bs.modal', function(event) {
              event.preventDefault();
              link_activo_booking(value.boton_foto, value.boton_video);
              $(value.div_foto).show();
              $(value.div_video).hide();
              $('#scrollToTop').css('display', 'none !important');
          });

          $(value.modal).on('hidden.bs.modal', function(event) {
              event.preventDefault();
              $(value.div_foto).hide();
              $(value.div_video).hide();
          });

      });
    }

})

