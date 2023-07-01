(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 100,
        time: 3000
    });


    // Header carousel
    // $(".header-carousel").owlCarousel({
    //     autoplay: false,
    //     smartSpeed: 1500,
    //     items: 1,
    //     dots: false,
    //     loop: true,
    //     nav : true,
    //     navText : [
    //         '<i class="bi bi-chevron-left"></i>',
    //         '<i class="bi bi-chevron-right"></i>'
    //     ]
    // });
    $(".header-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 2000,
        stagePadding: 0,
        items: 1,
        loop:true,
        margin:0,
        singleItem:true,
        nav:true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        dots:true
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);



$(document).ready(function () {

    
    var sliderList = $('#carousel-principal .carousel-inner .item');
    sliderList.each(function (index) {
        var video = $(this).find('#bgndVideo_' + index);
        if (video.length > 0) {
            video.mb_YTPlayer();
        }
    });
    var $carousel = $('#carousel-principal');
    var timerSlider;
    $carousel.carousel({ interval: false });
    $carousel.bind('slide.bs.carousel', function (e) {

        console.log($(e.relatedTarget).data('interval') * 1000);
        clearTimeout(timerSlider);
        timerSlider = setTimeout(
            function () {
                $carousel.carousel('next');
            },
            $(e.relatedTarget).data('interval') * 1000
        );
        
    
    });

    timerSlider = setTimeout(
        function () {
            $carousel.carousel('next');
        },
        $carousel.find('.item.active').data('interval') * 1000
    );

    var sliderVideoInterval = setInterval(function () { sliderVideoTimer() }, 500);

    function sliderVideoTimer() {
        var sliderVideo = $carousel.find('.item.active').find('.slider-conteudo-video');
        if (sliderVideo.length > 0) {
            jQuery(window).resize();
        }
    }
    $carousel.mouseenter(function () {
        clearTimeout(timerSlider);
        console.log("sliderMouseEnter");
    }).mouseleave(function () {
        console.log("sliderMouseLeave");
        clearTimeout(timerSlider);
        timerSlider = setTimeout(
            function () {
                $carousel.carousel('next');
            },
            $carousel.find('.item.active').data('interval') * 1000
        );
    });
    
});

let slideIndex = 1;
let slideInterval = setInterval(function() {
  plusSlides(1);
}, 5000);

showSlides(slideIndex);

function plusSlides(n) {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000);

  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearInterval(slideInterval);
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000);

  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" slide_active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " slide_active";
}
