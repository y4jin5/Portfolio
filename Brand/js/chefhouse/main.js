function mainSlide(){
	$('.main_slide').slick({
		dots: true,
		infinite: true,
		speed: 300,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false,
		pauseOnHover:false
	});
}
function mainHeight(){
	if($(window).width() > 1024){
		var windowHeight = $(window).height();
		if($(window).height() < 1200){
			//$('.main_visual').css({'height': windowHeight-130});
			$('.main_visual').css({'height': windowHeight});
		}else{
			$('.main_visual').attr('style','');
		}
	}else{
		$('.main_visual').attr('style','');
	}
}
function menuIntroSlide(){
	$('.menu_it_slide').on('init', function(event, slick) {
		$(this).append('<div class="slick-counter"><span class="current"></span> / <span class="total"></span></div>');
		$('.current').text(slick.currentSlide + 1);
		$('.total').text(slick.slideCount);
	}).slick({
		speed: 300,
		//infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		//fade: true,
		arrows: false,
		asNavFor: '.menu_ic_slide'
	}).on('beforeChange', function(event, slick, currentSlide, nextSlide) {
      $('.current').text(nextSlide + 1);
    });
	$('.menu_ic_slide').slick({
		fade: true,
		speed: 300,
		//infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		asNavFor: '.menu_it_slide',
		dots: false,
		//centerMode: true,
		arrows: true,
		focusOnSelect: true
	});
}
function menuIntroHeight(){

	if($(window).width() > 767){
		var heightCheck = $('.menu_intro_wrap .i_thumb').height();
		$('.menu_intro_wrap .i_box').css({'height': heightCheck});
	}else{
		//$('.menu_intro_wrap .i_box').attr('style','');
	}

}
/* evtSlide */
function evtSlide(){
	$('.evt_bnr_slide').slick({
		dots: true,
		infinite: true,
		speed: 300,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 3000,
		arrows:false,
		pauseOnHover:false
	});
}

/* reviewSlide */
function reviewSlide(){
	$('.r_slide').slick({
		dots: false,
		arrows: false,
		//infinite: false,
		speed: 300,
		slidesToShow: 3,
		variableWidth: true,
		responsive: [
			{
				breakpoint: 1023,
				settings: {
					//slidesToShow: 2,
				}
			}
		]
	});
	$('.r_control .btn_prev').click(function(){
		$('.r_slide').slick('slickPrev');
	});
	$('.r_control .btn_next').click(function(){
		$('.r_slide').slick('slickNext');
	});
}

$(window).resize(function(){
	mainHeight();
	//menuIntroHeight();
});
$(document).ready(function(){
	mainSlide();
	mainHeight();
	menuIntroSlide();
	evtSlide();
	reviewSlide();
	//menuIntroHeight();

	var swiper = new Swiper('.brand_story_list', {
		slidesPerView: 'auto',
		spaceBetween: 0,
		freeMode: true,
		//centeredSlides: true,
		scrollbar: {
			el: '.brand_story_page',
			draggable: true,
			snapOnRelease: false,
			dragSize: 150
		}
	});

});