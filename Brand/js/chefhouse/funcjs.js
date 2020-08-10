document.write('<script type="text/javascript" charset="utf-8" src="/inc/_common_js.js"></script>');

//----------------------------------------------------------------------------------------------------
//-- 아이디&비밀번호 검사 함수
//----------------------------------------------------------------------------------------------------

// 아이디 유효성검사  - 프로그램 (김기영)
function checkID(obj,strNN) {
	// 아이디의 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false

	if(obj.value){
		// 문자열 검사
		var reg_id = /[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]{6,20}$/;
		if(!reg_id.test(obj.value)){ 
			alert("아이디는 영문, 숫자, 특수문자 6~20 자 이여야 합니다.");
			selectAll(obj);
			return false;
		} 
		
		return true;
	}
}

// 비밀번호 유효성검사  - 프로그램 (김기영)
function checkPW(obj,strNN) {
	// 비밀번호 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false
	
	if(obj.value){
		// 문자열 검사
		var reg_id = /[-!#$%&'*+./0-9=?A-Z^_a-z{|}~]{6,20}$/;
		if(!reg_id.test(obj.value)){ 
			alert("비밀번호는 영문, 숫자, 특수문자 6~20 자 이여야 합니다.");
			selectAll(obj);
			return false;
		} 
		
		return true;
	}
}

// 코드 유효성검사  - 프로그램 (김기영)
function checkCode(obj,strNN) {
	// 코드의 유효성확인 (자리수, 문자열)
	// obj - 확인할 object
	// strNN - 오류시 표시할 문자열 / 값이 없으면 Default 메세지 출력
	// return - true or false
	
	// 자리수 검사
	if((obj.value.length < 2) || (obj.value.length > 20)){
		if(strNN) alert(strNN);
		else alert("2~20자의 코드를 입력해 주십시오.");
		selectAll(obj);
		return false;
	}

	// 문자열 검사
	var validstr = "0123456789_ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var targetstr = obj.value.toUpperCase();
	for (i = 0; i < targetstr.length; i++){
		if(validstr.indexOf(targetstr.substring(i, i+1)) < 0){
			if(strNN) alert(strNN);
			else alert("숫자 또는 영문자만 가능 합니다.");
			selectAll(obj);
			return false;
		}
	}
	
	return true;
}

//----------------------------------------------------------------------------------------------------
//-- 화면인쇄함수
//----------------------------------------------------------------------------------------------------

var PrintForHtmlContent; 
function printDiv () { 
   if (document.all && window.print) { 
       window.onbeforeprint = beforeDivs; 
       window.onafterprint = afterDivs; 
       window.print(); 
   } 
} 
function beforeDivs () { 
   if (document.all) { 
       var rng = document.body.createTextRange( ); 
       if (rng!=null) { 
           //alert(rng.htmlText); 
           PrintForHtmlContent = rng.htmlText; 
           rng.pasteHTML("<table border=0 align=center><tr><td align=center>" + document.all["PrintArea"].innerHTML + "</td></tr></table>"); 
       } 
   } 
} 
function afterDivs () { 
   if (document.all) { 
       var rng = document.body.createTextRange( ); 
           if (rng!=null) { 
                       rng.pasteHTML(PrintForHtmlContent); 
           } 
   } 
} 




//----------------------------------------------------------------------
//* 배너 스크롤  class
//* 속성
//*   type : 스크롤 방향 구분(1:수직 스크롤, 2:수평 스크롤)
//*   leftRightDirection : 수평 스크롤 방향 구분(1:왼쪽, 2:오른쪽)
//*   pausemouseover : 마우스 포인터 over 시 스크롤 정지 여부(true:정지, false:정지 안함)
//*   layerwidth : 스크롤내용이 보여지는 영역 가로 사이즈
//* 사용법
//* var bannerScroll = new BannerScroll(); 
//* bannerScroll.name = "bs_1"; 
//* bannerScroll.type = 2; 
//* bannerScroll.pausemouseover = true; 
//* bannerScroll.add("배너1");
//* bannerScroll.add("배너2");
//* bannerScroll.add("배너3");
//* bannerScroll.start();
//----------------------------------------------------------------------
function BannerScroll() {
	this.version = "0.1";
	this.name = "bannerScroll";
	this.item = new Array();
	this.itemcount = 0;
	this.currentspeed = 0;
	this.scrollspeed = 20;
	this.pausedelay = 1000;
	this.pausemouseover = false;
	this.stop = false;
	this.type = 2;
	this.leftRightDirection = 1;
	this.layerwidth = 100;
	this.height = 100;
	this.width = 100;
	this.stopHeight = 0;

	this.add = function() {
		var text = arguments[0];
		this.item[this.itemcount] = text;
		this.itemcount = this.itemcount + 1;
	};

	this.start = function() {
	    this.display();
	    this.currentspeed = this.scrollspeed;
	    setTimeout(this.name+'.scroll()',this.currentspeed);
	};

	this.display = function() {
	    document.write('<div id="'+this.name+'" style="height:'+this.height+'px; width:'+this.layerwidth+'px; position:relative;overflow:hidden;z-index:1" onmouseover="'+this.name+'.mouseover();" onmouseout="'+this.name+'.mouseout();">');
	
	    for (var i = 0; i < this.itemcount; i++) {
			if ( this.type == 1) {
			    document.write('<div id="'+this.name+'item'+i+'" style="left:0px; width:'+this.width+'px; position:absolute;top:'+(this.height*i+1)+'px;">');
			    document.write(this.item[i]);
			    document.write('</div>');
			} else if ( this.type == 2 ) {
			    document.write('<div id="'+this.name+'item'+i+'" style="left:'+(this.width*i+1)+'px; width:'+this.width+'px; position:absolute; top:0px;">');
			    document.write(this.item[i]);
			    document.write('</div>');
			}
	    }
	 
	    document.write('</div>');
	};

	this.scroll = function()
	{
		this.currentspeed = this.scrollspeed;
	 
		if( !this.stop ) {
			for (i = 0; i < this.itemcount; i++) {
			    obj = document.getElementById(this.name+'item'+i).style;
				
				if( this.type == 1 ) {
	            	obj.top = (parseInt(obj.top) - 2) + "px";
	                
					if( parseInt(obj.top) <= this.height*(-1) ) {
						obj.top = (this.height * (this.itemcount-1)) + "px";
						this.currentspeed = this.pausedelay;
					}
	                     
	                //if ( parseInt(obj.top) == 0 || ( this.stopHeight > 0 && this.stopHeight - parseInt(obj.top) == 0 ) )
				} else if ( this.type == 2 ) {
			     	if (this.leftRightDirection == 1) {
						obj.left = (parseInt(obj.left) - 1) + "px";
					
						if ( parseInt(obj.left) <= this.width*(-1) )
						{
						    obj.left = (parseInt(obj.left) + (this.width * (this.itemcount))) + "px";
							this.currentspeed = this.pausedelay;
						}
					} else {
						obj.left = (parseInt(obj.left) + 1) + "px";

						if ( parseInt(obj.left) >= this.layerwidth )
						{
						    obj.left = (parseInt(obj.left) - (this.width * (this.itemcount))) + "px";
						    this.currentspeed = this.pausedelay;
						}
					}
				}
			}
		}
	     
		window.setTimeout(this.name+".scroll()",this.currentspeed);
	};
     
	this.mouseover = function() {
		if ( this.pausemouseover )
		{
			this.stop = true;
	    }
	};
     
	this.mouseout = function ()
	{
		if ( this.pausemouseover )
		{
			this.stop = false;
		}
	};
}

function SelectItem(value, text) {
	this.text = text;
	this.value = value;
	this.text = text;
	this.getValue = function () {
		return this.value;
	};
	this.getText = function () {
		return this.text;
	};
}



//----------------------------------------------------------------------
//* 내용 : 체크박스에 할당된 값을 얻는다.
//*   같은 이름을 가진 체크박스가 여럿일때 유용하다.
//* 입력 :
//*   formname - form name
//*   itemname - checkbox name (같은 역할을 하는 것은 같은 이름으로 만든다.)
//*   idx - value 중의 위치 (value 는 '|' 로 묶여 있다. 이로 구분된 인덱스를 말한다.) default:0
//*   needall - check 여부에 관계없이 넣을 것인가.
//*     false 일 경우 check 된 항목의 값들을 "|" 로 묶어 반환한다.
//*     true 일 경우 check 되지 않은 항목의 값도 얻는다. (모든 값을 얻고자 할때 사용)
//*   getfrom - 값을 얻을 아이템의 이름,
//*     check 된 항목의 값을 checkbox 자체가 아닌 다른 항목의 값에서 얻을 수 있도록 한다.
//*     null 이거나 '' 일 경우 itemname 을 사용한다.
//*   exceptdisabled - true 일 경우. disabled 된 항목을 확인 항목에서 제외시킨다.
//* 반환 : "|" 로 구분된 지정된(선택된) 항목의 값
//----------------------------------------------------------------------
function getCheckValues(formname,itemname,idx,needall,getfrom,exceptdisabled) {
	/*
	'' szCodes - 리턴 값
	'' bNeedAll - <- needall
	'' iIdx - <- idx
	'' szValue - checkbox 의 값. "|" 로 구분된 항목중 idx 번째의 값
	'' szGetFrom - <- getfrom
	'' bExceptDisabled - <- exceptdisabled
	*/
	var szCodes,bNeedAll,iIdx,szValue,szGetFrom,bExceptDisabled;

	/*
	'' 변수 초기화 및 입력된 사항을 점검
	*/
	szCodes='';
	iIdx=0;
	if (typeof(idx)!='undefined') iIdx=idx;
	bNeedAll=false;
	if (typeof(needall)!='undefined') bNeedAll=needall;
	szGetFrom=itemname;
	if (typeof(getfrom)!='undefined') {
		if (getfrom!=null&&getfrom!='') szGetFrom=getfrom;
	}
	bExceptDisabled=false;
	if (typeof(exceptdisabled)!='undefined') bExceptDisabled=exceptdisabled;
	
	if (document.all[formname].elements[itemname]==null) ;
	else
		/*
		'' 항목이 있을 경우 처리한다.
		*/
		if (document.all[formname].elements[itemname].length==null) {
			/*
			'' checkbox 가 하나일 경우의 처리
			*/
			szValue=(document.all[formname].elements[szGetFrom].value+'||||').split('|')[iIdx+0];
			/*
			'' 값이 없으면 리턴할 것이 없으므로 무시한다.
			*/
			if (szValue!='') {
				/*
				'' bExceptDisabled 가 true 일 경우 disabled 된 항목은 무시한다.
				*/
				if (!bExceptDisabled||!document.all[formname].elements[itemname].disabled) {
					/*
					'' bNeedAll 이 true 이면 항상 그렇지 않으면 checked 일 경우 값을 얻는다.
					*/
					if (bNeedAll) {
						szCodes=szValue;
					} else {
						if (document.all[formname].elements[itemname].checked) {
							szCodes=szValue;
						}
					}
				}
			}
		} else {
			/*
			'' checkbox 가 여럿 일 경우 각 cjeckbox 에 대해 확인을 하고
			'' 얻은 값을 "|" 로 묶는다.
			*/
			for (var i=0;i<document.all[formname].elements[itemname].length;i++) {
				szValue=(document.all[formname].elements[szGetFrom][i].value+'||||').split('|')[iIdx+0];
				if (szValue!='') {
					if (!bExceptDisabled||!document.all[formname].elements[itemname][i].disabled) {
						if (bNeedAll) {
							if (szCodes!='') szCodes+='|';
							szCodes+=szValue;
						} else {
							if (document.all[formname].elements[itemname][i].checked) {
								if (szCodes!='') szCodes+='|';
								szCodes+=szValue;
							}
						}
					}
				}
			}
		}
	return szCodes;
}

/*****************************************************************************
* checkbox all 선택
*****************************************************************************/
function checkAll(obj, chl){
	if (obj.checked) {
		if($('.'+chl).prop("disabled") != 'disabled'){
			$('.'+chl).prop("checked",true);
		}
	} else {
		$('.'+chl).prop("checked",false);
	}
}

//----------------------------------------------------------------------
//* 내용 :체크박스에 선택된 값을 얻어서 메일 발송 페이지로 보낸다.
//*     같은 클래스 이름을 가진 체크박스가 여럿일때 유용하다.
//*   주의 : 체크박스  parent안에 mbr_nm / mbr_eml 의 id를 가진  input 객체가 존재해야된다.  
//* 입력 :
//*   clsNm - 체크박스 클래스 명
//* 반환 : "||" 로 sno||이름||이메일 주소를 묶어서 동적 생성한 폼에 넣어 배열 형태로 post submit을 시킨다. 
//----------------------------------------------------------------------
function doEmlSend(clsNm){
	var url = "/section/annc/annc_write.html";
	
	if($("#__comMailSendForm").length >0){ //form이 존재하면 삭제
		$("#__comMailSendForm").remove();
	}	
	var form = $('<form id="__comMailSendForm" name="__comMailSendForm"></form>');
	
  form.attr('action', url);
  form.attr('method', 'post');
  form.appendTo('body');
  
  var biz = "";
  var chk_num = 0;
  $("[class*='"+clsNm+"']:checked").each(function(){
		var tdObj =  $(this).parent(); //$(this).closest("td");
		var sno = $(this).val();
		var nm	= tdObj.find("#mbr_nm").val();
		var eml	= tdObj.find("#mbr_eml").val();
		var mail_tgt = sno+"||"+nm+"||"+eml+"||"+bizSno;

		var tgt = $("<input type='hidden' value="+mail_tgt+" name='mail_tgt[]'>");
		form.append(tgt);
		
		var bizSno = "";
		if(tdObj.find("#bizcnst_sno").length > 0){
			bizSno = tdObj.find("#bizcnst_sno").val();
			biz = $("<input type='hidden' value="+bizSno+" name='bizcnst_sno'>");
		}
		chk_num++;
	});
  
  if(chk_num == 0){
	  alert("선택된 대상이 없습니다.");
	  return false;
  }else{
	  form.append(biz);
	  form.submit();
  }
}

/*****************************************************************************
* file 확장자 체크 함수 
* 체크를 위한 object를 array 형태로 받을 수 있다.
* var tgtFile = [];
* tgtFile.push({"bizno_bizwrite" : "pdf,jpg,gif,png,ppt,pptx"}); //input[name] : 체크 확장자 
* 변수를 안받으면 기본 IMG_에 대한 체크만 하도록 한다. 
* return true/false
*****************************************************************************/
function checkFileExt(tgt_file_array){
	var file_return = true;
	var filename 	= "";
	var ext 		= "";
	
	//배열로 만든 변수가 있다. 
	if(typeof(tgt_file_array) != 'undefined'){
		if(tgt_file_array.length !== 0){
			$.each( tgt_file_array, function( i, obj ) {
				$.each( obj, function( name, chkExtStr ) {
					//alert( name + ": " + chkExtStr );
					var label_nm 	= "";
					var now_tgt		= "";
					if (name.indexOf('[id')) {
						now_tgt		= $(name);				
						
						//체크할 대상이 있고, 체크할 확장자 문자열이 있을 때만 체크하자
						now_tgt.each(function () { //여러개 파일 인 경우..
							if(typeof($(this).val()) != 'undefined' && typeof(chkExtStr) != 'undefined'){
								if($(this).val() != ""){
									label_nm 	= $(this).attr("tgt-name");
									
									filename 	= $(this).val().split('\\').pop();
						 			ext 		= $(this).val().split('.').pop().toLowerCase();
						 			//alert(filename+" : "+ext+"// "+chkExtStr);
									if(!chkExtStr.match(ext)){ //포함되어있지않을때
						 	 			alert(label_nm +'은(는) '+chkExtStr+' 파일만 업로드 할수 있습니다.');
						 	 			file_return = false;
						 	 			return false;
						 	 		}
								}
							}
						});
						
					} else {
						label_nm 	= $("label[for='"+name+"']").text();
						now_tgt		= $("input[name='"+name+"']").val();
						
						//체크할 대상이 있고, 체크할 확장자 문자열이 있을 때만 체크하자
						if(typeof(now_tgt) != 'undefined' && typeof(chkExtStr) != 'undefined'){
							filename 	= now_tgt.split('\\').pop();
				 			ext 		= now_tgt.split('.').pop().toLowerCase();
				 			//alert(filename+" : "+ext+"// "+chkExtStr);
							if(!chkExtStr.match(ext)){ //포함되어있지않을때
				 	 			alert(label_nm +'은(는) '+chkExtStr+' 파일만 업로드 할수 있습니다.');
				 	 			file_return = false;
				 	 			return false;
				 	 		}
						}
					}
					
//					var label_nm 	= $("label[for='"+name+"']").text();
//					var now_tgt		= $('input[name='+name+']').val();
					
//					//체크할 대상이 있고, 체크할 확장자 문자열이 있을 때만 체크하자
//					if(typeof(now_tgt) != 'undefined' && typeof(chkExtStr) != 'undefined'){
//						filename 	= now_tgt.split('\\').pop();
//			 			ext 		= now_tgt.split('.').pop().toLowerCase();
//			 			//alert(filename+" : "+ext+"// "+chkExtStr);
//						if(!chkExtStr.match(ext)){ //포함되어있지않을때
//			 	 			alert(label_nm +'은 '+chkExtStr+' 파일만 업로드 할수 있습니다.');
//			 	 			file_return = false;
//			 	 			return false;
//			 	 		}
//					}
				});
			});
		}
	}
	
	if(file_return){ //위에서 체크가 정상적으로 끝나고, 기본적인 이미지에 대한 체크도 여기서 하자...
		//배열 변수가 있든 없든 이미지에 대한 확장자 체크는 기본적으로 하도록 한다. 
		$('input[type=file]').each(function(i){
			var tgt_name = $(this).attr("name");
	 		if($(this).val() != "" ){
	 			filename = $(this).val().split('\\').pop();
	 			ext = $(this).val().split('.').pop().toLowerCase();
	 			
	 			if(tgt_name.indexOf('IMG_') != -1){ //포함할때는
	 				if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
		 				alert('이미지 형식은 gif, png, jpg 파일만 업로드 할수 있습니다.');
		 	 			file_return = false;
		 	 			return false;
		 	 		}
	 			}
	 		}
	 	});
	}
	
	return file_return;		
}
/*****************************************************************************
* 팝업창
*****************************************************************************/
function popUpwindowOpen(route, winnm, top, left, width, height, scrollbars) {
	/*
	route : 경로 or 파일명
	winnm : 윈도우 이름
	top : 새창을 띄울 위쪽 좌표
	left : 새창을 띄울 왼쪽 좌표 ex) top=0, left=0 (창을 왼쪽 상단 구석에 고정)
	width : 창 가로길이
	height : 창 세로길이
	scrollbars : 스크롤바 유무 [no, yes]
	 */
	if (route == null || "".equals(route)) {
		alert("팝업창이 지정되지 않았습니다");
	}

	if (top == null || "".equals(top)) {
		top = 100;
	}

	if (left == null || "".equals(left)) {
		left = 100;
	}

	if (width == null || "".equals(width)) {
		width = 500;
	}

	if (height == null || "".equals(height)) {
		height = 500;
	}

	if (scrollbars == null || "".equals(scrollbars)) {
		scrollbars = yes;
	}
	
	var url = encodeURIComponent(window.location.href);
	if (url.indexOf('?') != -1) {
		url = url.substring(0, url.indexOf('?'));
	}
	if (route.indexOf('?') == -1) {
		route += '?openerurl=' + url;
	} else {
		route += '&openerurl=' + url;
	}
	
	pop[i] = window.open(route, winnm, "top=" + top + ", left=" + left+ ", width=" + width + ", height=" + height + ", scrollbars=" + scrollbars + "");
	i++;
}

/** 
 * 파일명에서 확장자명 추출 
 * @param filename 파일명 
 * @returns _fileExt 확장자명 
 */ 
function getExtensionOfFilename(filename) { 
	  var _fileLen = filename.length; 
	  /** 
	   *  lastIndexOf('.') 
	   *  뒤에서부터 '.'의 위치를 찾기위한 함수 
	   *  검색 문자의 위치를 반환한다. 
	   *  파일 이름에 '.'이 포함되는 경우가 있기 때문에 lastIndexOf() 사용 
	   */ 
	  var _lastDot = filename.lastIndexOf('.')+1; // 확장자 명만 추출한 후 소문자로 변경 
	  var _fileExt = filename.substring(_lastDot, _fileLen).toLowerCase(); 
	  
	  return _fileExt; 
}

/*********************************************************************
 * 다음 지도 api
 *********************************************************************/
function execDaumPostcode() {
   daum.postcode
         .load(function() {
            new daum.Postcode(
                  {

                     oncomplete : function(data) {
                        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

                        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기
                        // 한다.
                        var fullAddr = ''; // 최종 주소 변수
                        var extraAddr = ''; // 조합형 주소 변수

                        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                        if (data.userSelectedType === 'R') { // 사용자가
                           // 도로명
                           // 주소를
                           // 선택했을
                           // 경우
                           fullAddr = data.roadAddress;

                        } else { // 사용자가 지번 주소를 선택했을 경우(J)
                           fullAddr = data.jibunAddress;
                        }

                        // 사용자가 선택한 주소가 도로명 타입일때 조합한다.
                        if (data.userSelectedType === 'R') {
                           // 법정동명이 있을 경우 추가한다.
                           if (data.bname !== '') {
                              extraAddr += data.bname;
                           }
                           // 건물명이 있을 경우 추가한다.
                           if (data.buildingName !== '') {
                              extraAddr += (extraAddr !== '' ? ', '
                                    + data.buildingName
                                    : data.buildingName);
                           }
                           // 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다.
                           fullAddr += (extraAddr !== '' ? ' ('
                                 + extraAddr + ')' : '');
                        }

                        // 우편번호와 주소 정보를 해당 필드에 넣는다.
                        document.getElementById('postcode').value = data.zonecode; // 5자리
                       
                        // 새우편번호 사용
                        document.getElementById('address').value = fullAddr;

                        // 커서를 상세주소 필드로 이동한다.
                        document.getElementById('detail_address').focus();
                     }
               }).open();
         });
}


function timeClock() {
	
	var today = new Date();
	var week = new Array('일', '월', '화', '수', '목', '금', '토');

	var mm = today.getMonth()+1; // 월
	var dd = today.getDate(); // 일
	//var yyyy = today.getFullYear();  // 년도

	var hh = today.getHours(); // 시
	var nn = today.getMinutes(); // 분
	var ss = today.getSeconds(); // 초

	if(parseInt(nn) < 10){
		nn  = '0' + nn;
	}

	$('.today_date').html(mm + '월 ' + dd + '일 ' + week[today.getDay()] + '요일');
	$('.today_time').html(hh + ' : ' + nn );

	setTimeout('timeClock()', 1000);

}

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
};
