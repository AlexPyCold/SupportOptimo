$(function () {
    $('.logo img').css('opacity', '1');
})

$(window).on('load', function () {
    
    var $preloader = $("#page-preloader");
    var $loader = $preloader.find(".dot-loader");

    $loader.fadeOut();
    $preloader.delay(450).fadeOut("slow");

          

       
        
    
});

$(document).ready(function () {
   
    
    setTimeout(function () {

        if ($(window).width() < 1201) {
            console.log('width', $(window).width())
        } else {
            new WOW().init();
        }

    }, 0);

    $('.menu__item > a.services').on('click', function (e) {
        e.preventDefault();
        $('.menu__item > a.services').removeClass('active');
        $('.submenu__list').fadeOut('fast');
        $(this).toggleClass('active')
        $(this).siblings('.submenu__list').fadeToggle('fast');

        if ($(this).siblings('.submenu__list').length < 1) {
            $(this).removeClass('active')
        } else {

        }
    })
    $(document).mouseup(function (e) {
        var div = $(".menu__item");
        if (!div.is(e.target) &&
            div.has(e.target).length === 0) {
            $('.submenu__list').fadeOut('fast');
            $('.menu__item > a').removeClass('active');
        }
    });

    $('.menu__item > a.services').on('click', function (e) {
        e.preventDefault();
        $(this).siblings('.submenu__list.mobi').slideToggle('fast');
    })

    $(".arrow__down").click(function (e) {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top + "px"
        }, {
            duration: 500,
            easing: "swing"
        });
        e.preventDefault();
        return false;
    });

    $('.drop-menu').on('click', function (e) {
        e.preventDefault()
        $(this).toggleClass('open');
        $('.drop-block').fadeToggle().css('display', 'flex');
        $('.header .logo, .header .drop-menu').toggleClass('fixed');
    });

})

$('[data-fancybox]').fancybox({
    protect: true,
    buttons: [
        'zoom',
        'thumbs',
        'close'
    ]
});


$('[data-fancybox="watermark"]').fancybox({
    protect: true,
    slideClass: 'watermark',
    toolbar: false,
    smallBtn: true
});

// Preload watermark image
// Please, use your own image
(new Image()).src = "https://fancyapps.com/GJbkSPU.png";