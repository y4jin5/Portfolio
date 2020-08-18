<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);
?>

<link type="text/css" href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/themes/base/jquery-ui.css" rel="stylesheet" />
<style type="text/css">
<!--
.ui-datepicker { font:12px dotum; }
.ui-datepicker select.ui-datepicker-month, 
.ui-datepicker select.ui-datepicker-year { width: 70px;}
.ui-datepicker-trigger { margin:0 0 -5px 2px; }
-->
</style>
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8.4/jquery-ui.min.js"></script>
<script type="text/javascript">
/* Korean initialisation for the jQuery calendar extension. */
/* Written by DaeKwon Kang (ncrash.dk@gmail.com). */
jQuery(function($){
	$.datepicker.regional['ko'] = {
		closeText: '닫기',
		prevText: '이전달',
		nextText: '다음달',
		currentText: '오늘',
		monthNames: ['1월(JAN)','2월(FEB)','3월(MAR)','4월(APR)','5월(MAY)','6월(JUN)',
		'7월(JUL)','8월(AUG)','9월(SEP)','10월(OCT)','11월(NOV)','12월(DEC)'],
		monthNamesShort: ['1월','2월','3월','4월','5월','6월',
		'7월','8월','9월','10월','11월','12월'],
		dayNames: ['일','월','화','수','목','금','토'],
		dayNamesShort: ['일','월','화','수','목','금','토'],
		dayNamesMin: ['일','월','화','수','목','금','토'],
		weekHeader: 'Wk',
		dateFormat: 'yy-mm-dd',
		firstDay: 0,
		isRTL: false,
		showMonthAfterYear: true,
		yearSuffix: ''};
	$.datepicker.setDefaults($.datepicker.regional['ko']);

    $('#wr_1').datepicker({
        showOn: 'button',
		buttonImage: '<?=$board_skin_url?>/img/calender.png',
		buttonImageOnly: true,
        buttonText: "달력",
        changeMonth: true,
		changeYear: true,
        showButtonPanel: true,
        yearRange: 'c-99:c+99',
		minDate: '+0d',
        maxDate: '+7200d'
    });

	 $('#wr_2').datepicker({
        showOn: 'button',
		buttonImage: '<?=$board_skin_url?>/img/calender.png',
		buttonImageOnly: true,
        buttonText: "달력",
        changeMonth: true,
		changeYear: true,
        showButtonPanel: true,
        yearRange: 'c-99:c+99',
		minDate: '+0d',
        maxDate: '+7200d'
    });
});
</script>

<style type="text/css">
#order_warp { width:100%; }
#order_warp .help { text-align:center; padding:15px 0; border:1px solid #cccccc; background:#eaeaea; }
#form11 {  width:100%; margin:20px auto; padding:10px 10px 30px 10px; border:1px solid #cccccc;}
#form11 td { position:relative; }
#form11 .head { padding-left:15px;width:160px; color:#333333; font-weight:normal; height:45px;}
#form11 .input { border:none; border-bottom:1px solid #ccc; width:220px; padding:3px; height:20px; }
#form11 .input2 { border:none; border-bottom:1px solid #ccc; width:70px; padding:3px; height:20px; }
#form11 .input3 { border:none; border-bottom:1px solid #ccc; width:90px; padding:3px; height:20px; }
#form11 .input_text { border:1px solid #ccc; width:90%; padding:3px; }
#form11 .input_tel { border:none; border-bottom:1px solid #ccc; width:80px; padding:3px; height:20px; }
#form11 .input_email { border:none; border-bottom:1px solid #ccc; width:100px; padding:3px; height:20px; }
.btn { text-align:center; margin-top:20px;}
</style>


<script type="text/javascript">
function TextBoxInputLengthCheck(maxSize, contentname, textlimitname) {
    var strCount = 0;
    var tempStr, tempStr2;

    var strCount = 0;
    for (j = 0; j < document.getElementById(contentname).value.length; j++) {
    	var chr = document.getElementById(contentname).value.charAt(j);
    	strCount += (chr.charCodeAt() > 128) ? 2 : 1
    }
    
    if (strCount > maxSize) {
        alert("최대 " + maxSize + "byte이므로 초과된 글자수는 자동으로 삭제됩니다.");
        strCount = 0;
        tempStr2 = "";
        for (i = 0; i < document.getElementById(contentname).value.length; i++) {
            tempStr = document.getElementById(contentname).value.charAt(i);
            if (escape(tempStr).length > 4) strCount += 2;
            else strCount += 1;
            if (strCount > maxSize) {
                if (escape(tempStr).length > 4) strCount -= 2;
                else strCount -= 1;
                break;
            }
            else tempStr2 += tempStr;
        }
        document.getElementById(contentname).value = tempStr2;
    }
    document.getElementById(textlimitname).innerHTML = strCount;
}

</script>


<section id="bo_w">


    <!-- 게시물 작성/수정 시작 { -->
    <form name="fwrite" id="fwrite" action="<?php echo $action_url ?>" onsubmit="return fwrite_submit(this);" method="post" enctype="multipart/form-data" autocomplete="off" style="width:<?php echo $width; ?>">
    <input type="hidden" name="uid" value="<?php echo get_uniqid(); ?>">
    <input type="hidden" name="w" value="<?php echo $w ?>">
    <input type="hidden" name="bo_table" value="<?php echo $bo_table ?>">
    <input type="hidden" name="wr_id" value="<?php echo $wr_id ?>">
    <input type="hidden" name="sca" value="<?php echo $sca ?>">
    <input type="hidden" name="sfl" value="<?php echo $sfl ?>">
    <input type="hidden" name="stx" value="<?php echo $stx ?>">
    <input type="hidden" name="spt" value="<?php echo $spt ?>">
    <input type="hidden" name="sst" value="<?php echo $sst ?>">
    <input type="hidden" name="sod" value="<?php echo $sod ?>">
    <input type="hidden" name="page" value="<?php echo $page ?>">

<input type=hidden name=wr_subject value="1">
<input type=hidden name=wr_content value="1">

    <?php
    $option = '';
    $option_hidden = '';
    if ($is_notice || $is_html || $is_secret || $is_mail) {
        $option = '';
        if ($is_notice) {
            $option .= "\n".'<input type="checkbox" id="notice" name="notice" value="1" '.$notice_checked.'>'."\n".'<label for="notice">공지</label>';
        }

        if ($is_html) {
            if ($is_dhtml_editor) {
                $option_hidden .= '<input type="hidden" value="html1" name="html">';
            } else {
                $option .= "\n".'<input type="checkbox" id="html" name="html" onclick="html_auto_br(this);" value="'.$html_value.'" '.$html_checked.'>'."\n".'<label for="html">html</label>';
            }
        }

        if ($is_secret) {
            if ($is_admin || $is_secret==1) {
                $option .= "\n".'<input type="checkbox" id="secret" name="secret" value="secret" '.$secret_checked.'>'."\n".'<label for="secret">비밀글</label>';
            } else {
                $option_hidden .= '<input type="hidden" name="secret" value="secret">';
            }
        }

        if ($is_mail) {
            $option .= "\n".'<input type="checkbox" id="mail" name="mail" value="mail" '.$recv_email_checked.'>'."\n".'<label for="mail">답변메일받기</label>';
        }
    }

    echo $option_hidden;
    ?>

<style type="text/css">
.info { }
.title { font-size:18px; }
.scr { overflow-y:scroll; color:#777; margin:10px auto; padding:10px;border:1px solid #ccc; height:200px; text-align:left;}
.in { border:none;text-align:center; font-size:17px; font-weight:bold; padding:4px; background:#006600; color:#fff; }
</style>


<script language="javascript">
function termDate(){
 f=document.fwrite;
    
 v1=f.wr_1.value.split("-");
 v2=f.wr_2.value.split("-");
 a1=new Date(v1[0],v1[1]-1,v1[2]).getTime();
 a2=new Date(v2[0],v2[1]-1,v2[2]).getTime();
 
 b=(a2-a1)/(1000*60*60*24);
 
 f.wr_15.value=b; 
 
}
</script> 


<script language="javascript">
function showHide() 
{ 
if ( fwrite.cc.checked ) {

	document.all.layer.style.display = ""
} else { 
	document.all.layer.style.display = "none"
	}
}
</script>

   <div id="order_warp">

<? if($is_guest) { ?>
				<div class="info">
					
					<span class="title">이용안내</span>

					<div class="scr">
■ 포함사항 및 할인혜택<br><br>
 1. 모든 방가격은 아침식사를 포함한 가격입니다.<br>
    단, 식사를 하지 않으셔도 추가 환불되지는 않습니다. <br>
    아침식사는 American breakfast와 한식메뉴로 그날의 특성에 맞게 제공됩니다.<br>
 2. 모든 객실은 개별 화장실과 샤워할 수 있는 공간을 갖추고 있습니다.<br>
 3. 전층 무료 wifi가 제공되며 비밀번호는 guesthouse입니다.<br>
 4. 입실 시간전과 퇴실시간 이후에도 짐을 맡겨두고 관광을 다녀오셔도 됩니다.<br>
 5. 게스트하우스 입실 손님이 카페를 이용하실 경우 10% 할인혜택을 드립니다.<br><br>
 

■ 이용시 유의사항<br><br>
1. 체크인 시간은 오후 2시이며, 체크아웃 시간은 오전 11시입니다.<br>
2. 아침식사는 지하층의 카페 소꿉놀이에서 8:30부터 10:00 사이에 드실 수 있습니다.<br>
3. 침구의 오염우려로 객실안에서  음식물을 드실 수 없습니다.<br>
  침구 오염시 세탁비를 지불하셔야 합니다.<br>
4. 간단한 차와 간식은 1층 로비에서 드실 수 있습니다.<br>
5. 게스트하우스 전체는 금연 구역입니다.<br>
6. 예약손님외 외부인의 출입을 금합니다.<br>
7. 신발은 방에서만 벗으세요. 그 외의 공간에서는 신발을 신고 다니세요.<br>
8. 매일 수건을 제공하여 드립니다.<br>
   사용하신 수건은 문밖에 두시면 저희가 수거해 갑니다.<br><br>



■ 예약취소 규정안내<br><br>
  부득이 예약을 취소하실 경우 아래의 환불규정이 적용됩니다.<br>
  단, <br>
   입실일 10일전까지 취소시 : 100% 전액환불<br>
   입실일 9일에서 5일전까지 취소시 : 70% 환불<br>
   입실일 4일에서 1일전까지 취소시 : 50% 환불<br>
   입실 당일 취소시 : 환불 없음<br><br>


■ 입금안내<br><br>
 1. 계좌번호 : 국민은행 343601-04-092961 김원선(숨바꼭질Hide&Seek)<br>
 2. 예약후 24시간 이내에 입금하지 않으실 경우 예약이 취소 될 수 있습니다.<br>
 3. 무통장 입금 시 반드시 예약자 명으로 입금해 주시기 바랍니다. 명의가 다를 시 입금 확인이 되지 않습니다.<br><br>
 
■ 이용시 유의사항 및 예약취소 규정을 확인하였고 이에 동의합니다.<br>

					</div>

					<p align="center">
						위 이용안내 사항을 읽고 확인하셨나요? <input type="checkbox" name="chk">
					</p>


				</div>

				<br><br>

<? } ?>			


				<span class="title">예약문의</span>

				<table id="form11" style="margin-top:10px;">

				<? if($is_admin) {?>
				<tr>
				<td class="head">예약상태</td>
				<td>
					<select name="wr_8">
						<option value="" selected>선택</option>
						<option value="가능" <?=($write['wr_8'] == "가능")?'selected':'';?>>가능</option>
						<option value="진행" <?=($write['wr_8'] == "진행")?'selected':'';?>>진행</option>
						<option value="선금" <?=($write['wr_8'] == "선금")?'selected':'';?>>선금</option>
						<option value="잔금" <?=($write['wr_8'] == "잔금")?'selected':'';?>>잔금</option>
					</select>

					선금 : <input class="input2" name="wr_13" type="text" value="<?=$write['wr_13']?>"> / 잔금 : <input class="input2" name="wr_14" type="text" value="<?=$write['wr_14']?>">
				</td>
				</tr>
		
				<? } ?>

				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Room<br>룸선택</td>
				<td>
					<select name="wr_9" id="room">
						<option value="" selected>선택</option>
						<option value="Spring" <?=($write['wr_9'] == "Spring")?'selected':'';?>>Spring</option>
						<option value="Summer" <?=($write['wr_9'] == "Summer")?'selected':'';?>>Summer</option>
						<option value="Autumn" <?=($write['wr_9'] == "Autumn")?'selected':'';?>>Autumn</option>
						<option value="Winter" <?=($write['wr_9'] == "Winter")?'selected':'';?>>Winter</option>
						<option value="four seasons" <?=($write['wr_9'] == "four seasons")?'selected':'';?>>four seasons</option>
					</select>
				</td>
				</tr>

				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Check in<br><font color="#888888">입실날짜</font></td>
				<td>
					<div style="float:left;">
						<input type="text" class="input3" name="wr_1" size="16" maxlength="16" id="wr_1" readonly value="<? if ($w == '') { ?><?=$write['wr_1']?><? } else { ?><?php echo date('Y-m-d', strtotime($write['wr_1'])) ?><? } ?>">
						<select name="wr_10" style="margin-top:5px;" requierd>
							 <? 
								for ($i = 6; $i <= 24; $i++) {
								echo "<option value='$i : 00' >$i : 00</option>"; 
								} 
							?>
						</select>
					</div>

					<div style="float:left; padding-left:20px;"><div style="float:left;">Check Out<br><font color="#888888">퇴실날짜</font></div>
						<div style="float:left;">
							<input type="text" class="input3" name="wr_2"  size="16" maxlength="16" id="wr_2" value="<? if ($w == '') { ?><?=$write['wr_2']?><? } else { ?><?php echo date('Y-m-d', strtotime($write['wr_2'])) ?><? } ?>"  readonly onchange="javascript:termDate();">
						</div>
						<div style="float:left; padding-left:10px; ">
						<input type="text" name="wr_15" size="2" maxlength="2" value="<?=$write['wr_15']?>" class="in" readonly> Night
						</div>
					</div>

				</td>
				</tr>

				

				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Name<br><font color="#888888">예약자명</font></td>
				<td>
					<input class="input" name="wr_name" type="text" id="name" value="<?=$write['wr_name']?>"> <input type="checkbox" name="cc" onClick="showHide(this);"> 예약자명과 숙박자명이 다릅니다.<br>
				</td>
				</tr>
				<? if($w == '') { ?>
				<tr id="layer" style="display:none;">
					<td class="head"></td>
					<td>숙박자명 : <input class="input3" name="wr_11" type="text" value="<?=$write['wr_11']?>"> / 숙박자연락처 : <input class="input3" name="wr_12" type="text" value="<?=$write['wr_12']?>">
				</tr>
				<? } else if($w == 'u') { ?>
				<tr id="layer">
					<td class="head"></td>
					<td>숙박자명 : <input class="input3" name="wr_11" type="text" value="<?=$write['wr_11']?>"> / 숙박자연락처 : <input class="input3" name="wr_12" type="text" value="<?=$write['wr_12']?>">
				</tr>
				<? } ?>
				
				
				<?
$wr_6 = explode("-",$write['wr_6']);
$tel1 = $wr_6[0];
$tel2 = $wr_6[1];
$tel3 = $wr_6[2];
?>
			
				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Tel<br><font color="#888888">연락처</font></td>
				<td>
					<select name="tel1" id="tel1" class="input_tel">
					<option value="" >선택</option>
					<option value="010" <?=($tel1 == "010")?'selected':'';?>>010</option>
					<option value="011" <?=($tel1 == "011")?'selected':'';?>>011</option>
					<option value="016" <?=($tel1 == "016")?'selected':'';?>>016</option>
					<option value="017" <?=($tel1 == "017")?'selected':'';?>>017</option>
					<option value="018" <?=($tel1 == "018")?'selected':'';?>>018</option>
					<option value="019" <?=($tel1 == "019")?'selected':'';?>>019</option>
					</select> - 
					<input name="tel2" class="input_tel" type="text" maxlength="4" size="4" id="tel2" value="<?=$tel2?>"> - 
					<input name="tel3" class="input_tel" type="text" maxlength="4" size="4" id="tel3" value="<?=$tel3?>">
				</td>
				</tr>

<?
$wr_7 = explode("@",$write['wr_7']);
$email1 = $wr_7[0];
$email2 = $wr_7[1];
?>

				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>E-mail<br>이메일</td>
				<td>
					<input name="email1" class="input_email" type="text" id="email1" value="<?=$email1?>"> @ 
					<input name="email2" class="input_email" type="text" id="email2" value="<?=$email2?>">
				</td>
				</tr>

				

				
				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Adult<br><font color="#888888">투숙인원(만7세 이상)</font></td>
				<td>
					<input name="wr_3" type="text" class="input" id="wr_3" value="<?=$write['wr_3']?>"  style="text-align:right;ime-mode:disabled;"> 명
				</td>
				</tr>


				<tr>
				<td class="head"><div style="position:absolute; top:15px; left:0px; color:#cc0000">*</div>Children<br><font color="#888888">투숙인원(만7세 미만)</font></td>
				<td>
					<input name="wr_4" type="text" class="input" id="wr_4" value="<?=$write['wr_4']?>"  style="text-align:right;ime-mode:disabled;"> 명
				</td>
				</tr>


				<tr>
				<td class="head">Remark<br><font color="#888888">특이사항</font></td>
				<td>
					<textarea name="wr_5" class="input_text" rows="6" cols="20" id="wr_5" onkeyup="TextBoxInputLengthCheck(100,'wr_5','textlimit');"><?=$write['wr_5']?></textarea>
					<div style="font-family:Tahoma,돋움; font-size:11px; color:#888888; padding-top:4px;"><span id="textlimit">0</span>/100 bytes (최대 한글 100자, 영문 100자)</div>

				</td>
				</tr>



				</table>

				<div class="btn">

					<? if($w == 'u') { ?>
					<input type="submit" value="수정완료" id="btn_submit" accesskey="s" class="btn_submit">
					<a href="./board.php?bo_table=<?php echo $bo_table ?>" class="btn_cancel">취소</a>
					<? } else { ?>
					<input type="submit" value="예약문의" id="btn_submit" accesskey="s" class="btn_submit">
					<? if($is_admin) {?>
					<a href="./board.php?bo_table=<?php echo $bo_table ?>" class="btn_cancel">취소</a>
					<? } ?>
					<? } ?>
				</div>
	

</form>



</div>

    <script>

    <?php if($write_min || $write_max) { ?>
    // 글자수 제한
    var char_min = parseInt(<?php echo $write_min; ?>); // 최소
    var char_max = parseInt(<?php echo $write_max; ?>); // 최대
    check_byte("wr_content", "char_count");

    $(function() {
        $("#wr_content").on("keyup", function() {
            check_byte("wr_content", "char_count");
        });
    });

    <?php } ?>
    function html_auto_br(obj)
    {
        if (obj.checked) {
            result = confirm("자동 줄바꿈을 하시겠습니까?\n\n자동 줄바꿈은 게시물 내용중 줄바뀐 곳을<br>태그로 변환하는 기능입니다.");
            if (result)
                obj.value = "html2";
            else
                obj.value = "html1";
        }
        else
            obj.value = "";
    }

    function fwrite_submit(f)
    {

	if (!f.chk.checked) {
            alert("이용안내 사항에 체크하셔야 합니다.");
            f.chk.focus();
            return false;
        }


	if(!f.room.value)
	{
		alert("'룸선택' 항목은 필수 선택 사항입니다.");
		$("#room").focus();
		return false;
	}

	if(!f.wr_1.value)
	{
		alert("'입실날짜' 항목은 필수 입력 사항입니다.");
		$("#wr_1").focus();
		return false;
	}


	if(!f.wr_2.value)
	{
		alert("'퇴실날짜' 항목은 필수 입력 사항입니다.");
		$("#wr_2").focus();
		return false;
	}

	if(!f.name.value)
	{
		alert("'예약자명' 항목은 필수 입력 사항입니다.");
		$("#name").focus();
		return false;
	}


	if(!$("#tel1").val() || !$("#tel2").val() || !$("#tel3").val())
	{
		alert("'연락처' 항목은 필수 입력 사항입니다.");
		$("#tel1").focus();
		return false;
	}


	if(!$("#email1").val() || !$("#email2").val())
	{
		alert("'이메일' 항목은 필수 입력 사항입니다.");
		$("#email1").focus();
		return false;
	}

	

	if(!f.wr_3.value)
	{
		alert("'투숙인원(7세이상)' 항목은 필수 입력 사항입니다.");
		$("#wr_3").focus();
		return false;
	}

	if(!f.wr_4.value)
	{
		alert("'투숙인원(7세미만)' 항목은 필수 입력 사항입니다.");
		$("#wr_4").focus();
		return false;
	}

	
	
	

        <?php echo $editor_js; // 에디터 사용시 자바스크립트에서 내용을 폼필드로 넣어주며 내용이 입력되었는지 검사함   ?>

        var subject = "";
        var content = "";
        $.ajax({
            url: g5_bbs_url+"/ajax.filter.php",
            type: "POST",
            data: {
                "subject": f.wr_subject.value,
                "content": f.wr_content.value
            },
            dataType: "json",
            async: false,
            cache: false,
            success: function(data, textStatus) {
                subject = data.subject;
                content = data.content;
            }
        });

        if (subject) {
            alert("제목에 금지단어('"+subject+"')가 포함되어있습니다");
            f.wr_subject.focus();
            return false;
        }

        if (content) {
            alert("내용에 금지단어('"+content+"')가 포함되어있습니다");
            if (typeof(ed_wr_content) != "undefined")
                ed_wr_content.returnFalse();
            else
                f.wr_content.focus();
            return false;
        }

        if (document.getElementById("char_count")) {
            if (char_min > 0 || char_max > 0) {
                var cnt = parseInt(check_byte("wr_content", "char_count"));
                if (char_min > 0 && char_min > cnt) {
                    alert("내용은 "+char_min+"글자 이상 쓰셔야 합니다.");
                    return false;
                }
                else if (char_max > 0 && char_max < cnt) {
                    alert("내용은 "+char_max+"글자 이하로 쓰셔야 합니다.");
                    return false;
                }
            }
        }

        <?php echo $captcha_js; // 캡챠 사용시 자바스크립트에서 입력된 캡챠를 검사함  ?>

        document.getElementById("btn_submit").disabled = "disabled";

        return true;
    }
    </script>
</section>
<!-- } 게시물 작성/수정 끝 -->