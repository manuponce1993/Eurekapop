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

    $( "a.scrollLink" ).click(function( event ) {
        event.preventDefault()
        $("html, body").animate({ scrollTop: $($(this).attr("href")).offset().top }, 500)
    })

})

