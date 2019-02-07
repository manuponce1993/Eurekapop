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
        $('#btnEnviar').text('Enviando...');
        $('#btnEnviar').prop('disabled', 'disabled');
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

