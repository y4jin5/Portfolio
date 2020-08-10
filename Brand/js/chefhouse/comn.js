/* gnb fixed */
function headFix(){
	var gnbpos = $('body').offset().top;
	if($(window).scrollTop() >= gnbpos+38) {
		$('#header').addClass('fixed');
	}else{
		$('#header').removeClass('fixed');
	}
}

/* headNav */
function headNav(){
	$('.nav .btn_menu').on('click', function() {
		if ($(this).hasClass('active')) { 
			$(this).removeClass('active');
			$('.nav .aside').removeClass('on').animate( { right: '-100%' }, { queue: false, duration: 300 });
			$('body').removeClass('navOn');
		}else{
			$(this).addClass('active');
			$('.nav .aside').addClass('on').animate( { right: '0' }, { queue: false, duration: 300 });
			$('body').addClass('navOn');
		}
	});
}

/* navMenu */
function navMenu(){
	$('.m_menu > ul > li').each(function(){
		if($(this).children().hasClass('depth2') !== false){
			$(this).addClass('depthY');			
		}
	});
	/*
	for(i=0; i<50; i++){
		if(i==1){
			$(this).addClass('depthY');	
			return false;
		}		
		console.log(i)
	}
	*/
	$('.m_menu > ul > li > a').on('click', function(){
		if($(this).next().hasClass('depth2') !== false){
			$('.m_menu > ul > li > a').removeClass();
			$(this).addClass('on');
			var mNavDepth = $(this).closest('.m_menu .depth1 li').children('.m_menu .depth2');
			
			if(mNavDepth.filter(':visible').length == 0){
				mNavDepth.slideDown('fast');
			}else{
				mNavDepth.slideUp('fast');
				$(this).removeClass('on');
			}
			$('.m_menu .depth2').not(mNavDepth).slideUp('fast');
		}
	});
}

/* mb_slide */
function mbSlide(){
	$('.mb_slide').slick({
		dots: true,
		infinite: true,
		speed: 300,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false
	});
}

/* inputKeyup */
function inputKeyup(){
	$('.input_placeholder').on('click', function () {
		$(this).closest('.form_input').find('.input_sec').focus();
	});
	$('.form_input .input_sec').on('keyup', function () {
		var value = $.trim($(this).val());
		if (value) {
			$(this).closest('.form_input').addClass('hasValue');
		} else {
			$(this).closest('.form_input').removeClass('hasValue');
		}
	});
}

/* productViewSlide */
function productViewSlide(){
	$('.product_slide_for').on('init', function(event, slick) {
		$(this).append('<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>');
		$('.current').text(slick.currentSlide + 1);
		$('.total').text(slick.slideCount);
	}).slick({
		speed: 300,
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		//fade: true,
		asNavFor: '.product_slide_nav'
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      $('.current').text(nextSlide + 1);
    });
	$('.product_slide_nav').slick({
		speed: 300,
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		asNavFor: '.product_slide_for',
		dots: false,
		//centerMode: true,
		arrows: false,
		focusOnSelect: true
	});
}

/* scrollAni */
function scrollAni(){

	var $animation_elements = $('.ani_obj');
	var $window = $(window);

	function ani_chk() {
		var window_height = $window.height();
		var window_top_position = $window.scrollTop();
		var window_bottom_position = (window_top_position + window_height);

		$.each($animation_elements, function() {
			var $element = $(this);
			var element_height = $element.outerHeight();
			var element_top_position = $element.offset().top;
			var element_bottom_position = (element_top_position + element_height);

			if ((element_bottom_position >= window_top_position) && (element_top_position <= window_bottom_position)) {
				$element.addClass('ani_on');
			} else {
				//$element.removeClass('ani_on');
			}
		});
		
	}

	$window.on('scroll resize', ani_chk);
	$window.trigger('scroll');

}

/* option_select_box */
function optionSelectBox(){
	$('.option_select_box .o_select').on('click', function(){
		if($(this).hasClass('active')){
			$(this).removeClass('active').next('.o_box').slideUp(200);
		}else{
			$(this).addClass('active').next('.o_box').slideDown(200);
		}
	});
	$('.option_select_box .o_box li a').on('click', function(){
		var txt = $(this).text();
		$(this).closest('.option_select_box').find('.o_select').removeClass('active').html(txt);
		$(this).closest('.option_select_box').find('.o_box').slideUp(200);
	});
}

/* goTop */
function goTop(){
	
	var offset = 100;

	if($(this).scrollTop() > offset){
		$('.go_top').fadeIn(500);
	}else{
		$('.go_top').fadeOut(500);
	}

}

/* SD slider */
function sdSlider(){
	$('.sd_slider').on('init', function(slick) {
		$('.slick-dots').append( '<li class="auto-control"><a href="javascript:void(0)" class="pause paused"></a></li>' );
		var play = false;
		$('.sd_slider .pause').on('click', function() {
			if(play) {
				$('.sd_slider').slick('play');
			} else {
				$('.sd_slider').slick('pause');
			}
			play = !play;
			$(this).toggleClass('paused');
		});
	}).slick({
		arrows: false,
		dots: true,
		infinite: true,
		autoplay: true,
		autoplaySpeed: 3000,
		speed: 300,
		slidesToShow: 1,
		centerMode: true,
		centerPadding: '0px',
		variableWidth: true,
		responsive: [	{
			breakpoint: 860,
			settings: {
				variableWidth: false
			}
		}]
	});
}

function bnrPopSlide(){
	$('.bnr_pop_slide').slick({
		dots: true,
		infinite: true,
		speed: 300,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false,
		pauseOnHover:false
	});
}

$(window).scroll(function(){

	headFix();
	goTop();

});

$(document).ready(function(){

	headFix();
	headNav();
	navMenu();

	/* go_top */
	$('.go_top').click(function(){
		$('html, body').animate({
			scrollTop:0
		},400);
			return false;
	});  

	/* sub_tab */
	var preloaderObj = $('.sub_tab');
	if (preloaderObj.length) {
		var oldIndex = $('.sub_tab ul li').index($('.sub_tab ul li.on'));
		var newIndex = $('.sub_tab ul li').index($(this));
		var positionLeft = $('.sub_tab ul li:eq('+oldIndex+')').position().left;
		var allWidth = $('.sub_tab').width();
		var activeWidth = $('.sub_tab ul li:eq('+oldIndex+')').width();
		var positionCenter = (Number(allWidth) - Number(activeWidth)) / 2;
		var scrollLeft = $('.sub_tab ul').scrollLeft();

		$('.sub_tab ul').animate({scrollLeft:Number(scrollLeft) - (Number(positionCenter) - Number(positionLeft))}, 0);
	}
	$('.sub_visual').addClass('on');

	/* jq_tab */
	$('.jq_tab li a').on('click', function(){
		if( $(this).parent('li').is('.on') ){
		} else {
			$('.jq_tab li').removeClass('on');
			$(this).parent('li').addClass('on');
			$('.jq_tab_cont').removeClass('on');
			$( $(this).attr('href') ).addClass('on');
		}
		return false;
	});

	/* popup */
	$('.popup_open').click(function(){
		$( $(this).attr('href') ).fadeIn(300).addClass('on');
		$('body').addClass('popup_scroll');
		$(this).attr('data-focus','on');
	});

	$('.btn_popup_close').click(function(){
		$(this).closest('.popup_wrap').fadeOut(300).removeClass('on');
		$('body').removeClass('popup_scroll');
		$('a[data-focus~=on]').focus();
		window.setTimeout(function(){
			$('a[data-focus~=on]').removeAttr('data-focus');
		},500);
	});

});