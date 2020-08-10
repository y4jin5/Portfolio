var INPUT_MIN_NUMBER = -Math.pow(10, 13);
var INPUT_MAX_NUMBER = Math.pow(10, 14);

//----------------------------------------------------------------------
// 아래 함수가 준비 되어야 함
// validateRno - 주민등록번호 유효성 체크
// validateBsrno - 사업자등록번호 유효성 체크
//----------------------------------------------------------------------

function pick__(arg, def) { 
   return ((typeof arg == 'undefined' || arg == null) ? def : arg); 
} 
 
function trim__(str) {
	if (str == null) return '';
	return str.replace(/(^\s*)|(\s*$)/gi, "");
}


// UTF-8 문자열의 Byte 크기 구하기.
// 주의!! : UTF-8 웹 페이지에서만 정상작동한다. EUC-KR에서는 작동하지 않는다.
// 참고 자료 : http://ko.wikipedia.org/wiki/UTF-8 위키 백과의 UTF-8 항목
// 테스트 환경 : IE6, IE7, FF 2.0, Safari 3, Opera 9.2
// 각 문자의 유니코드 코드를 분석하여, UTF-8로 변환시 차지하는
// byte 수를 리턴한다.
function __charByteSize(ch) {
	if (ch == null || ch.length == 0) {
		return 0;
	}
	var charCode = ch.charCodeAt(0);
	if (charCode <= 0x00007F) {
		return 1;
	} else if (charCode <= 0x0007FF) {
		return 2;
	} else if (charCode <= 0x00FFFF) {
		return 3;
	} else {
		return 4;
	}
}

// 문자열을 UTF-8로 변환했을 경우 차지하게 되는 byte 수를 리턴한다.
function __stringByteSize(str) {
	if (str == null || str.length == 0) {
		return 0;
	}

	var size = 0;
	for (var i = 0, li = str.length; i < li; i++) {
		size += __charByteSize(str.charAt(i));
	}

	return size;
}

function bytelength__(str) {
	var len = 0;
//	for(var i=0; i < str.length; i++)  {
//		len += (str.charCodeAt(i) > 127?2:1);
//	}
	len = __stringByteSize(str);
	return len;
}

function escape__(str) {
	return (''+str)
		.replace(/&/g, '&amp;')
		.replace(/[.]/g, '&dot;')
		.replace(/[/]/g, '&slash;');
}

function unescape__(str) {
	return (''+str)
		.replace(/&slash;/g, '/')
		.replace(/&dot;/g, '.')
		.replace(/&amp;/g, '&');
}

function getLeftPair__(pairs,objID) {
	var index;

	var src,dst;

	src = "^"+pairs+"^";
	dst = ":"+objID+"^";

	index = src.indexOf(dst);
	if (index == -1) return null;

	src = src.substr(0,index);

	index = src.lastIndexOf("^");
	if (index == -1) return null;
	if (index+1 == src.length) return null;

	return src.substr(index+1);
}

function getRightPair__(pairs,objID) {
	var index;

	var src,dst;

	src = "^"+pairs+"^";
	dst = "^"+objID+":";

	index = src.indexOf(dst);
	if (index == -1) return null;

	src = src.substr(index + dst.length);

	index = src.indexOf("^");
	if (index == -1) return null;
	if (index == 0) return null;

	return src.substr(0,index);
}

//* tab 은 사용하지 않지만 일단 그냥 둔다
var dp_all_tabclass = 'showLayer:hideLayer^NonLayer:BlcLayer';
var dp_all_tabs = {}; //* jobj array

//* Map__
//* 사용볍
//* var map = new Map__();
//* map.put("key", value);
//* map.get("key");
Map__ = function() {
	this.map = new Object();
};
Map__.prototype = {
	put : function(key, value) {
		this.map[key] = value;
	},
	get : function(key) {
		return this.map[key];
	},
	containsKey : function(key) {
		return key in this.map;
	},
	containsValue : function(value) {
		for ( var prop in this.map) {
			if (this.map[prop] == value)
				return true;
		}
		return false;
	},
	isEmpty : function(key) {
		return (this.size() == 0);
	},
	clear : function() {
		for ( var prop in this.map) {
			delete this.map[prop];
		}
	},
	remove : function(key) {
		delete this.map[key];
	},
	keys : function() {
		var keys = new Array();
		for ( var prop in this.map) {
			keys.push(prop);
		}
		return keys;
	},
	values : function() {
		var values = new Array();
		for ( var prop in this.map) {
			values.push(this.map[prop]);
		}
		return values;
	},
	size : function() {
		var count = 0;
		for ( var prop in this.map) {
			count++;
		}
		return count;
	}
};

//* 객체의 attribute 저장소
//* DOM object 의 setAttribute 는 data 를 string 으로 보관하고 있다.
//* 원래의 요청 형태로 값을 보관하기 위해 별도의 저장소를 만든다.
//* 사용예
//* setAttribute__(document, 'aa', function () {});
//* alert(typeof getAttribute__(document, 'aa'));
//* alert(typeof getAttribute__(document, 'bb'));
var dp_all_attr_map = new Map__();
var dp_all_attr_map_key = 1;
function setAttribute__(obj, key, val) {
	var mapKey = pick__($(obj).data("__map_key__"), '');
	if (mapKey == '') {
		mapKey = dp_all_attr_map_key ++;
		$(obj).data("__map_key__", mapKey);
	}
	
	var map = dp_all_attr_map.get(mapKey);
	if (typeof map == 'undefined') {
		map = new Map__();
		dp_all_attr_map.put(mapKey, map);
	}
	map.put(key, val);
}
function getAttribute__(obj, key) {
	var mapKey = pick__($(obj).data("__map_key__"), '');
	if (mapKey == '') {
		mapKey = dp_all_attr_map_key ++;
		$(obj).data("__map_key__", mapKey);
	}
	
	var map = dp_all_attr_map.get(mapKey);
	if (typeof map == 'undefined') {
		return map;
	}
	return map.get(key);
}

//----------------------------------------------------------------------
//* obj_ 가 포함한 탭 객체를 찾는다.
//* obj_ : obj or jobj
//* return : obj_ 를 포함하고 있는 탭의 jobj
//----------------------------------------------------------------------
function findTab__(obj_) {
	var obj = $(obj_);
	while (obj.length != 0) {
		var className = obj.attr("class");
		if (className != null) {
			if (('^'+dp_all_tabclass+'^').indexOf('^'+className+':') != -1 ||
				('^'+dp_all_tabclass+'^').indexOf(':'+className+'^') != -1
				) {
				return obj;
			}
		}
		obj = obj.parent();
	}
	
	return $(null);
}

//----------------------------------------------------------------------
//* a_, b_ 의 sibling 여부를 확인한다.
//* a_, b_ : obj or jobj
//* a_ 가 b_ 의 previousSibling 이거나 nextSibling 인지 여부
//----------------------------------------------------------------------
function isSibling__(a_,b_) {
	var a = $(a_);
	var b = $(b_);
	if (a.length == 0 || b.length == 0) return false;

	var aa;

	aa = a;
	while (typeof(aa.attr("previousSibling")) != 'undefined') {
		if (aa.attr("previousSibling") == b) return true;
		aa = aa.attr("previousSibling");
	}

	aa = a;
	while (typeof(aa.attr("nextSibling")) != 'undefined') {
		if (aa.attr("nextSibling") == b) return true;
		aa = aa.attr("nextSibling");
	}

	return false;
}

//----------------------------------------------------------------------
//* tab_ 을 on 상태로 만듬
//* tab_ : obj or jobj
//* return : void
//----------------------------------------------------------------------
function changeTab__(tab_) {
	var tab = $(tab);
	if (tab.length != 0) {
		var lclassname = tab.attr("class");
		var rclassname = '';
		rclassname = getLeftPair__(dp_all_tabclass,lclassname);
		if (rclassname == null)
			rclassname = getRightPair__(dp_all_tabclass,lclassname);

		if (rclassname != null) {
			var tabs = dp_all_tabs;
			var showhidelayers = '';
			var idnclass;

			for (var i=0;i < tabs.length;i++) {
				if ($(tabs[i]).length == 0) continue;

				if ($(tabs[i]).attr("class") != lclassname &&
					$(tabs[i]).attr("class") != rclassname) continue;

				if (tab != $(tabs[i]) && !isSibling__(tab,$(tabs[i]))) continue;

				if (showhidelayers != '') showhidelayers += ',';
				if ($(tabs[i]) == tab)
					showhidelayers += '\''+$(tabs[i]).attr("id")+'\',\'\',\'show\'';
				else
					showhidelayers += '\''+$(tabs[i]).attr("id")+'\',\'\',\'hide\'';
			}

			if (lclassname.indexOf('show') != -1 || lclassname.indexOf('hide') != -1) {
				if (showhidelayers != '' && typeof(MM_showHideLayers) != 'undefined') {
					showhidelayers = 'MM_showHideLayers('+showhidelayers+')';
					eval(showhidelayers);
				}
			} else {
				if (showhidelayers != '' && typeof(MM_SHLayers) != 'undefined') {
					showhidelayers = 'MM_SHLayers('+showhidelayers+')';
					eval(showhidelayers);
				}
			}
		}
	}
}

//----------------------------------------------------------------------
//* obj_ 의 focus 지정
//* obj_ : jobj
//* bFocus_ : focus 여부. default 는 true
//----------------------------------------------------------------------
function selectAll__(obj_, bFocus_) {
	var obj = $(obj_);
	var bFocus = pick__(bFocus_, true);
	
	if (obj.length == 0) return ;
	
//	var tagName = obj.prop("tagName");
	var type = obj.prop("type");
	var display = obj.css("display");
	var disabled = obj.prop("disabled");
	var readOnly = obj.prop("readOnly");
	
	if (type != 'hidden' && display != 'none' && disabled != true) {
		if (bFocus) {
			if (document.activeElement != null &&
				document.activeElement != obj[0]
				) {
				var tag = document.activeElement.tagName;
				if (tag == null) tag = "";
				tag = tag.toLowerCase();

				if (tag == 'input' ||
					tag == 'select' ||
					tag == 'textarea') {
					if (document.selection) {
						document.selection.empty();
					}
					$(document.activeElement).blur();
				}
			}

			var tab = findTab__(obj);

			changeTab__(tab);

			obj.focus();
		}
		obj.select();
	}
}

//----------------------------------------------------------------------
//* 년도 입력이 정확한지 확인
//* v : 년도 입력값
//* return : 수정된 년도 입력값
//----------------------------------------------------------------------
function validateYear__(v) {
	v = v.replace(/[^0-9]/g,'');
	if (v.length!=4) {
		return '';
	} else {
		var d=new Date(parseInt(v.substr(0,4),10),0,1);
//		var yy=d.getYear();
		var yy=d.getFullYear();
		if (yy>99) yy='0000'+yy; else yy='0000'+(1900+yy);
		yy=yy.substr(yy.length-4,4);
		v=yy;
	}

	return v;
}

//----------------------------------------------------------------------
//* 날짜 입력이 정확한지 확인
//* v : 날짜 입력값
//* sep : 구분자
//* return : 수정된 날짜 입력값
//----------------------------------------------------------------------
function validateDate__(v,sep) {
	v = v.replace(/[^0-9]/g,'');
	if (v.length!=8) {
		return '';
	} else {
		var sep_ = '';
		if (sep != null) sep_=sep;

		var d=new Date(parseInt(v.substr(0,4),10),parseInt(v.substr(4,2),10)-1,parseInt(v.substr(6,2),10));
//		var yy=d.getYear();
		var yy=d.getFullYear();
		if (yy>99) yy='0000'+yy; else yy='0000'+(1900+yy);
		var mm='00'+(d.getMonth()+1);
		var dd='00'+d.getDate();
        yy=yy.substr(yy.length-4,4);
        mm=mm.substr(mm.length-2,2);
        dd=dd.substr(dd.length-2,2);
		v=yy+sep_+mm+sep_+dd;
	}

	return v;
}

//----------------------------------------------------------------------
// 내용 : 날자 입력창의 onblur event handler. 입력된 날자를 유효한 값으로 변경한다.
//   변경할 수 없을 경우에는 oldValue 의 값을 입력한다.
// 입력 :
//   obj_ - event 가 발생되는 날자 입력창 객체(obj or jobj)
//   oldValue - 이전 값
//   permitBlank - 값을 입력하지 않아도 되는지 여부
// 주의 : oldValue 에는 입력을 시작할때의 값이 들어 있어야 한다.
// 이력 : 2003/04/16 생성 (ossong)
//----------------------------------------------------------------------
function adjustInputDate__(obj_,oldValue,permitBlank) {
	
	var obj = $(obj_);
	if (obj.length == 0) return '';
	
	var v;
	v=obj.val().replace(/[^0-9]/g,'');

	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == null) {
		utype = 'date';
	}
	utype = utype.toLowerCase();

	if (utype == 'date') {
		if (v.length!=8) {
			if (permitBlank != null && permitBlank == true && v.length == 0 )  {
				obj.val(v);
				return v;
			}
			v=oldValue;
		} else {
			v = validateDate__(v,'-');
		}
	}
	if (utype == 'dateyyyy') {
		if (v.length!=4) {
			if (permitBlank != null && permitBlank == true && v.length == 0 )  {
				obj.val(v);
				return v;
			}
			v=oldValue;
		} else {
			v = validateYear__(v);
		}
	}
	if (utype == 'time') {
	//	if (v.length!=6) {
	//		if (permitBlank != null && permitBlank == true && v.length == 0 )  {
	//			obj.val(v);
	//			return v;
	//		}
	//		v=oldValue;
	//	} else {
			v = validateTime__(v,false,':');
	//	}
	}
	if (utype == 'timehm') {
	//	if (v.length!=4) {
	//		if (permitBlank != null && permitBlank == true && v.length == 0 )  {
	//			obj.val(v);
	//			return v;
	//		}
	//		v=oldValue;
	//	} else {
			v = validateTime__(v,true,':');
	//	}
	}
	if (utype == 'timeh') {
	//	if (v.length!=2) {
	//		if (permitBlank != null && permitBlank == true && v.length == 0 )  {
	//			obj.val(v);
	//			return v;
	//		}
	//		v=oldValue;
	//	} else {
			v = validateTime__(v,'timeh',':');
	//	}
	}
	obj.val(v);
	return v;
}

//----------------------------------------------------------------------
//* 날짜 입력의 앞뒤 값을 비교
//* obj_ : 날짜 입력이 끝난 객체. obj or jobj
//* 앞 뒤 날짜가 크기가 바뀌었을 경우 입력값을 뒤집는다.
//----------------------------------------------------------------------
function checkDatePair__(obj_) {
	var obj = $(obj_);
	if (obj.length == 0) return ;
	
	var len = dp_all_datePairs.length;
	var i;
	for (i = 0; i < len; i ++) {
		if (dp_all_datePairs[i].leftDt[0] == obj[0] ||
			dp_all_datePairs[i].leftHm[0] == obj[0] ||
			dp_all_datePairs[i].rightDt[0] == obj[0] ||
			dp_all_datePairs[i].rightHm[0] == obj[0] ||
			false) {
			break;
		}
	}

	if (i == len) {
		return ;
	} 

	if (obj.val() == '') {
		var subObj = null;
		if (dp_all_datePairs[i].leftDt[0] == obj[0]) {
			subObj = dp_all_datePairs[i].leftHm;
		}
		if (dp_all_datePairs[i].leftHm[0] == obj[0]) {
			subObj = dp_all_datePairs[i].leftDt;
		}
		if (dp_all_datePairs[i].rightDt[0] == obj[0]) {
			subObj = dp_all_datePairs[i].rightHm;
		}
		if (dp_all_datePairs[i].rightHm[0] == obj[0]) {
			subObj = dp_all_datePairs[i].rightDt;
		}
		if (subObj != null) {
			subObj.val('');
		}
		return ;
	}

	var rightDate, leftDate, rightHm, leftHm, tempDate;

	rightDate = dp_all_datePairs[i].rightDt;
	leftDate = dp_all_datePairs[i].leftDt;
	rightHm = dp_all_datePairs[i].rightHm;
	leftHm = dp_all_datePairs[i].leftHm;

	if (rightDate.length != 0 && leftDate.length != 0 &&
		rightDate.val() != '' && leftDate.val() != '' &&
		((rightHm.length == 0 && leftHm.length == 0) || (
		rightHm.length != 0 && leftHm.length != 0 &&
		rightHm.val() != '' && leftHm.val() != '')) &&
		(rightDate.val() + (rightHm.length == 0 ? '' : rightHm.val()))< (leftDate.val() + (leftHm.length == 0 ? '' : leftHm.val()))) {
		tempDate = rightDate.val();
		rightDate.val(leftDate.val());
		leftDate.val(tempDate);
		if (rightHm.length != 0 && leftHm.length != 0) {
			tempDate = rightHm.val();
			rightHm.val(leftHm.val());
			leftHm.val(tempDate);
		}
	}
}

function dp_all_ownReturnFunction(obj_) {
	var obj = $(obj_);
	if (obj.length != 0) {
		checkDatePair__(obj);
	}
}

//----------------------------------------------------------------------
//* 시간 입력이 정확한지 확인
//* v : 시간 입력값
//* short : true - hh:mm, false(default) - hh:mm:ss
//* sep : 구분자
//* return : 수정된 시간 입력값
//----------------------------------------------------------------------
function validateTime__(v,short_,sep) {
	v = v.replace(/[^0-9]/g,'');
	var short = pick__(short_, false);
	
	if (v.length == 1) {
		v = '0' + v;
	}
	if (short != 'timeh') {
		if (v.length == 2) {
			v  += '00';
		}
		if (v.length == 3) {
			v = v.substring(0, 2) + '0' + v.substring(2);
		}
	}
	if (short == false) {
		if (v.length == 4) {
			v  += '00';
		}
		if (v.length == 5) {
			v = v.substring(0, 4) + '0' + v.substring(4);
		}
	}
	
	if ((short == false && v.length!=6)||
		(short == true  && v.length!=4)||
		(short == 'timeh'  && v.length!=2)) {
		return '';
	} else {
		var sep_ = '';
		if (sep != null) sep_=sep;
		
		v += '0000';

		var d=new Date(0,0,0,parseInt(v.substr(0,2),10),parseInt(v.substr(2,2),10),parseInt(v.substr(4,2),10));
		var hh='00'+d.getHours();
		var mm='00'+d.getMinutes();
		var ss='00'+d.getSeconds();
        hh=hh.substr(hh.length-2,2);
        mm=mm.substr(mm.length-2,2);
        ss=ss.substr(ss.length-2,2);

		v=hh+(short=='timeh'?'':(sep_+mm+(short?'':(sep_+ss))));
	}

	return v;
}

//* eternal @ http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
function getCaretPosition(obj) {

	obj = $(obj);
	if (obj.length == 0) return ;
	
    var ctrl = obj[0]; //param
    
    var CaretPos = 0;
    // IE Support
    if (document.selection) {

        ctrl.focus ();
        var Sel = document.selection.createRange ();

        Sel.moveStart ('character', -ctrl.value.length);

        CaretPos = Sel.text.length;
    }
    // Firefox support
    else if (ctrl.selectionStart || ctrl.selectionStart == '0')
        CaretPos = ctrl.selectionStart;

    return (CaretPos);

}

//* mcpDESIGNS @ http://stackoverflow.com/questions/512528/set-cursor-position-in-html-textbox
function setCaretPosition(obj, caretPos) {
	obj = $(obj);
	if (obj.length == 0) return ;
	
    var el = obj[0]; //document.getElementById(elemId);

    el.value = el.value;
    // ^ this is used to not only get "focus", but
    // to make sure we don't have it everything -selected-
    // (it causes an issue in chrome, and having it doesn't hurt any other browser)

    if (el !== null) {

        if (el.createTextRange) {
            var range = el.createTextRange();
            range.move('character', caretPos);
            range.select();
            return true;
        }

        else {
            // (el.selectionStart === 0 added for Firefox bug)
            if (el.selectionStart || el.selectionStart === 0) {
                el.focus();
                el.setSelectionRange(caretPos, caretPos);
                return true;
            }

            else  { // fail city, fortunately this never happens (as far as I've tested) :)
                el.focus();
                return false;
            }
        }
    }
}

//----------------------------------------------------------------------
//■■■ masking
//----------------------------------------------------------------------
function stringtoamount(str) {
	if (str == '') return 0;
	var symbol = str.substring(str.length - 1);
	var onlyDigit = str.replace(/[^-0-9\.]/g,'');
	if (onlyDigit.length == 0) return 0;

	var symbolv = 1;
	switch (symbol) {
	case 'k' : case 'K' : symbolv = Math.pow(10, 3); break;
	case 'm' : case 'M' : symbolv = Math.pow(10, 6); break;
	case 'g' : case 'G' : symbolv = Math.pow(10, 9); break;
	case 't' : case 'T' : symbolv = Math.pow(10, 12); break;
	case 'p' : case 'P' : symbolv = Math.pow(10, 15); break;
	case 'e' : case 'E' : symbolv = Math.pow(10, 18); break;
	}
	if (symbolv != 1) {
		var value; 
		if (onlyDigit.indexOf('.') != -1) {
			value = parseFloat(onlyDigit);
		} else {
			value = parseInt(onlyDigit, 10);
		}
		return value * symbolv;
	}
	return onlyDigit;
}

function amounttostring(vall, symbol, decimal) {
	if (!symbol) return vall;
	if (!decimal) decimal = 0;
	
	var symbol = '';
	if (vall > 0) {
		if (vall % Math.pow(10, 18 - decimal) == 0) {
			vall = vall / Math.pow(10, 18);
			symbol = 'E';
		} else
		if (vall % Math.pow(10, 15 - decimal) == 0) {
			vall = vall / Math.pow(10, 15);
			symbol = 'P';
		} else
		if (vall % Math.pow(10, 12 - decimal) == 0) {
			vall = vall / Math.pow(10, 12);
			symbol = 'T';
		} else
		if (vall % Math.pow(10, 9 - decimal) == 0) {
			vall = vall / Math.pow(10, 9);
			symbol = 'G';
		} else
		if (vall % Math.pow(10, 6 - decimal) == 0) {
			vall = vall / Math.pow(10, 6);
			symbol = 'M';
		} else
		if (vall % Math.pow(10, 3 - decimal) == 0) {
			vall = vall / Math.pow(10, 3);
			symbol = 'K';
		}
	}

	vall = vall + '';
	var vallf = vall;
	
	vall = vall.replace(/^0+/, '');
	vall = vall.replace(/^-0+/, '-');
	
	if (vall == '-') vall = '';
	if (vall == '') {
		vall = '0';
	}
	var sign = vall.substring(0, 1);
	if (sign != '-') {
		sign = '';
	} else {
		vall = vall.substring(1);
	}

	var decimals = (vall + ".").split(".");
	vall = decimals[0];
	if (vall == '') {
		vall = '0';
	}

	var maskStr = "###,###,###,###,###,###,###,###,###,###,###";
	vall = maskOnStr__(maskStr, maskOffDigit__(vall));

	if (decimal > 0) {
		var dmask = "";
		for (i = decimal; i > 0; i --) { 
			dmask += "#";
		}
		var rslt = vall;
		vall = decimals[1];
		vall = maskReverseOnStr__(dmask, maskOffDigit__(vall));
		if (vall != '') {
			rslt += "." + vall;
		}
		vall = rslt;
	}
	vall = sign + vall + symbol;
	
	return vall;
}

function maskOffDigit__(inStr) {
	return inStr.replace(/[^0-9]/g,'');
}

function maskOffEDigit__(inStr) {
	return inStr.replace(/[^A-Za-z0-9]/g,'');
}

function maskOffAmount__(inStr) {
	return stringtoamount(inStr);
}

function maskOnStr__(mask, str) {
	var i = 0;
	var mIndex = mask.length - 1;
	var sIndex = str.length - 1;
	var result = "";

	for (i = 0; i < mask.length; i++) {
		if (sIndex < 0) break;
		if (mask.charAt(mIndex) == '#') {
			if (str.charAt(sIndex) >= '0' && str.charAt(sIndex) <= '9') {
				result = str.charAt(sIndex) + result;
				sIndex--;
				mIndex--;
			} else {
				sIndex--;
			}
		} else
		if (mask.charAt(mIndex) == 'A') {
			if (str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') {
				result = str.charAt(sIndex) + result;
				sIndex--;
				mIndex--;
			} else
			if (str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z') {
				result = str.charAt(sIndex).toUpperCase() + result;
				sIndex--;
				mIndex--;
			} else
			{
				sIndex--;
			}
		} else
		if (mask.charAt(mIndex) == 'a') {
			if (str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') {
				result = str.charAt(sIndex).toLowerCase() + result;
				sIndex--;
				mIndex--;
			} else
			if (str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z') {
				result = str.charAt(sIndex) + result;
				sIndex--;
				mIndex--;
			} else
			{
				sIndex--;
			}
		} else
		if (mask.charAt(mIndex) == '*') {
			if ((str.charAt(sIndex) >= '0' && str.charAt(sIndex) <= '9') ||
				(str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') ||
				(str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z')) {
				result = str.charAt(sIndex) + result;
				sIndex--;
				mIndex--;
			} else
			{
				sIndex--;
			}
		} else
		{
			if (str.charAt(sIndex) == mask.charAt(mIndex)) {
				sIndex--;
			}
			result = mask.charAt(mIndex) + result;
			mIndex --;
		}
	}
	return result;
}

/**
  * 해당 텍스트 필드(금액 위주)를 주어진 Mask형태로 입력받는다.
  * @param maskStr 입력 Mask
  * Mask Sample : 마스크는 반드시 '#'로 시작해야 함.
  *               8자리 Currency형태 : "##,###,###",
  *               주민등록번호       : "######-#######-##"
  *               전화번호           : "####)###-####"
  *               날짜               : "##/##/##" or "####/##/##"
  * @param inObj 텍스트필드
  */
function maskField__ (maskStr, inObj_, strip_) {
	var inObj = $(inObj_);
	var maxLength = inObj.prop("maxLength");
	if (maxLength > 0 && maxLength < maskStr.length) maskStr = maskStr.substr(maskStr.length - maxLength);
	if (maskStr.indexOf('A') != -1 ||
		maskStr.indexOf('a') != -1 ||
		maskStr.indexOf('*') != -1)
		inObj.val(maskOnStr__(maskStr, pick__(strip_, true) ? maskOffEDigit__(inObj.val()) : inObj.val()));
	else
		inObj.val(maskOnStr__(maskStr, pick__(strip_, true) ? maskOffDigit__(inObj.val()) : inObj.val()));
}

function maskReverseOnStr__(mask, str) {
	var i = 0;
	var mIndex = 0;
	var sIndex = 0;
	var result = "";

	for (i = 0; i < mask.length; i++) {
		if (sIndex >= str.length) break;
		if (mask.charAt(mIndex) == '#') {
			if (str.charAt(sIndex) >= '0' && str.charAt(sIndex) <= '9') {
				result = result + str.charAt(sIndex);
				sIndex++;
				mIndex++;
			} else {
				sIndex++;
			}
		} else
		if (mask.charAt(mIndex) == 'A') {
			if (str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') {
				result = result + str.charAt(sIndex);
				sIndex++;
				mIndex++;
			} else
			if (str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z') {
				result = result + str.charAt(sIndex).toUpperCase();
				sIndex++;
				mIndex++;
			} else
			{
				sIndex++;
			}
		} else
		if (mask.charAt(mIndex) == 'a') {
			if (str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') {
				result = result + str.charAt(sIndex).toLowerCase();
				sIndex++;
				mIndex++;
			} else
			if (str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z') {
				result = result + str.charAt(sIndex);
				sIndex++;
				mIndex++;
			} else
			{
				sIndex++;
			}
		} else
		if (mask.charAt(mIndex) == '*') {
			if ((str.charAt(sIndex) >= '0' && str.charAt(sIndex) <= '9') ||
				(str.charAt(sIndex) >= 'A' && str.charAt(sIndex) <= 'Z') ||
				(str.charAt(sIndex) >= 'a' && str.charAt(sIndex) <= 'z')) {
				result = result + str.charAt(sIndex);
				sIndex++;
				mIndex++;
			} else
			{
				sIndex++;
			}
		} else
		{
			if (str.charAt(sIndex) == mask.charAt(mIndex)) {
				sIndex++;
			}
			result = result + mask.charAt(mIndex);
			mIndex ++;
		}
	}
	return result;
}

/**
* 해당 텍스트 필드(스트링 위주)를 주어진 Mask형태로 입력받는다.
* @param maskStr 입력 Mask
* Mask Sample : 마스크는 반드시 '#'로 시작해야 함.
*               8자리 Currency형태 : "##,###,###",
*               주민등록번호       : "######-#######-##"
*               전화번호           : "####)###-####"
*               날짜               : "##/##/##" or "####/##/##"
* @param inObj 텍스트필드
*/
function maskReverseField__(maskStr, inObj_, strip_) {
	var inObj = $(inObj_);
	if (maskStr.indexOf('A') != -1 ||
		maskStr.indexOf('a') != -1 ||
		maskStr.indexOf('*') != -1)
		inObj.val(maskReverseOnStr__(maskStr, pick__(strip_, true) ? maskOffEDigit__(inObj.val()) : inObj.val()));
	else
		inObj.val(maskReverseOnStr__(maskStr, pick__(strip_, true) ? maskOffDigit__(inObj.val()) : inObj.val()));
}

//************************************************************* OBJECT CONTROL

function tofirstobj__(obj_) {
	var obj = $(obj_);
	
	if (obj.length == 0) return ;
	
	var inputs = $(":input:not(:hidden)", obj.closest('form')); 
	inputs.eq(0).focus(); 
}

function tolastobj__(obj_) {
	var obj = $(obj_);
	
	if (obj.length == 0) return ;
	
	var inputs = $(":input:not(:hidden)", obj.closest('form')); 
	inputs.eq(inputs.length - 1).focus(); 
}

function toprevobj__(obj_) {
	var obj = $(obj_);
	
	if (obj.length == 0) return ;
	
	var inputs = $(":input:not(:hidden)", obj.closest('form')); 
	inputs.eq(inputs.index(obj) - 1).focus(); 
}

function tonextobj__(obj_) {
	var obj = $(obj_);
	
	if (obj.length == 0) return ;
	
	var inputs = $(":input:not(:hidden)", obj.closest('form')); 
	inputs.eq((inputs.index(obj) + 1) % inputs.length).focus(); 
}


function DatePair__(leftDt, leftHm, rightDt, rightHm) {
	this.leftDt = $(leftDt);
	this.leftHm = $(leftHm);
	this.rightDt = $(rightDt);
	this.rightHm = $(rightHm);
}

var dp_all_datePairs = new Array();

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//기간 입력 필드를 초기화 함
//	@return 없음
//ex) clearDatePairs();
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function clearDatePairs() {
	dp_all_datePairs.length = 0;
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//기간 입력 필드를 지정함
//	@param pairs - 시작과 끝 필드명. "from_field_name:to_field_name" 형식
//	@return 없음
//ex) addDatePairs("aplBgnDt:aplEndDt");
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function addDatePairs(leftDt, leftHm, rightDt, rightHm) {
	dp_all_datePairs[dp_all_datePairs.length] = new DatePair__(leftDt, leftHm, rightDt, rightHm);
}

function submitall__() {
	var thiz = $(this);
	var submitonce = pick__(getAttribute__(obj[0], "submitonce"), '');
	var submitted = pick__(getAttribute__(obj[0], "submitted"), false);
	if (submitted != true && submitted != false) {
		submitted = submitted == 'true';
	}

	if (submitonce != '') {
		if (submitted) {
			alert(submitonce);
			return ;
		}
		setAttribute__(thiz[0], "submitted", true);
	}
}

function onsubmitall__(event) {
	var obj = event.target;
	if (obj.length == 0) return false;

	var submitonce = pick__(getAttribute__(obj[0], "submitonce"), '');
	var submitted = pick__(getAttribute__(obj[0], "submitted"), false);
	if (submitted != true && submitted != false) {
		submitted = submitted == 'true';
	}
	if (submitonce != '') {
		if (submitted) {
			alert(submitonce);
			return false;
		}

		setAttribute__(obj[0], "submitted", true);

		return true;
	}
	return true;
}

var blurin__ = false;
var blurinfocus__ = null;

function onfocusall__(event) {
	if (blurin__) blurinfocus__ = event.target;
	else blurinfocus__ = null;

	var obj = $(event.target);
	if (obj.length == 0) return ;
	
	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == '') return ;
	utype = utype.toLowerCase();

	obj.oldValue = obj.value ;
	obj.oldValue4Change = obj.value ;
	obj.select();
}

function onblurall__(event) {

	blurin__ = true;
	if (blurinfocus__ != null && blurinfocus__ == event.target) {
		blurin__ = false;
		blurinfocus__ = null;
		return ;
	}
	blurinfocus__ = null;

	var obj = $(event.target);
	if (obj.length == 0) {
		blurin__ = false;
		blurinfocus__ = null;
		return ;
	}
	
	if (!checkObj_always_true__(obj)) {
		if (event && event.preventDefault) event.preventDefault();
		blurin__ = false;
		blurinfocus__ = null;
		return ;
	}

	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == '') {
		blurin__ = false;
		blurinfocus__ = null;
		return ;
	}

	utype = utype.toLowerCase();

	if (utype == 'amount') {
		var symbol = pick__(getAttribute__(obj[0], "symbol"), false);
		var decimal = pick__(getAttribute__(obj[0], "decimal"), 0);
		var val = obj.val();
		if (val == '') {
			val = '0'
		}
		sign = val.substring(0, 1);
		if (sign == '-') {
			//* TODO 좀 이상하네 (20131105)
			if (val.substring(1).replace(/[1-9]/g,'x').indexOf('x') == -1) {
				val = val.substring(1);
			}
		}
		if (val == '') {
			val = '0'
		}
		val = amounttostring(stringtoamount(val), symbol, decimal);
		obj.val(val);
	} 

	if (utype == 'date' ||
		utype == 'dateyyyy' ||
		utype == 'time' ||
		utype == 'timehm' ||
		utype == 'timeh') {
		adjustInputDate__(obj,obj.oldValue,true /*obj.required == null*/);

		checkDatePair__(obj);
	}

	if (obj.dp_all_oldonblur != null) this.dp_all_oldonblur();
	if (obj.oldValue4Change != obj.value) {
		obj.oldValue4Change = obj.value;
		obj.trigger('change');
	}
	blurin__ = false;
	blurinfocus__ = null;
}

function onkeydownall__(event) {

	var obj = $(event.target);
	if (obj.length == 0) return ;
	
	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == '') return ;
	utype = utype.toLowerCase();

	var kcode = event.which;

	switch (kcode) {
	case 9 :
		if (checkObj_always_true__(obj)) {
			if (event.shiftKey) {
				toprevobj__(obj);
			} else {
				tonextobj__(obj);
			}
		}
		if (event && event.preventDefault) event.preventDefault();
		break;
	case 107 : // numpad + (next field)
		if (event && event.preventDefault) event.preventDefault();
		break;
	}
}

function onkeypressall__(event) {
	
	var obj = $(event.target);
	if (obj.length == 0) return ;
	
	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == '') return ;
	utype = utype.toLowerCase();

	var kcode = event.which;

	if (utype == '') {
		if (kcode == 43) { // numpad + (next field)
			if (event && event.preventDefault) event.preventDefault();
		}

		return ;
	}

	//* 영숫자 입력 체크
	if (utype == 'numeric' ||
		utype == 'numericdash' ||
		utype == 'rnno' ||
		utype == 'rno' ||
		utype == 'rnopart1' ||
		utype == 'rnopart2' ||
		utype == 'bsmno' ||
		utype == 'bsmnopart1' ||
		utype == 'bsmnopart2' ||
		utype == 'bsmnopart3' ||
		utype == 'zip' ||
		utype == 'telno' ||
		utype == 'telnopart2' ||
		utype == 'telnopart3' ||
		utype == 'ip' ||
		utype == 'maddr' ||
		utype == 'amount' ||
		utype == 'date' ||
		utype == 'dateyyyy' ||
		utype == 'time' ||
		utype == 'timehm' ||
		utype == 'timeh' ||
		utype == 'mbrid' ||
		false) {

		if (event.shiftKey && utype != 'mbrid') {
			if (event && event.preventDefault) event.preventDefault();
			return;
		}
		if (event.altKey) {
			if (event && event.preventDefault) event.preventDefault();
			return;
		}
		if (event.ctrlKey) {
			if (event && event.preventDefault) event.preventDefault();
			return;
		}
		if (kcode > 57/*9*/) {
			//* 영문 대문자 입력가능한 타입 체크. 나머지는 숫자만 입력가능
			if (utype == 'mbrid') {
				if ((kcode >= 65/*A*/ && kcode <= 90/*Z*/) || (kcode >= 97/*a*/ && kcode <= 122/*z*/)) {
					return;
				}
			} else
			if (utype == 'maddr') {
				if ((kcode >= 65/*A*/ && kcode <= 70/*F*/) || (kcode >= 97/*a*/ && kcode <= 102/*f*/)) {
					return;
				}
			}
			
			if (event && event.preventDefault) event.preventDefault();
			return;
		} else if (kcode < 48/*0*/) {
			if (kcode == 8 || kcode == 13 || kcode == 46/*.*/) {
				return;
			} else
			if (utype == 'numericdash') {
				if (kcode == 45/*-*/) {
					return ;
				}
			} else
			if (utype == 'amount') {
				var symbol = pick__(getAttribute__(obj[0], "symbol"), false);
				if (symbol) {
					var ch = String.fromCharCode((96 <= kcode && kcode <= 105) ? kcode - 48 : kcode).toUpperCase();
					if ('KMGTPE'.indexOf(ch) != -1) {
						return ;
					}
				}
				if (kcode == 45/*-*/) {
					if (pick__(getAttribute__(obj[0], "allownegative"), false)) {
						return ;
					}
				}
			}
			if (event && event.preventDefault) event.preventDefault();
			return;
		}
	}

	if (kcode == 43) { // numpad + (next field)
		if (event && event.preventDefault) event.preventDefault();
	}
}

//* 가변 마스크 예제
function genMaskAcno__(v) {
	var len = v.length;
	var temp;

	if (len < 1) return ''; //* 미정
	temp = v.substr(0,1);

	if (temp <= '5') {
		if (len < 4) return '###**********'; //* 미정
		temp = v.charAt(3);
		if ((temp >= 'A' && temp <= 'Z') ||
			(temp >= 'a' && temp <= 'z')) {
			if (len < 13) return '###-AAA-######@'; //* 12자리 외화계좌
			return '###-AAA-######-#'; //* 13자리 외화계좌
		} else {
			if (len < 5) return '###-#*********'; //* 미정
			temp = v.substr(3,2);
			if (temp == '04' ||
				temp == '05' ||
				temp == '06') return '###-##-#####-###'; //* 가상계좌
			if (len<=11) return '###-##-#####-#'; //* 구계좌

			//* 입력중에는 발생하지 않는다.
			//* 값이 이미 채워져 있는 경우에만 해당된다.
			return '###-######-###'; //* 몰라(별단신규때문)
		}
	} else {
		if (len < 3) return '##***********'; //* 미정
		temp = v.substr(0,3);
		if (temp == '926' ||
			temp == '930' ||
			temp == '931' ||
			temp == '946' ||
			temp == '986') return '###-##-#####-#'; //* 구계좌

		if (temp == '948' && ((v+'99999999').substr(3)).replace(/[9 ]/g,'') == '')
			return '###-##-#####-#'; //* 구계좌 - '94899999999'

		return '###-######-###'; //* 신계좌
	}
}

function genMaskIp__(v) {
	var vals = (v + '....').split('.', -1);
	var mask = '';
	for (var i = 0; i < 3; i ++) {
		var len = vals[i].length;
		if (len <= 0 || len > 3) len = 3;
		for (var j = 0; j < len; j ++) {
			mask += "#";
		}
		mask += ".";
	}
	mask += "###";

	return mask;
}

/* 샘플
var dp_all_maskacno = "###-##-#####-#";
var dp_all_maskeacno1 = "###-AAA-######-#";
var dp_all_maskeacno2 = "###-AAA-######";
var dp_all_maskaacno1 = "###-**-*####-#";
var dp_all_maskaacno2 = "###-***-######-#";
var dp_all_maskaacno3 = "###-***-######";
*/

var dp_all_maskrnno1 = "###-##-#####";
var dp_all_maskrnno2 = "######-#######";
var dp_all_maskrno = "######-#######";
var dp_all_maskrnopart1 = "######";
var dp_all_maskrnopart2 = "#######";
var dp_all_maskbsmno = "###-##-#####";
var dp_all_maskbsmnopart1 = "###";
var dp_all_maskbsmnopart2 = "##";
var dp_all_maskbsmnopart3 = "#####";
//var dp_all_maskzip = "###-###";
var dp_all_maskzip = "#####";
var dp_all_maskdate = "####-##-##";
var dp_all_maskdateyyyy = "####";
var dp_all_masktime = "##:##:##";
var dp_all_masktimehm = "##:##";
var dp_all_masktimeh = "##";
var dp_all_maskmbrid = "A#############";
var dp_all_masktelno1 = "##-###-####";
var dp_all_masktelno2 = "##-####-####";
var dp_all_masktelno3 = "###-###-####";
var dp_all_masktelno4 = "###-####-####";
var dp_all_masktelnopart2_3 = "###";
var dp_all_masktelnopart2_4 = "####";
var dp_all_masktelnopart3 = "####";
var dp_all_maskip = "###.###.###.###";
var dp_all_maskmaddr = "**:**:**:**:**:**";
function maskObj__(obj_, event) {
	var obj = $(obj_);
	if (obj.length == 0) return;
	
	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	if (utype == '') return ;
	utype = utype.toLowerCase();

	if (utype == 'rnno') {
		if (maskOffDigit__(obj.val()).length==10) maskReverseField__(dp_all_maskrnno1,obj);
		else maskReverseField__(dp_all_maskrnno2,obj);
	} else
	if (utype == 'rno') {
		maskReverseField__(dp_all_maskrno,obj);
	} else
	if (utype == 'rnopart1') {
		maskReverseField__(dp_all_maskrnopart1,obj);
	} else
	if (utype == 'rnopart2') {
		maskReverseField__(dp_all_maskrnopart2,obj);
	} else
	if (utype == 'bsmno') {
		maskReverseField__(dp_all_maskbsmno,obj);
	} else
	if (utype == 'bsmnopart1') {
		maskReverseField__(dp_all_maskbsmnopart1,obj);
	} else
	if (utype == 'bsmnopart2') {
		maskReverseField__(dp_all_maskbsmnopart2,obj);
	} else
	if (utype == 'bsmnopart3') {
		maskReverseField__(dp_all_maskbsmnopart3,obj);
	} else
	if (utype == 'zip') {
		maskReverseField__(dp_all_maskzip,obj);
	} else
	if (utype == 'telno') {
		if (obj.val().substring(0,2) == '02') {
			if (maskOffDigit__(obj.val()).length == 9)
				maskReverseField__(dp_all_masktelno1,obj);
			else
				maskReverseField__(dp_all_masktelno2,obj);
		} else {
			if (maskOffDigit__(obj.val()).length == 10)
				maskReverseField__(dp_all_masktelno3,obj);
			else
				maskReverseField__(dp_all_masktelno4,obj);
		}
	} else
	if (utype == 'telnopart2') {
		if (maskOffDigit__(obj.val()).length == 3)
			maskReverseField__(dp_all_masktelnopart2_3,obj);
		else
			maskReverseField__(dp_all_masktelnopart2_4,obj);
	} else
	if (utype == 'telnopart3') {
		maskReverseField__(dp_all_masktelnopart3,obj);
	} else
	if (utype == 'ip') {
		maskReverseField__(genMaskIp__(obj.val()),obj,false);
	} else
	if (utype == 'maddr') {
		maskReverseField__(dp_all_maskmaddr,obj);
		obj.val(obj.val().toUpperCase());
	} else
	if (utype == 'ueng') {
		obj.val(obj.val().toUpperCase());
	} else
	if (utype == 'uengkor') {
		obj.val(obj.val().toUpperCase());
	} else
	if (utype == 'amount') {
		var caretpos = 'head';
		var dotpos = obj.val().indexOf('.');
		if (event && event.type == 'keyup') {
			caretpos = getCaretPosition(obj);
			if (dotpos == -1) {
				caretpos = 'head';
			} else 
			if (caretpos > dotpos) {
				caretpos = 'tail';
			}
		}

		var vall = obj.val();
		var vallf = vall;
		
		var symbol = pick__(getAttribute__(obj[0], "symbol"), false);
		if (symbol) {
			symbol = vall.substring(vall.length - 1);
			if ('KMGTPE'.indexOf(symbol) == -1) symbol = '';
			if (event && event.type == 'keyup') {
				var kcode = event.which;
				var ch = String.fromCharCode((96 <= kcode && kcode <= 105) ? kcode - 48 : kcode).toUpperCase();
				if ('KMGTPE'.indexOf(ch) != -1) {
					symbol = (''+ch).toUpperCase();
				}
			}
		} else {
			symbol = '';
		}

		vall = vall.replace(/^0+/, '');
		vall = vall.replace(/^-0+/, '-');
		if (vall == '-') vall = '';
		if (vall == '') vall = '0';

		var sign = vall.substring(0, 1);
		if (sign != '-') {
			sign = '';
		} else {
			vall = vall.substring(1);
		}
		if (!pick__(getAttribute__(obj[0], "allownegative"), false)) {
			sign = '';
		}

		var decimals = (vall + ".").split(".");
		vall = decimals[0];
		if (vall == '') {
			vall = '0';
		}
		
//		if (console && console.log) console.log('vall 1 - ' + vall);
		
		var maskStr = "###,###,###,###,###,###,###,###,###,###,###";
		var maxLength = obj.prop("maxLength");
		if (maxLength > 0) {
			maskStr = maskStr.substr(maskStr.length - obj.prop("maxLength"));
		}
		vall = maskOnStr__(maskStr, maskOffDigit__(vall));

//		if (console && console.log) console.log('vall 2 - ' + vall);

		if (pick__(getAttribute__(obj[0], "decimal"), 0) > 0) {
			var dmask = "";
			for (i = pick__(getAttribute__(obj[0], "decimal"), 0); i > 0; i --) { 
				dmask += "#";
			}
			var rslt = vall;
			vall = decimals[1];
			vall = maskReverseOnStr__(dmask, maskOffDigit__(vall));
			if (vall != '' || (event != null && event.keyCode == 190/*'.'*/)) {
				rslt += "." + vall;
			}
			vall = rslt;
			
//			if (console && console.log) console.log('vall 3 - ' + vall);
		}
		vall = sign + vall + symbol;

//		if (console && console.log) console.log('vall 4 - ' + vall);

		obj.val(vall);

		if (vall != vallf) obj.change();
		
		if (event && event.type == 'keyup') {
			dotpos = obj.val().indexOf('.');
			if (dotpos == -1 || caretpos == 'tail') {
				setCaretPosition(obj, obj.val().length - symbol.length);
			} else {
				setCaretPosition(obj, dotpos);
			}
		}

	} else
	if (utype == 'date') {
		maskReverseField__(dp_all_maskdate,obj);
	} else
	if (utype == 'dateyyyy') {
		maskReverseField__(dp_all_maskdateyyyy,obj);
	} else
	if (utype == 'time') {
		maskReverseField__(dp_all_masktime,obj);
	} else
	if (utype == 'timehm') {
		maskReverseField__(dp_all_masktimehm,obj);
	} else
	if (utype == 'timeh') {
		maskReverseField__(dp_all_masktimeh,obj);
	} else
	if (utype == 'mbrid') {
		maskReverseField__(dp_all_maskmbrid,obj);
	}
}

function onkeyupall__(event) {
	var obj = $(event.target);
	if (event && event.preventDefault) event.preventDefault();

	var utype = pick__(getAttribute__(obj[0], "utype"), '');
	utype = utype.toLowerCase();

	var tag = pick__(obj.prop("tagName"), '');
	tag = tag.toLowerCase();

	var kcode = event.which;
	var controlled = true;
	
	if (kcode==229) {
		return;
	}

	switch (kcode) {
	case  36 : // home
		break;
	case  35 : // end
		break;
	case  27 : // esc
	//	obj.value = '';
	//	controlled = false;
		break;
	case  13 : // enter
		if (true) break;
		if (tag != 'textarea') {
			if (checkObj_always_true__(obj))
				tonextobj__(obj);
		} else controlled = false;
		break;
	case   9 : // tab
	//*	setTabIndexes() 를 이용하여 처리한다
		if (event && event.preventDefault) event.preventDefault();
		break;
	case   16 : // shift + tab ??
	//*	setTabIndexes() 를 이용하여 처리한다
		if (event && event.preventDefault) event.preventDefault();
		break;
	case   8 : // backspace
		controlled = false;
		break;
	case  33 : // pgup
		if (true) break;
		if (tag != 'textarea' && tag != 'select') {
			if (checkObj_always_true__(obj))
				tofirstobj__(obj);
		} else controlled = false;
		break;
	case  34 : // pgdn
		if (true) break;
		if (tag != 'textarea' && tag != 'select') {
			if (checkObj_always_true__(obj))
				tolastobj__(obj);
		} else controlled = false;
		break;
	case  38 : // up
		if (tag != 'textarea' && tag != 'select') {
			if (checkObj_always_true__(obj))
				toprevobj__(obj);
		} else controlled = false;
		break;
	case  40 : // dn
		if (tag != 'textarea' && tag != 'select') {
			if (checkObj_always_true__(obj))
				tonextobj__(obj);
		} else controlled = false;
		break;
	case  37 : // left
		if (true) break;
		if (tag != 'textarea') {
			if (checkObj_always_true__(obj))
				toprevobj__(obj);
		} else controlled = false;
		break;
	case  39 : // right
		if (true) break;
		if (tag != 'textarea') {
			if (checkObj_always_true__(obj))
				tonextobj__(obj);
		} else controlled = false;
		break;
	case  46 : // del
		break;
	case  45 : // ins
		controlled = false;
		break;
	case 144 : // num lock
		controlled = false;
		return ;
	case 107 : // numpad + (next field)
		if (checkObj_always_true__(obj))
			toprevobj__(obj);
		if (event && event.preventDefault) event.preventDefault();
		break;
	default :
		controlled = false;
		break;
	}

	//* 입력할 때마다 뭔가 하고 싶을 때 처리		
//	//* numpad insert 키 누르면 000 을 추가해 줌
//	if (utype == 'amount') {
//		var mask = "###,###,###,###,###,###,###,###,###,###,###";
//		if (event.keyCode == 110 ) {
//			var iIndex;
//			iIndex=obj.value.indexOf('.');
//			if (iIndex!=-1) {
//				var tempStr;
//
//				tempStr = obj.value.replace(/[.]+/,'.').replace(/[.]/g,'000');
//				if (maskOnStr__(mask,maskOffDigit__(tempStr)).length<=obj.maxLength) obj.value=tempStr;
//				else {
//					tempStr = obj.value.replace(/[.]+/,'.').replace(/[.]/g,'00');
//					if (maskOnStr__(mask,maskOffDigit__(tempStr)).length<=obj.maxLength) obj.value=tempStr;
//					else {
//						tempStr = obj.value.replace(/[.]+/,'.').replace(/[.]/g,'0');
//						if (maskOnStr__(mask,maskOffDigit__(tempStr)).length<=obj.maxLength) obj.value=tempStr;
//					}
//				}
//			}
//		}
//	}

	if (!controlled) {
		maskObj__(obj, event);
		
		var value = obj.val();

		if (utype == 'rnno') {
			if (value.length == dp_all_maskrnno2.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'rno') {
			if (value.length == dp_all_maskrno.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'rnopart1') {
			if (value.length == dp_all_maskrnopart1.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'rnopart2') {
			if (value.length == dp_all_maskrnopart2.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'bsmno') {
			if (value.length == dp_all_maskbsmno.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'bsmnopart1') {
			if (value.length == dp_all_maskbsmnopart1.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'bsmnopart2') {
			if (value.length == dp_all_maskbsmnopart2.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'bsmnopart3') {
			if (value.length == dp_all_maskbsmnopart3.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'zip') {
			if (value.length == dp_all_maskzip.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'telno') {
			if (value.length == dp_all_masktelno4.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'telnopart2') {
			if (value.length == dp_all_masktelnopart2_4.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'telnopart3') {
			if (value.length == dp_all_masktelnopart3.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'ip') {
			if (value.length == genMaskIp__(value).length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'maddr') {
			if (value.length == dp_all_maskmaddr.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'date') {
			if (value.length == dp_all_maskdate.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'dateyyyy') {
			if (value.length == dp_all_maskdateyyyy.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'time') {
			if (value.length == dp_all_masktime.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'timehm') {
			if (value.length == dp_all_masktimehm.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'timeh') {
			if (value.length == dp_all_masktimeh.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		} else
		if (utype == 'mbrid') {
			if (value.length == dp_all_maskmbrid.length) {
				if (checkObj_always_true__(obj))
					tonextobj__(obj);
			}
		}
	}
}

function onchangeall__(event) {
	var obj = $(event.target);
//	if (event && event.preventDefault) event.preventDefault();
	setAttribute__(obj[0], "oldValue4Change", obj.val());
	maskObj__(obj, event);
}


function setObjEventHandlers__(obj_) {
	var obj = $(obj_);
	if (obj.length == 0) return ;
	
	obj.each(function () {
		var ele = $(this);
		
		if (pick__(getAttribute__(ele[0], "wuwgevthndlradded"), false)) return ;

		var tagName = pick__(ele.prop("tagName"), '');
		tagName = tagName.toLowerCase();
		
		if (tagName == 'form') {
			//* form
			
			//*event handler 추가
			ele.submit(function (event) {onsubmitall__(event);});
			
			setAttribute__(ele[0], "wuwgevthndlradded", true);
			
	//		if (typeof(ele.submit) != 'undefined')
	//		if (ele.submit != submitall__) {
	//			ele.dp_all_oldsubmit = ele.submit;
	//			ele.submit = submitall__;
	//		}
		} else {
			//* form 이외의 항목
			
			if (ele.prop("type").toLowerCase() != 'hidden') {

				//*event handler 추가
				ele.focus(function (event) {onfocusall__(event);});
				ele.blur(function (event) {onblurall__(event);});
				ele.keydown(function (event) {onkeydownall__(event);});
				ele.keypress(function (event) {onkeypressall__(event);});
				ele.keyup(function (event) {onkeyupall__(event);});
				ele.change(function (event) {onchangeall__(event);});
	
				setAttribute__(ele[0], "wuwgevthndlradded", true);
			}
		}
		});
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//모든 object 에 대해 이벤트 핸들러를 변경하고 utype 이 지정된 object 에 대해 masking 한다.
//	onsubmit - 이미 submit 이 이루어 졌는지 체크
//    submitonce 가 있을 경우만 체크하며 이 값을 alert 한다.
//    ex) <form name="mainForm" submitonce="<spring:message code="errors.required" arguments="이름" javaScriptEscape="true"/>">
//	submit      - submitted 를 설정하여 재전송을 방지한다.
//	onfocus     - focus 를 받을 때 전체 선택, 날짜 데이타 세이브. (단, utype 지정된 경우. utype 은 뒤에 설명)
//	onblur      - focus 잃을 때 날짜 체크, 기간 체크. 유효하지 않은 날짜일 경우 onfocus 에서 세이브한 데이타 표시
//	onkeydown   - tab, shift + tab 처리 (setObjectSequence 로 지정한 순서에 따름)
//	onkeypress  - 입력유효성체크 (영숫자). 유효하지 않을 경우 입력 금지 시킴
//	onkeyup     - 지정된 길이 초과시 다음 필드로 이동. pgup(first object), pgdn(last object), left(prev), right(next), numpad + (next), numpad ins('000' 입력) 기능
//                입력데이타 유효성체크
//	onchange    - masking
//required      - 필수값 지정
//tip           - 툴팁지정
//utype 에 따른 길이/imemode 를 설정을 한다.
//  rnno        - 실명(주민 또는 사업자등록)번호(모두 한 칸에 입력)
//    allowinvalid - 유효하지 않은 주민번호 입력 가능 여부. (default : false)
//  rno         - 주민등록번호(모두 한 칸에 입력)
//    allowinvalid - 유효하지 않은 주민번호 입력 가능 여부. (default : false)
//x rnopart1    - 주민등록번호앞자리(나누어서 입력을 받을 경우에 사용함)
//x rnopart2    - 주민등록번호뒷자리(나누어서 입력을 받을 경우에 사용함)
//  bsmno       - 사업자등록번호(모두 한 칸에 입력)
//x bsmnopart1  - 사업자등록번호앞자리(나누어서 입력을 받을 경우에 사용함)
//x bsmnopart2  - 사업자등록번호중간(나누어서 입력을 받을 경우에 사용함)
//x bsmnopart3  - 사업자등록번호뒷자리(나누어서 입력을 받을 경우에 사용함)
//  zip         - 우편번호(모두 한 칸에 입력)
//  telno       - 전화번호(모두 한 칸에 입력)
//x telnopart1  - 전화번호 지역(없음. 나누어서 입력받을 경우에는 콤보를 사용한다.)
//x telnopart2  - 전화번호 국번(나누어서 입력을 받을 경우에 사용함)
//x telnopart3  - 전화번호 번호(나누어서 입력을 받을 경우에 사용함)
//  amount      - 금액입력. 세 자리마다 ',' 삽입. 우측정렬
//    allownegative - 음수 입력 가능 (default : false)
//    decimal - 소숫점 이하 자리수 지정 (default : 0)
//    saveunit - 저장되는 단위. * N (default : 1)
//    symbol - K(ilo)/M(ega)/G(iga)/T(era) 등 기호의 사용여부 (default : false)
//  date        - 날짜입력(yyyy-MM-dd)
//  time        - 시간입력(hh:mm:ss)
//  timehm      - 시분입력(hh:mm)
//  timeh       - 시간입력(hh)
//x mbrid       - 회원(시스템)아이디
//  numeric     - 숫자만입력
//  numericdash - 숫자와 dash 만 입력
//  kor         - 한글입력 - 한글입력으로 자동 설정
//  eng         - 영문입력 - 영숫자만 입력
//  engkor      - 영문한글입력 - 영문입력으로 자동 설정
//  ueng        - 영문대문자만 입력(자동변경)
//  uengkor     - 영문대문자한글 입력(자동변경) - 영문입력으로 자동설정
//	@return 없음
//ex) setEventHandlers();
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function setEventHandlers(target_) {
	//* 입력이 없을 경우 전체를 처리하도록 한다.
	target_ = (typeof(target_) == 'undefined' || target_ == null) ? document : target_;
	//* 단일 입력일 경우 배열로 변경한다.
	if (! (target_ instanceof Array)) {
		var tmp = target_;
		target_ = new Array();
		target_[0] = tmp;
	}
	
	for (var key = 0, lkey_ = target_.length; key < lkey_; key ++) {
		var target = target_[key];
		if (typeof(target) == 'undefined') continue;
		
		if (typeof(target) == 'string') {
			var tmp = null;
			tmp = $("#" + target);
			if (tmp.length == 0) {
				tmp = $("[name=" + "" + target + "]");
			}
			target = tmp;
		} else {
			target = $(target);
		}
		if (target.length == 0) {
			continue;
		}
		
		target.each(function () {
			var thiz = $(this);
			if (pick__(thiz[0].tagName, '').toLowerCase() == 'form') {
				setObjEventHandlers__(thiz);
			}
			$("form, :input:not(:image)", thiz).filter(function () {return $(this).attr("type") != "hidden"}).each(
				function () {
					setObjEventHandlers__(this);
				}
				);
		});
	}
}

function setValidations(inputs) {
	if (! (pick__(inputs, '') instanceof Array)) {
		return ;
	}
	
	for (var ikey = 0, likey_ = inputs.length; ikey < likey_; ikey ++) {
		var input = inputs[ikey];
		if (typeof(input) == 'undefined') continue;
	//	if (!(input instanceof Objects)) {
	//		continue;
	//	}
	
		var target_ = input['target'];
		var uname = input['uname'];
		var utype = input['utype'];
		var required = pick__(input['required'], false);
		var emptyvalue = pick__(input['emptyvalue'], '');
		var allowinvalid = input['allowinvalid']; //* utype 이 rnno, rno 일 경우 유효
		var allownegative = pick__(input['allownegative'], false); //* utype 이 amount 일 경우 유효
		var saveunit = pick__(input['saveunit'], 1); //* utype 이 amount 일 경우 유효
		var symbol = pick__(input['symbol'], false); //* utype 이 amount 일 경우 유효
		var decimal = pick__(input['decimal'], 0); //* utype 이 amount 일 경우 유효
		var minimum = pick__(input['minimum'], allownegative ? INPUT_MIN_NUMBER : 0); //* utype 이 amount 일 경우 유효
		var maximum = pick__(input['maximum'], INPUT_MAX_NUMBER); //* utype 이 amount 일 경우 유효
		var size = input['size'];
		var minLength = input['minLength']; //* utype 이 numeric 일 경우 유효
		var maxLength = input['maxLength'];
		
		//* 단일 입력일 경우 배열로 변경한다.
		if (! (target_ instanceof Array)) {
			var tmp = target_;
			target_ = new Array();
			target_[0] = tmp;
		}
		
		for (var key = 0, lkey_ = target_.length; key < lkey_; key ++) {
			var target = target_[key];
			if (typeof(target) == 'undefined') continue;
			
			if (typeof(target) == 'string') {
				var tmp = null;
				if (target.indexOf('[id') > -1) {
					tmp = $(target);
				}else{
					tmp = $("#" + target);
				}
				if (tmp.length == 0) {
					tmp = $("[name=" + "" + target + "]");
				}
				target = tmp;
			} else {
				target = $(target);
			}
			if (target.length == 0) {
				continue;
			}
			
			target.each(function () {
				var thiz = $(this);
				
				var o_utype = pick__(getAttribute__(this, "utype"), '');
				
				if (o_utype != '' && utype != '' && o_utype != utype) {
					thiz.val('');
				}
				
				//* 신규설정일 경우 처리
				if (o_utype == '') {
					if (utype == 'amount') {
						var vall = thiz.val();

						vall = vall.replace(/^0+/, '');
						vall = vall.replace(/^-0+/, '-');
						if (vall == '-') vall = '';
						if (vall == '') vall = '0';

						vall = vall * saveunit;
						vall = amounttostring(vall, symbol, decimal);
						
						thiz.val(vall);
					}
				}

				//* 설정
				setAttribute__(this, "uname", uname);
				setAttribute__(this, "utype", utype);
				setAttribute__(this, "required", required);
				setAttribute__(this, "emptyvalue", emptyvalue);
				setAttribute__(this, "allowinvalid", allowinvalid);
				setAttribute__(this, "allownegative", allownegative);
				setAttribute__(this, "saveunit", saveunit);
				setAttribute__(this, "symbol", symbol);
				setAttribute__(this, "decimal", decimal);
				setAttribute__(this, "minimum", minimum);
				setAttribute__(this, "maximum", maximum);
				setAttribute__(this, "minLength", minLength);
				setAttribute__(this, "maxLength", maxLength);

				//* required 가 true 일 경우 class 변경		
				if (required instanceof Function) {
					if (required.apply(this)) {
						try {
							thiz.addClass('required');
							thiz.closest("td").prev().each(function () {
								var thizz = $(this);
								if (thizz.prop("tagName").toLowerCase() != 'th') {
									return ;
								}
								if (thizz.prop("requiredTh") == 'true') {
									return ;
								}
								thizz.prop("requiredTh", 'true');
								thizz.prepend($("<span class='requiredTh'></span>"));
							});
						} catch (e) {}
					} else {
						try {
							thiz.removeClass('required');
							thiz.closest("td").prev().each(function () {
								var thizz = $(this);
								if (thizz.prop("tagName").toLowerCase() != 'th') {
									return ;
								}
								if (thizz.prop("requiredTh") != 'true') {
									return ;
								}
								thizz.prop("requiredTh", '');
								$(".requiredTh", thizz).remove();
							});
						} catch (e) {}
					}
				} else {
					if (required) {
						try {
							thiz.addClass('required');
							thiz.closest("td").prev().each(function () {
								var thizz = $(this);
								if (thizz.prop("tagName").toLowerCase() != 'th') {
									return ;
								}
								if (thizz.prop("requiredTh") == 'true') {
									return ;
								}
								thizz.prop("requiredTh", 'true');
								thizz.prepend($("<span class='requiredTh'></span>"));
							});
						} catch (e) {}
					} else {
						try {
							thiz.removeClass('required');
							thiz.closest("td").prev().each(function () {
								var thizz = $(this);
								if (thizz.prop("tagName").toLowerCase() != 'th') {
									return ;
								}
								if (thizz.prop("requiredTh") != 'true') {
									return ;
								}
								thizz.prop("requiredTh", '');
								$(".requiredTh", thizz).remove();
							});
						} catch (e) {}
					}
				}
			
				if (utype != '') {
					//* default backup
					var backup_size = pick__(getAttribute__(this, "backup_size"), '__none__');
					var backup_maxLength = pick__(getAttribute__(this, "backup_maxLength"), '__none__');
					var backup_imeMode = pick__(getAttribute__(this, "backup_imeMode"), '__none__');
					var backup_textAlign = pick__(getAttribute__(this, "backup_textAlign"), '__none__');
					var backup_paddingRight = pick__(getAttribute__(this, "backup_paddingRight"), '__none__');
					
					if (backup_size == '__none__') setAttribute__(this, "backup_size", backup_size = thiz.prop("size"));
					if (backup_maxLength == '__none__') setAttribute__(this, "backup_maxLength", backup_maxLength = thiz.prop("maxLength"));
					if (backup_imeMode == '__none__') setAttribute__(this, "backup_imeMode", backup_imeMode = thiz.css("ime-mode"));
					if (backup_textAlign == '__none__') setAttribute__(this, "backup_textAlign", backup_textAlign = thiz.css("text-align"));
					if (backup_paddingRight == '__none__') setAttribute__(this, "backup_paddingRight", backup_paddingRight = thiz.css("padding-right"));
	
					//* utype 에 따른 기본 설정.
					var new_size = null;
					var new_maxLength = null;
					var new_imeMode = null;
					var new_textAlign = null;
					var new_paddingRight = null;

					if (utype == 'numeric') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'disabled';
					} else
					if (utype == 'numericdash') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'disabled';
					} else
					if (utype == 'rnno') {
						new_size = 14;
						new_maxLength = 14;
						new_imeMode = 'disabled';
					} else
					if (utype == 'rno') {
						new_size = 14;
						new_maxLength = 14;
						new_imeMode = 'disabled';
					} else
					if (utype == 'rnopart1') {
						new_size = 6;
						new_maxLength = 6;
						new_imeMode = 'disabled';
					} else
					if (utype == 'rnopart2') {
						new_size = 7;
						new_maxLength = 7;
						new_imeMode = 'disabled';
					} else
					if (utype == 'bsmno') {
						new_size = 12;
						new_maxLength = 12;
						new_imeMode = 'disabled';
					} else
					if (utype == 'bsmnopart1') {
						new_size = 3;
						new_maxLength = 3;
						new_imeMode = 'disabled';
					} else
					if (utype == 'bsmnopart2') {
						new_size = 2;
						new_maxLength = 2;
						new_imeMode = 'disabled';
					} else
					if (utype == 'bsmnopart3') {
						new_size = 5;
						new_maxLength = 5;
						new_imeMode = 'disabled';
					} else
					if (utype == 'zip') {
						new_size = 5;
						new_maxLength = 5;
						new_imeMode = 'disabled';
					} else
					if (utype == 'telno') {
						new_size = 13;
						new_maxLength = 13;
						new_imeMode = 'disabled';
						thiz.val(thiz.val().replace(/[-]/g,''));
						if (thiz.val().length == 12) {
							thiz.val(''
								+ thiz.val().substring(0, 4).replace(/[^0-9]/g,'')
								+ thiz.val().substring(4, 8).replace(/[^0-9]/g,'')
								+ thiz.val().substring(8,12).replace(/[^0-9]/g,'')
								);
						} else thiz.val(thiz.val().replace(/[^0-9]/g,''));
					} else
					if (utype == 'ip') {
						new_size = 16;
						new_maxLength = 15;
						new_imeMode = 'disabled';
					} else
					if (utype == 'maddr') {
						new_size = 19;
						new_maxLength = 17;
						new_imeMode = 'inactive';
					} else
					if (utype == 'telnopart2') {
						new_size = 4;
						new_maxLength = 4;
						new_imeMode = 'disabled';
					} else
					if (utype == 'telnopart3') {
						new_size = 4;
						new_maxLength = 4;
						new_imeMode = 'disabled';
					} else
					if (utype == 'date') {
						new_size = 10;
						new_maxLength = 10;
						new_imeMode = 'disabled';
					} else
					if (utype == 'dateyyyy') {
						new_size = 4;
						new_maxLength = 4;
						new_imeMode = 'disabled';
					} else
					if (utype == 'time') {
						new_size = 8;
						new_maxLength = 8;
						new_imeMode = 'disabled';
					} else
					if (utype == 'timehm') {
						new_size = 5;
						new_maxLength = 6; //* 'hhmmss' 형태로 만들기 위해
						new_imeMode = 'disabled';
					} else
					if (utype == 'timeh') {
						new_size = 2;
						new_maxLength = 6; //* 'hhmmss' 형태로 만들기 위해
						new_imeMode = 'disabled';
					} else
					if (utype == 'amount') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'disabled';
						new_textAlign = 'right';
						new_paddingRight = '2px';
					} else
					if (utype == 'kor') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'active';
					} else
					if (utype == 'eng') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'disabled';
					} else
					if (utype == 'engkor') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'inactive';
					} else
					if (utype == 'uengkor') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'inactive';
					} else
					if (utype == 'ueng') {
						new_size = size;
						new_maxLength = maxLength;
						new_imeMode = 'disabled';
					} else
					if (utype == 'mbrid') {
						new_size = 14;
						new_maxLength = 14;
						new_imeMode = 'disabled';
					}
			
					if (pick__(new_size, backup_size) > 0) {
						thiz.prop("size", pick__(new_size, backup_size));
					}
					if (pick__(new_maxLength, backup_maxLength) > 0) {
						thiz.prop("maxLength", pick__(new_maxLength, backup_maxLength));
					}
					thiz.css("ime-mode", pick__(new_imeMode, backup_imeMode));
					thiz.css("text-align", pick__(new_textAlign, backup_textAlign));
					thiz.css("padding-right", pick__(new_paddingRight, backup_paddingRight));
					

					maskObj__(thiz);
				}
			});
		}
	}
}

function setDateRelations(dates) {
	if (! (pick__(dates, '') instanceof Array)) {
		return ;
	}
	
	for (var ikey = 0, likey_ = dates.length; ikey < likey_; ikey ++) {
		var dates_ = dates[ikey];
		if (typeof(dates_) == 'undefined') continue;
	//	if (!(dates_ instanceof Objects)) {
	//		continue;
	//	}
		
		var bgndt_ = dates_['bgndt'];
		var bgnhm_ = dates_['bgnhm'];
		var enddt_ = dates_['enddt'];
		var endhm_ = dates_['endhm'];
		var nullable = dates_['nullable'];
		var tip = tip_['tip'];
		
		//* 단일 입력일 경우 배열로 변경한다.
		if (! (bgndt_ instanceof Array)) {
			bgndt_ = $(bgndt_);
		} else {
			bgndt_ = $(bgndt_[0]);
		}
		if (! (bgnhm_ instanceof Array)) {
			bgnhm_ = $(bgnhm_);
		} else {
			bgnhm_ = $(bgnhm_[0]);
		}
		if (! (enddt_ instanceof Array)) {
			enddt_ = $(enddt_);
		} else {
			enddt_ = $(enddt_[0]);
		}
		if (! (endhm_ instanceof Array)) {
			endhm_ = $(endhm_);
		} else {
			endhm_ = $(endhm_[0]);
		}
		
		//* ■■
	}
}

function setTooltips(tips) {
	if (! (pick__(tips, '') instanceof Array)) {
		return ;
	}
	
	for (var ikey = 0, likey_ = tips.length; ikey < likey_; ikey ++) {
		var tip_ = tips[ikey];
		if (typeof(tip_) == 'undefined') continue;
	//	if (!(tip_ instanceof Objects)) {
	//		continue;
	//	}
		
		var target_ = tip_['target'];
		var tip = tip_['tip'];
		
		//* 단일 입력일 경우 배열로 변경한다.
		if (! (target_ instanceof Array)) {
			var tmp = target_;
			target_ = new Array();
			target_[0] = tmp;
		}
		
		for (var key = 0, lkey_ = target_.length; key < lkey_; key ++) {
			var target = target_[key];
			if (typeof(target) == 'undefined') continue;
			
			if (typeof(target) == 'string') {
				var tmp = null;
				tmp = $("#" + target);
				if (tmp.length == 0) {
					tmp = $("[name=" + "" + target + "]");
				}
				target = tmp;
			} else {
				target = $(target);
			}
			if (target.length == 0) {
				continue;
			}
			
			target.each(function () {
				setAttribute__(this, "tip", tip);
				});
			
			target.hover(
				function (event) {
					var obj = $(event.target);
					var tip = pick__(getAttribute__(obj[0], "tip"), '');
					if (tip instanceof Function) {
						tip = tip.apply(this);
					}
					if (tip && tip != '') {
						if (event && event.preventDefault) event.preventDefault();
						try {
							Tip(tip, OFFSETX, -17, BALLOON, true, ABOVE, true, BALLOONSTEMWIDTH, 17, BALLOONSTEMHEIGHT, 9);
						} catch (e) {}
					}
				},
				function(event) {
					var obj = $(event.target);
					if (event && event.preventDefault) event.preventDefault();
					try {
						UnTip();
					} catch (e) {}
				});
		}
	}
}

function checkObj_always_true__(obj_) {
	return true;
}

function checkObj__(obj_) {
	var obj = $(obj_);
	if (obj.length == 0) return false;

	if (obj.prop("disabled") == true || obj.prop("readOnly") == true)
		return true;

	tag = pick__(obj.prop("tagName"), '');
	tag = tag.toLowerCase();

	if (tag == 'textarea') {
		var maxLen = obj.prop("maxLength");
		if (maxLen != null && maxLen > 0) {
			var len = bytelength__(obj.val());
			var delLen = len - maxLen;
			if (len > maxLen) {
				alert("이 항목은 영문 " + maxLen + "자 (한글은 " + Math.floor(maxLen/2) + "자) 까지만 입력해야 합니다 \n"
					+  "입력 내용에서 영문 " + delLen + "자 (한글은 " + Math.ceil(delLen/2) + "자)를 제거하시기 바랍니다");
				selectAll__(obj);
				return false;
			}
		}
	}

	uname = pick__(getAttribute__(obj[0], "uname"), '');
	utype = pick__(getAttribute__(obj[0], "utype"), '');

	var allowinvalid = pick__(getAttribute__(obj[0], "allowinvalid"), false);
	if (allowinvalid != true && allowinvalid != false) {
		allowinvalid = (allowinvalid == 'true');
	}

	if (utype != '' && obj.val() != '') {
		utype = utype.toLowerCase();

		var val = obj.val();
		v = maskOffDigit__(val);

		var maxLength = pick__(getAttribute__(obj[0], "maxLength"), -1);

		if (utype == 'rnno') {
			if (v.length != 10 && v.length != 13) {
				alert('올바른 주민/사업자번호가 아닙니다.');
				selectAll__(obj);
				return false;
			} else
			if (v.length == 10) {
//				if (typeof(validateBsrno) != 'undefined') {
//					if (!validateBsrno(v)) {
//						alert('올바른 사업자번호가 아닙니다.');
//						selectAll__(obj);
//						return false;
//					}
//				}
			} else {
				if (!allowinvalid) {
					if (typeof(validateRno) != 'undefined') {
						if (!validateRno(v)) {
							alert('올바른 주민번호가 아닙니다.');
							selectAll__(obj);
							return false;
						}
					}
				}
			}
		} else
		if (utype == 'rno') {
			if (v.length != 13) {
				alert('올바른 주민번호가 아닙니다.');
				selectAll__(obj);
				return false;
			} else {
				if (!allowinvalid) {
					if (typeof(validateRno) != 'undefined') {
						if (!validateRno(v)) {
							alert('올바른 주민번호가 아닙니다.');
							selectAll__(obj);
							return false;
						}
					}
				}
			}
		} else
		if (utype == 'rnopart1') {
			if (v.length != 6) {
				alert('올바른 주민번호가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'rnopart2') {
			if (v.length != 7) {
				alert('올바른 주민번호가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'bsmno') {
			if (v.length != 10) {
				alert('올바른 사업자번호가 아닙니다.');
				selectAll__(obj);
				return false;
			} else {
//				if (typeof(validateBsrno) != 'undefined') {
//					if (!validateBsrno(v)) {
//						alert('올바른 사업자번호가 아닙니다.');
//						selectAll__(obj);
//						return false;
//					}
//				}
			}
		} else
		if (utype == 'bsmnopart1') {
			if (v.length != 3) {
				alert('올바른 사업자번호가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'bsmnopart2') {
			if (v.length != 2) {
				alert('올바른 사업자번호가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'bsmnopart3') {
			if (v.length != 5) {
				alert('올바른 사업자번호가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'zip') {
			if (v.length != 5) {
				alert('우편번호는 5자리입니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'telno') {
			var chk_v = v.replace(/-/, '');
			if (chk_v.length < 9 || chk_v.length > 11) {
				alert('전화번호는 (-)포함해서 11~13자리입니다.');
				selectAll__(obj);
				return false;
			}else{
				maskObj__(obj);
			}
		} else
		if (utype == 'telnopart2') {
			if (v.length != 3 && v.length != 4) {
				alert('전화번호는 3~4자리입니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'telnopart3') {
			if (v.length != 4) {
				alert('전화번호는 4자리입니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'ip') {
			var vals = val.split('.',-1);
			if(vals.length != 4){
				alert('IP주소는 xxx.xxx.xxx.xxx 와 같이 입력하셔야 합니다.');
				selectAll__(obj);
				return false;
			}else{

				for (var i = 0; i < 4; i ++) {
					var len = vals[i].length;
					if (len <= 0 || len > 3) {
						alert('IP주소의 각 자리수는 1~3자리입니다.');
						selectAll__(obj);
						return false;
					}
					var nval = parseInt(vals[i], 10);
					if (nval < 0 || nval > 255) {
						alert('IP주소의 각 자리는 0~255 사이의 값을 입력하셔야 합니다..');
						selectAll__(obj);
						return false;
					}
				}
			}
		} else
		if (utype == 'maddr') {
			ve = maskOffEDigit__(val);
			if (ve.length != 12) {
				alert('맥어드레스는 12자리입니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'date') {
			if (v.length != 8 || v != validateDate__(v)) {
				alert('올바른 날짜가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'dateyyyy') {
			if (v.length != 4 || v != validateYear__(v)) {
				v != validateYear__(v)
				alert('올바른 년도가 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'time') {
			if (v.length != 6 || v != validateTime__(v)) {
				alert('올바른 시간이 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'timehm') {
			if (v.length != 6 || v != validateTime__(v)) {
				alert('올바른 시간이 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'timeh') {
			if (v.length != 6 || v != validateTime__(v)) {
				alert('올바른 시간이 아닙니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'numeric') {
			var minLength = pick__(getAttribute__(obj[0], "minLength"), 0);
			var maxLength = pick__(getAttribute__(obj[0], "maxLength"), 0);
			if (minLength != 0) {
				if (minLength == maxLength) {
					if (v.length != minLength) {
						alert(uname + (hasLastJong(uname) ? '은' : '는') + ' '+minLength+'자리로 입력하셔야 합니다.');
						selectAll__(obj);
						return false;
					}
				} else {
					if (v.length < minLength) {
						alert(uname + (hasLastJong(uname) ? '은' : '는') + ' '+minLength+'자리이상 입력하셔야 합니다.');
						selectAll__(obj);
						return false;
					}
				}
			}
		} else
		if (utype == 'amount') {
			var allownegative = pick__(getAttribute__(obj[0], "allownegative"), false);
			var saveunit = pick__(getAttribute__(obj[0], "saveunit"), 1);
			var symbol = pick__(getAttribute__(obj[0], "symbol"), false);
			var decimal = pick__(getAttribute__(obj[0], "decimal"), 0);
			var minimum = pick__(getAttribute__(obj[0], "minimum"), INPUT_MIN_NUMBER);
			var maximum = pick__(getAttribute__(obj[0], "maximum"), INPUT_MAX_NUMBER);

			if (minimum < 0 && ! allownegative) {
				minimum = 0;
			}

			var value;
			if (decimal == 0) value = parseInt(obj.val(), 10);
			else {
				value = parseFloat(obj.val());
				if (!isNaN(value)) {
					pow = Math.pow(10, decimal);
					value = Math.round(value * pow) / pow;
				}
			}
			if (isNaN(value)) {
				alert('수치를 입력하시기 바랍니다.');
				selectAll__(obj);
				return false;
			}
			if (obj.value < 0 && ! allownegative) {
				alert('음수는 입력하실 수 없습니다.');
				selectAll__(obj);
				return false;
			}
			obj.val(value);
			if (value * saveunit < minimum) {
				alert('' + minimum + ' 보다 큰 수치를 입력하시기 바랍니다.');
				selectAll__(obj);
				return false;
			}
			if (value * saveunit > maximum) {
				alert('' + maximum + ' 보다 작은 수치를 입력하시기 바랍니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'eng' || utype == 'ueng') {
			for (var c = 0, lc = val.length; c < lc; c ++) {
				var ch = val.charCodeAt(c);
				if (ch >= 0xff) {
					alert(uname + (hasLastJong(uname) ? '은' : '는') + ' 한글로 입력하실 수 없습니다.');
					selectAll__(obj);
					return false;
				}
			}
			
			if (maxLength != -1 && maxLength < bytelength__(val)) {
				alert(uname + (hasLastJong(uname) ? '은' : '는') + ' '+maxLength+'자(bytes) 이내로 입력하셔야 합니다.');
				selectAll__(obj);
				return false;
			}
		} else
		if (utype == 'email') {
			//var reg = /^([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,}$/;
//			var reg = /^([0-9a-zA-Z_-]+)@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.)|(([w-]+.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(]?)$/; 
//			if (!reg.test(val)) {
//				alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
//				selectAll__(obj);
//				return false;
//			}
			var email = val;
			if(email){
				var pattern = /^(.+)@(.+)$/;
				var atom = "\[^\\s\\(\\)<>#@,;:!\\\\\\\"\\.\\[\\]\]+";
				var word="(" + atom + "|(\"[^\"]*\"))";
				var user_pattern = new RegExp("^" + word + "(\\." + word + ")*$");
				var ip_pattern = /^\[(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})\]$/;
				var domain_pattern = new RegExp("^" + atom + "(\\." + atom +")*$");

				var arr = email.match(pattern);
				
				// @, . 문자 검사
				if (!arr){
					//return "Email address seems incorrect (check @ and .'s)";
					alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
					selectAll__(obj);
					return false;
				}
				
				// 계정 형태 검사
				if (!arr[1].match(user_pattern)){
					//return "The username doesn't seem to be valid.";
					alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
					selectAll__(obj);
					return false;
				} 
				
				// IP 형태 검사
				var ip = arr[2].match(ip_pattern);
				if (ip) {
					for (var i=1; i<5; i++){
					  if (ip[i] > 255){
							//return "Destination IP address is invalid!";
						  	alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
							selectAll__(obj);
							return false;
						} 
					}
				}else{
					// 도메인 형태 검사		
					if (!arr[2].match(domain_pattern)){
						//return "The domain name doesn't seem to be valid.";
						alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
						selectAll__(obj);
						return false;
					}
					var domain = arr[2].match(new RegExp(atom,"g"));
					if (domain.length<2){
						// return "This address is missing a hostname!";
						alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
						selectAll__(obj);
						return false;
					}
					if (domain[domain.length-1].length<2 || domain[domain.length-1].length>3){
						// return "The address must end in a three-letter domain, or two letter country.";
						alert(val + ' 는 ' + uname + '로 사용하실 수 없습니다.(잘못된 형식입니다.)');
						selectAll__(obj);
						return false;
					}
						 
				}
			}
			
			
		} else {
			if (maxLength != -1 && maxLength < bytelength__(val)) {
				alert(uname + (hasLastJong(uname) ? '은' : '는') + ' '+maxLength+'자(bytes) 이내로 입력하셔야 합니다.');
				selectAll__(obj);
				return false;
			}
		}
	}

	return true;
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//submit 전 데이타를 mask-off 한다.
//	@param formname - submit 하려는 form object || form name
//	@return 없음
//ex) prepareSubmit(dicument.forms.mainForm); or prepareSubmit('mainForm');
//----------------------------------------------------------------------
//----------------------------------------------------------------------
var dp_all_prepared_frms = new Array();
function prepareForm__(frm_) {
	var frm = $(frm_);
	if (frm.length == 0) return ;
	
	frm.each(function () {
		dp_all_prepared_frms.push(this);

		var frm = $(this);
		
		$(":input:not(:image :reset :button)", frm).filter(function () {return $(this).attr("type") != "hidden"}).each(
			function () {
				var obj = $(this);
	
				var utype = pick__(getAttribute__(obj[0], "utype"), '');
	
				if (utype == 'numeric' ||
					utype == 'rnno' ||
					utype == 'rno' ||
					utype == 'rnopart1' ||
					utype == 'rnopart2' ||
					utype == 'bsmnopart1' ||
					utype == 'bsmnopart2' ||
					utype == 'bsmnopart3' ||
					utype == 'zip' ||
					utype == 'date' ||
					utype == 'dateyyyy' ||
					utype == 'timehm' ||
					utype == 'timeh' ||
					utype == 'time') {
					obj.val(maskOffDigit__(obj.val()));
					if (utype == 'timehm') {
						if (obj.val().length == 4) {
							obj.val(obj.val()+'00');
						}
					}
					if (utype == 'timeh') {
						if (obj.val().length == 2) {
							obj.val(obj.val()+'0000');
						}
					}
				} else
				if (utype == 'amount') {
					var saveunit = pick__(getAttribute__(obj[0], "saveunit"), 1);
					obj.val(maskOffAmount__(obj.val()) / saveunit);
				} else
				if (utype == 'telno' ||
					utype == 'ip' ||
					utype == 'maddr') {
					;
				}
			}
			);
		});
}

function prepareSubmit(target_) {

	dp_all_prepared_frms.length = 0;

	//* 입력이 없을 경우 전체를 처리하도록 한다.
	if (typeof(target_) == 'undefined' || target_ == null) {
		prepareForm__($(document));
		return ;
	}
	
	//* 단일 입력일 경우 배열로 변경한다.
	if (! (target_ instanceof Array)) {
		var tmp = target_;
		target_ = new Array();
		target_[0] = tmp;
	}
	
	for (var key = 0, lkey_ = target_.length; key < lkey_; key ++) {
		var target = target_[key];
		if (typeof(target) == 'undefined') continue;
		
		if (typeof(target) == 'string') {
			var tmp = null;
			tmp = $("#" + target);
			if (tmp.length == 0) {
				tmp = $("[name=" + "" + target + "]");
			}
			target = tmp;
		} else {
			target = $(target);
		}
		if (target.length == 0) {
			continue;
		}
		
		target.each(function () {
			var thiz = $(this);
			if (pick__(thiz[0].tagName, '').toLowerCase() == 'form') {
				prepareForm__(this);
			}
			$("form", thiz).each(
				function () {
					prepareForm__(this);
				}
				);
		});
	}
}

var validateSubmit = function (se) {
	return true;
}

function validateSubmit__(se) {
	var errFound = false;

	for (var key = 0, lkey_ = dp_all_prepared_frms.length; key < lkey_; key ++) {
		var frm = $(dp_all_prepared_frms[key]);

		if (frm.length == 0) continue ;
		
		$(":input:not(:image :reset :button)", frm).filter(function () {return $(this).attr("type") != "hidden"}).each(
			function () {
				if (errFound) return false;
			
				var obj = $(this);
	
				var utype = pick__(getAttribute__(obj[0], "utype"), '');
				var uname = pick__(getAttribute__(obj[0], "uname"), '아래 항목');
				var type = pick__(obj.prop('type'), '');
				var required = pick__(getAttribute__(obj[0], "required"), false);
				var emptyvalue = pick__(getAttribute__(obj[0], "emptyvalue"), '');
				
				utype = utype.toLowerCase();
				type = type.toLowerCase();

				if (required instanceof Function) {
					required = required.apply(this);
				}
				if (emptyvalue instanceof Function) {
					emptyvalue = emptyvalue.apply(this);
				}

				if (required) {
					var empty = false;
					if (type == 'radio') {
						var chks = $("[name='" + obj.prop('name') + "']:input:not(:hidden):checked");
						if (chks.length == 0 || chks.val() == emptyvalue) {
							empty = true;
						}
					} else
					if (type == 'checkbox') {
						var chks = $("[name='" + obj.prop('name') + "']:input:not(:hidden):checked");
						if (chks.length == 0) {
							empty = true;
						} else {
							empty = true;
							for (var idx = 0; idx < chks.length; idx ++) {
								if (chks[idx].value != emptyvalue) {
									empty = false;
									break;
								}
							}
						}
					} else 
					if (obj.val() == emptyvalue) {
						empty = true;
					}
					
					if (empty) {
						alert(uname + (hasLastJong(uname) ? '은' : '는') + ' 필수 입력 사항입니다.');
	
						selectAll__(obj);
	
						errFound = true;
						return false;
					}
				}
				
				if (!checkObj__(obj)) {
					errFound = true;
					return false;
				}
	
			//	maskObj__(obj);
			}
			);

		if (errFound) break;
	}
	
	return ! errFound;
}

$(function () {
	var validateSubmitProxied = validateSubmit;
	validateSubmit = function(se) {
		if (!validateSubmit__(se)) return false;
		return validateSubmitProxied.apply(this, arguments);
	};
});

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//submit 전 mask-off 한 데이타를 다시 mask-on 처리함.
//	@param formname - submit 하려고 했던 form object || form name
//	@return 없음
//ex) cancelSubmit(dicument.forms.mainForm); or cancelSubmit('mainForm');
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function cancelSubmit() {
	for (var key = 0, lkey_ = dp_all_prepared_frms.length; key < lkey_; key ++) {
		var frm = $(dp_all_prepared_frms[key]);

		if (frm.length == 0) return ;
		
		$(":input:not(:image :reset :button)", frm).filter(function () {return $(this).attr("type") != "hidden"}).each(
			function () {
				var obj = $(this);
	
				var utype = pick__(getAttribute__(obj[0], "utype"), '');
	
				if (utype != '') {
					if (utype == 'amount') {
						var saveunit = pick__(getAttribute__(obj[0], "saveunit"), 1);
						var symbol = pick__(getAttribute__(obj[0], "symbol"), false);
						var decimal = pick__(getAttribute__(obj[0], "decimal"), 0);

						var vall = obj.val();

						vall = vall.replace(/^0+/, '');
						vall = vall.replace(/^-0+/, '-');
						if (vall == '-') vall = '';
						if (vall == '') vall = '0';

						vall = vall * saveunit;
						vall = amounttostring(vall, symbol, decimal);
						
						obj.val(vall);
					}
					maskObj__(obj);
				}
			}
			);
	}
	
	dp_all_prepared_frms.length = 0;
}

//----------------------------------------------------------------------
//----------------------------------------------------------------------
//setMasks
//----------------------------------------------------------------------
//----------------------------------------------------------------------
function setMasks(target) {
	var target_ = target;
	
	//* 단일 입력일 경우 배열로 변경한다.
	if (! (target_ instanceof Array)) {
		var tmp = target_;
		target_ = new Array();
		target_[0] = tmp;
	}
	
	for (var key = 0, lkey_ = target_.length; key < lkey_; key ++) {
		var target = target_[key];
		if (typeof(target) == 'undefined') continue;
		
		if (typeof(target) == 'string') {
			var tmp = null;
			tmp = $("#" + target);
			if (tmp.length == 0) {
				tmp = $("[name=" + "" + target + "]");
			}
			target = tmp;
		} else {
			target = $(target);
		}
		if (target.length == 0) {
			continue;
		}
		
		target.each(function () {
			var obj = $(this);

			var utype = pick__(getAttribute__(obj[0], "utype"), '');

			if (utype != '') {
				maskObj__(obj);
			}
		});
	}
}



//----------------------------------------------------------------------
//checkJqValue - Jquery Object 값을 검사하여 없는 경우 메세지, 포커스 처리
//----------------------------------------------------------------------
function checkJqVar(obj,errmsg,msgobj) {
	
	var arrchk = true;	//배열형태의 객체 처리를 위해

	if(obj.length > 1){	//obj가 배열 형태인 경우
		var arrchk = false;	//배열객체 체크값 false로 초기화
		// 루프 돌면서 값이 있는지 확인
		obj.each(function(idx) {
			if($(this).val().length > 0){
				arrchk = true; // 값으 있으면 체크값 true;
				return;	
			}
		});
	}
	
	if(obj.val().length < 1 || !arrchk){
		if(typeof(msgobj) == "object"){
			msgobj.html(errmsg);
		}else{
			alert(errmsg);
		}

		if (obj.attr("type")!='hidden' && obj.css("display") !='none') {
			
			// 배열인 경우 입력값중 첫번째 입력란에 포커스 주기 위해
			if(obj.length > 1) obj = obj.parent().children(":first");
			
			obj.focus();
			if (obj.attr("readonly") != true) obj.select();
		}

		return false;
	}else{
		return true;
	}
}