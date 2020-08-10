



	// 섹션5 슬라이드
    var swiper = new Swiper('.blog-slider', {
        spaceBetween: 30,
        effect: 'fade',
        loop: true,
        mousewheel: {
          invert: false,
        },
        // autoHeight: true,
        pagination: {
          el: '.blog-slider__pagination',
          clickable: true,
        }
      });
    
    
    // 
//원페이지 소스
var myFullpage = new fullpage('#fullpage', {
    anchors: ['div1', 'div2', 'div3', 'div4', 'div5', 'div6', 'div7' ,'div8', 'div9'],
    navigation:true,
    navigationTooltips: ['메인', '소개', '지혜의숲', '활자의숲', '아트뮤지엄', '주변볼거리', '오시는길'],
    showActiveTooltip: true,
    menu: '#menu',
    scrollBar: true,
    autoScrolling: true,
    slidesNavigation: true,
    responsiveHeight: 330,
    scrollingSpeed: 700,
    controlArrows: false
});






// 메인 텍스트 효과

// 메인 텍스트 효과
$(function (){
    var log = function (msg) {
    return function () {
      if (console) console.log(msg);
    }
    }
    $('code').each(function () {
    var $this = $(this);
    $this.text($this.html());
    })
    
    var animateClasses = 'flash bounce shake tada swing wobble pulse flip flipInX flipOutX flipInY flipOutY fadeIn fadeInUp fadeInDown fadeInLeft fadeInRight fadeInUpBig fadeInDownBig fadeInLeftBig fadeInRightBig fadeOut fadeOutUp fadeOutDown fadeOutLeft fadeOutRight fadeOutUpBig fadeOutDownBig fadeOutLeftBig fadeOutRightBig bounceIn bounceInDown bounceInUp bounceInLeft bounceInRight bounceOut bounceOutDown bounceOutUp bounceOutLeft bounceOutRight rotateIn rotateInDownLeft rotateInDownRight rotateInUpLeft rotateInUpRight rotateOut rotateOutDownLeft rotateOutDownRight rotateOutUpLeft rotateOutUpRight hinge rollIn rollOut';
    
    var $form = $('.playground form')
    , $viewport = $('.playground .viewport');
    
    var getFormData = function () {
    var data = {
      loop: true,
      in: { callback: log('in callback called.') },
      out: { callback: log('out callback called.') }
    };
    
    $form.find('[data-key="effect"]').each(function () {
      var $this = $(this)
        , key = $this.data('key')
        , type = $this.data('type');
    
        data[type][key] = $this.val();
    });
    
    $form.find('[data-key="type"]').each(function () {
      var $this = $(this)
        , key = $this.data('key')
        , type = $this.data('type')
        , val = $this.val();
    
        data[type].shuffle = (val === 'shuffle');
        data[type].reverse = (val === 'reverse');
        data[type].sync = (val === 'sync');
    });
    
    return data;
    };
    
    $.each(animateClasses.split(' '), function (i, value) {
    var type = '[data-type]'
      , option = '<option value="' + value + '">' + value + '</option>';
    
    if (/Out/.test(value) || value === 'hinge') {
      type = '[data-type="out"]';
    } else if (/In/.test(value)) {
      type = '[data-type="in"]';
    }
    
    if (type) {
      $form.find('[data-key="effect"]' + type).append(option);
    }
    });
    
    $form.find('[data-key="effect"][data-type="in"]').val('wobble');
    $form.find('[data-key="effect"][data-type="out"]').val('tada');
    
    $('.jumbotron h1')
    .fitText(0.5)
    .textillate({ in: { effect: 'flipInY' }});
    
    $('.jumbotron p')
    .fitText(3.2, { maxFontSize: 18 })
    .textillate({ initialDelay: 1000, in: { delay: 3, shuffle: true } });
    
    setTimeout(function () {
      $('.fade').addClass('in');
    }, 250);
    
    
    setTimeout(function () {
    $('h1.glow').removeClass('in');
    }, 2000);
    
    var $tlt = $viewport.find('.tlt')
    .on('start.tlt', log('start.tlt triggered.'))
    .on('inAnimationBegin.tlt', log('inAnimationBegin.tlt triggered.'))
    .on('inAnimationEnd.tlt', log('inAnimationEnd.tlt triggered.'))
    .on('outAnimationBegin.tlt', log('outAnimationBegin.tlt triggered.'))
    .on('outAnimationEnd.tlt', log('outAnimationEnd.tlt triggered.'))
    .on('end.tlt', log('end.tlt'));
    
    $form.on('change', function () {
    var obj = getFormData();
    $tlt.textillate(obj);
    }).trigger('change');
    
    });
    
    
    // 텍스트 효과 끝







    // 섹션 3 슬라이드
    $(function() {

        Page.init();

    });


     





    var slideIndex1 = 0;
    carousel()
    
    function carousel() {
        var i;
        var x = document.getElementsByClassName("bgbgbg-img");
        for (i = 0; i < x.length; i++) {
          x[i].style.display = "none";
        }
        slideIndex1++;
        if (slideIndex1 > x.length) {slideIndex1 = 1}
        x[slideIndex1-1].style.display = "block";
        setTimeout(carousel, 2300); // Change image every 2 seconds
    }



    


// 섹션3 갤러리
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}
// 섹션3 갤러리 끝




$('.zue').on('mousewheel', function (e) {
    if (e.originalEvent.wheelDelta >= 120) {
        this.scrollTop -= 50;
    } else if (e.originalEvent.wheelDelta <= -120) {
        this.scrollTop += 50;
    }
    return false;
});







/* 카카오맵 스크롤 제어 */
        //해당 영역안에서는 스크롤을 별도로 처리하게끔 (장점: 바디 스크롤바 고정, 단점: 스크롤 가속 없음)
        $('#map-scroll-fixed').on('mousewheel', function (e) {
            if (e.originalEvent.wheelDelta >= 120) {
                this.scrollTop -= 50;
            } else if (e.originalEvent.wheelDelta <= -120) {
                this.scrollTop += 50;
            }
            return false;
        });

/* 카카오맵 스크롤 제어 끝 */



/* 첫페이지 로딩페이지 */

/* 첫페이지 로딩페이지 끝 */



// 지도 시작

var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
mapOption = { 
      center: new kakao.maps.LatLng(37.700734, 126.684287), // 지도의 중심좌표
      level: 4 // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption);

var imageSrc = 'img/logo-black.png', // 마커이미지의 주소입니다    
  imageSize = new kakao.maps.Size(50,41 ), // 마커이미지의 크기입니다
  imageOption = {offset: new kakao.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  markerPosition = new kakao.maps.LatLng(37.700734, 126.684287); // 마커가 표시될 위치입니다

// 마커를 생성합니다
var marker = new kakao.maps.Marker({
position: markerPosition,
image: markerImage // 마커이미지 설정 
});

// 마커가 지도 위에 표시되도록 설정합니다
marker.setMap(map);  

// 커스텀 오버레이에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
var content = '<div class="customoverlay">' +
  '  <a href="http://kko.to/jvXXJ2pYj" target="_blank">' +
  '    <span class="title">파주출판단지</span>' +
  '  </a>' +
  '</div>';

// 커스텀 오버레이가 표시될 위치입니다 
var position = new kakao.maps.LatLng(37.700734, 126.684287);  

// 커스텀 오버레이를 생성합니다
var customOverlay = new kakao.maps.CustomOverlay({
  map: map,
  position: position,
  content: content,
  yAnchor: 1 
});

// 지도 끝




  
  /**스크롤이 설정한 높이 이상 내려갔을때 스타일추가하기**/
if (jQuery(window).width() > 0) {
    jQuery(window).on("scroll",function(ev){
        if(jQuery(window).scrollTop() > 0 ) { /**높이 픽셀 조정**/
            jQuery('.menu_box').addClass('fixed');  /**위의 높이에서 .fixed 클래스를 추가합니다. 스타일에서 자유롭게 수치 조절 가능합니다.**/
        }
        else{
            jQuery('.menu_box').removeClass('fixed');
        }
        return false;
    });
    }



        
/**마우스 부드럽게 해당위치로 이동**/
$(function(){
    $('a[href^=#]').click(function() {
        var speed = 800;
        var href= $(this).attr("href");
        var target = $(href == "#" || href == "" ? 'html' : href);
        var position = target.offset().top;
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });
});


  

