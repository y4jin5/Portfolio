// car color

$(function(){
    $('#wc9').click(function(){
        $('.wc9').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#r2t').click(function(){
        $('.r2t').fadeIn();
        $('.wc9').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#e2r').click(function(){
        $('.e2r').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.wc9').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#q2w').click(function(){
        $('.q2w').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.wc9').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#j2f').click(function(){
        $('.j2f').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.wc9').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#a2s').click(function(){
        $('.a2s').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.wc9').css('display','none').fadeOut();
        $('.y2b').css('display','none').fadeOut();

    });
    $('#y2b').click(function(){
        $('.y2b').fadeIn();
        $('.r2t').css('display','none').fadeOut();
        $('.e2r').css('display','none').fadeOut();
        $('.q2w').css('display','none').fadeOut();
        $('.j2f').css('display','none').fadeOut();
        $('.a2s').css('display','none').fadeOut();
        $('.wc9').css('display','none').fadeOut();

    });

    
});



// slide
$( document ).ready(function( $ ) {
    $( '#example1' ).sliderPro({
        width: 960,
        height: 500,
        arrows: true,
        buttons: false,
        waitForLayers: true,
        thumbnailWidth: 200,
        thumbnailHeight: 100,
        thumbnailPointer: true,
        autoplay: false,
        autoScaleLayers: false,
        breakpoints: {
            500: {
                thumbnailWidth: 120,
                thumbnailHeight: 50
            }
        }
    });
});




// aos
AOS.init();


// owl carousel
$(document).ready(function(){
	var owl = $('.owl-carousel');

	owl.owlCarousel({
		margin:10,
		nav:true,
		loop:true,
		responsive:{
			0:{
				items:1
			},
			600:{
				items:3
			},
			1000:{
				items:5
			}
		}
	})
})


// tooltip

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
  });

// exterior interior button
$('.exterior_btn').click(function(){
    $('.exterior_btn a').css("background","#337ab7").css("color","white")
    $('.interior_btn a').css("background","white").css("color","#555")
    
})

$('.interior_btn').click(function(){
    $('.interior_btn a').css("background","#337ab7").css("color","white")
    $('.exterior_btn a').css("background","white").css("color","#555")
})


// slide_box
timer();
var interval;

function timer(){
  var interval=setInterval(function(){slide()},2000);                        
}

function slide(){
  $(".slide_box>ul").animate({left:"-=1080px"},2500,function(){
    $(this).css({"left":0});
    $(".slide_box>ul").append( $(".slide_box>ul").children(".slide_box>ul>li").eq(0) );
  });    

}    


// slide-pro sec06
$( document ).ready(function( $ ) {
    $( '#example5' ).sliderPro({
        width: 670,
        height: 500,
        orientation: 'vertical',
        loop: false,
        arrows: true,
        buttons: false,
        thumbnailsPosition: 'right',
        thumbnailPointer: true,
        thumbnailWidth: 290,
        breakpoints: {
            800: {
                thumbnailsPosition: 'bottom',
                thumbnailWidth: 270,
                thumbnailHeight: 100
            },
            500: {
                thumbnailsPosition: 'bottom',
                thumbnailWidth: 120,
                thumbnailHeight: 50
            }
        }
    });
});


// sec06 owl

// $('.owl-carousel').owlCarousel({
//     margin:10,
//     loop:true,
//     autoWidth:true,
//     items:4
// })


// image comparison slider
 // Call & init
 $(document).ready(function(){
    $('.ba-slider').each(function(){
      var cur = $(this);
      // Adjust the slider
      var width = cur.width()+'px';
      cur.find('.resize img').css('width', width);
      // Bind dragging events
      drags(cur.find('.handle'), cur.find('.resize'), cur);
    });
  });
  
  // Update sliders on resize. 
  // Because we all do this: i.imgur.com/YkbaV.gif
  $(window).resize(function(){
    $('.ba-slider').each(function(){
      var cur = $(this);
      var width = cur.width()+'px';
      cur.find('.resize img').css('width', width);
    });
  });
  
  function drags(dragElement, resizeElement, container) {
      
    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown touchstart', function(e) {
      
      dragElement.addClass('draggable');
      resizeElement.addClass('resizable');
      
      // Check if it's a mouse or touch event and pass along the correct value
      var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
      
      // Get the initial position
      var dragWidth = dragElement.outerWidth(),
          posX = dragElement.offset().left + dragWidth - startX,
          containerOffset = container.offset().left,
          containerWidth = container.outerWidth();
   
      // Set limits
      minLeft = containerOffset + 10;
      maxLeft = containerOffset + containerWidth - dragWidth - 10;
      
      // Calculate the dragging distance on mousemove.
      dragElement.parents().on("mousemove touchmove", function(e) {
          
        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;
        
        leftValue = moveX + posX - dragWidth;
        
        // Prevent going off limits
        if ( leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }
        
        // Translate the handle's left value to masked divs width.
        widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
              
        // Set the new values for the slider and the handle. 
        // Bind mouseup events to stop dragging.
        $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function () {
          $(this).removeClass('draggable');
          resizeElement.removeClass('resizable');
        });
        $('.resizable').css('width', widthValue);
      }).on('mouseup touchend touchcancel', function(){
        dragElement.removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      e.preventDefault();
    }).on('mouseup touchend touchcancel', function(e){
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
  }


// smart sense
$( document ).ready(function( $ ) {
  $( '#example3' ).sliderPro({
    width: 960,
    height: 500,
    fade: true,
    arrows: true,
    buttons: false,
    fullScreen: true,
    shuffle: true,
    smallSize: 500,
    mediumSize: 1000,
    largeSize: 3000,
    thumbnailArrows: true,
    autoplay: false
  });
});



// section08 tab
