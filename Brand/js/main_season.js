
// scroll logo menu
$(window).scroll(function () {
    if($(window).scrollTop() < 150) {
     $('.logo').fadeOut(700);
    } else {
     $('.logo').fadeIn(700);
    }
   });

// $('.logo').hover(function(){
//     $('.logo').fadeIn(function(){
//      $('.logo').css("top","80%")

//     })
// })


    
    /**
 * Template Name: Moderna - v2.1.0
 * Template URL: https://bootstrapmade.com/free-bootstrap-template-corporate-moderna/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
!(function($) {
  "use strict";

  // Toggle .header-scrolled class to #header when page is scrolled
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('#header').addClass('header-scrolled');
          $('.nav-menu').addClass('nav-menu-scrolled a');

      } else {
          $('#header').removeClass('header-scrolled');
          $('.nav-menu').removeClass('nav-menu-scrolled a');

      }
  });

  if ($(window).scrollTop() > 100) {
      $('#header').addClass('header-scrolled');

  }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .mobile-nav a, .scrollto, .nav', function(e) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          e.preventDefault();
          var target = $(this.hash);
          if (target.length) {

              var scrollto = target.offset().top;
              var scrolled = 20;

              if ($('#header').length) {
                  scrollto -= $('#header').outerHeight()

                  if (!$('#header').hasClass('header-scrolled')) {
                      scrollto += scrolled;
                  }
              }

              if ($(this).attr("href") == '#header') {
                  scrollto = 0;
              }

              $('html, body').animate({
                  scrollTop: scrollto
              }, 1500, 'easeInOutExpo');

              if ($(this).parents('.nav-menu, .mobile-nav').length) {
                  $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                  $(this).closest('li').addClass('active');
              }

              if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
                  $('.mobile-nav-overly').fadeOut();
              }
              return false;
          }
      }
  });

  // Mobile Navigation
  if ($('.nav-menu').length) {
      var $mobile_nav = $('.nav-menu').clone().prop({
          class: 'mobile-nav d-lg-none'
      });
      $('body').append($mobile_nav);
      $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="bx bx-menu"></i></button>');
      $('body').append('<div class="mobile-nav-overly"></div>');

      $(document).on('click', '.mobile-nav-toggle', function(e) {
          $('body').toggleClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
          $('.mobile-nav-overly').toggle();
      });

      $(document).on('click', '.mobile-nav .drop-down > a', function(e) {
          e.preventDefault();
          $(this).next().slideToggle(300);
          $(this).parent().toggleClass('active');
      });

      $(document).click(function(e) {
          var container = $(".mobile-nav, .mobile-nav-toggle");
          if (!container.is(e.target) && container.has(e.target).length === 0) {
              if ($('body').hasClass('mobile-nav-active')) {
                  $('body').removeClass('mobile-nav-active');
                  $('.mobile-nav-toggle i').toggleClass('bx-menu bx-x');
                  $('.mobile-nav-overly').fadeOut();
              }
          }
      });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
      $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // Intro carousel
  var heroCarousel = $("#heroCarousel");

  heroCarousel.on('slid.bs.carousel', function(e) {
      $(this).find('h2').addClass('animate__animated animate__fadeInDown');
      $(this).find('p, .btn-get-started').addClass('animate__animated animate__fadeInUp');
  });
  // Back to top button
  $(window).scroll(function() {
      if ($(this).scrollTop() > 100) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });

  $('.back-to-top').click(function() {
      $('html, body').animate({
          scrollTop: 0
      }, 1500, 'easeInOutExpo');
      return false;
  });

  // Initiate the venobox plugin
  $(window).on('load', function() {
      $('.venobox').venobox();
  });

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
          $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
  }, {
      offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
      var portfolioIsotope = $('.portfolio-container').isotope({
          layoutMode: 'fitRows'
      });

      $('#portfolio-flters li').on('click', function() {
          $("#portfolio-flters li").removeClass('filter-active');
          $(this).addClass('filter-active');

          portfolioIsotope.isotope({
              filter: $(this).data('filter')
          });
          aos_init();
      });

  });

  // Portfolio details carousel
  $(".portfolio-details-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      items: 1
  });

  // Initi AOS
  function aos_init() {
      AOS.init({
          duration: 1000,
          once: true
      });
  }
  $(window).on('load', function() {
      aos_init();
  });

})(jQuery);



// // 메인슬라이드
// timer();
// var interval;

// function timer(){
//   var interval=setInterval(function(){slide()},2000);                        
// }

// function slide(){
//   $(".slide_list").animate({left:"-=1980px"},1000,function(){
//     $(this).css({"left":0});
//     $(".slide_list").append( $(".slide_list").children(".slide_list>li").eq(0) );
//   });    

// }  

//Array of images which you want to show: Use path you want.
// var images=new Array('img/img1.jpg','img/img2.jpg','img/img3.jpg');
// var nextimage=0;
// doSlideshow();

// function doSlideshow(){
//     if(nextimage>=images.length){nextimage=0;}
//     $('#hero')
//     .css('background-image','url("'+images[nextimage++]+'")')
//     .fadeIn(500,function(){
//         setTimeout(doSlideshow,1000);
//     });
// }
