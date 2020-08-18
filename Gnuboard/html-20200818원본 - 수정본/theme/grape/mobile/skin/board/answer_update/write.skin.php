<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

function caSubj($val) {
	GLOBAL $board;
	return $board["bo_".$val."_subj"];
}

function caWrite($val,$type="",$required="",$style="") {
	GLOBAL $board,$write,$areaCode,$mNum;

	$fieldValue = @explode("|",$board["bo_".$val]);

	if(strtolower($required) == "r") {
		$required = "required";
	}
	
	$type = @explode("/",$type);
	$perc = $type[1];


	$wr[$val] = @explode("|",$write["wr_".$val]);

	switch(strtolower($type[0])) {

		case "select" :
			if(!$perc) {
				$perc = 1;
			}
		
			for($i=0;$i<$perc;$i++) {
				$fieldValue = @explode("|",$board["bo_".$val]);
				unset($selected);
				$selected[$wr[$val][$i]] = "selected";

				$rtn .= "<select name='wr_{$val}' style='{$style}' class='frm_input {$required}' title='".caSubj($val)."'>";
				$rtn .= "<option value=''>선택하세요</option>";

				foreach($fieldValue as $v) {
					$rtn .= "<option {$selected[$v]} value='{$v}'>{$v}</option>";
				}

				$rtn .= "</select> ";
			}
			return $rtn;

			break;
	}
}

//주민등록번호
$ex4_filed = explode("-",$write[wr_4]); 
$ext4_00  = $ex4_filed[0];
$ext4_01  = $ex4_filed[1];

//연락가능한 전화번호1
$ex5_filed = explode("-",$write[wr_5]); 
$ext5_00  = $ex5_filed[0];
$ext5_01  = $ex5_filed[1];
$ext5_02  = $ex5_filed[2];

//연락가능한 전화번호2
$ex6_filed = explode("-",$write[wr_6]); 
$ext6_00  = $ex6_filed[0];
$ext6_01  = $ex6_filed[1];
$ext6_02  = $ex6_filed[2];

$arr = explode("|",$row[bo_1]);

include_once(G5_PLUGIN_PATH.'/jquery-ui/datepicker.php');

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/style.css">', 0);
?>


<section id="bo_w">
    <h2 id="container_title"><?php echo $g5['title'] ?></h2>

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

	<div style="border:1px solid #ddd; height:34px; background:url(<?php echo $board_skin_url; ?>/img/title_bg.gif) repeat-x;">
	<table width=100% border=0 cellpadding=0 cellspacing=0 style="font-weight:bold; color:#505050;">
	<tr height=34 align=center>
		<td>

		<?=$board[bo_2]?>

		</td>
	</tr>
	</table>
	</div>
<br>
	<div style="border:1px solid #ddd; height:34px; background:url(<?php echo $board_skin_url; ?>/img/title_bg.gif) repeat-x;">
	<div style="font-weight:bold; font-size:12px; margin:12px 0 0 10px;">:: <?php echo $g5['title'] ?> ::</div>
	</div>

	<div style="height:3px; background:url(<?php echo $board_skin_url; ?>/img/title_shadow.gif) repeat-x; line-height:1px; font-size:1px;"></div>

    <div class="tbl_frm01 tbl_wrap">
        <table>
        <tbody>
        <?php if ($is_name) { ?>
        <tr>
            <th scope="row"><label for="wr_name">성 함<strong class="sound_only">필수</strong></label></th>
            <td><input type="text" name="wr_name" value="<?php echo $name ?>" id="wr_name" required class="frm_input required" size="10" maxlength="20"></td>
        </tr>
        <?php } ?>



		<tr>
			<th scope="row"><label for="wr_password">비밀번호<strong class="sound_only">필수</strong></label></th>
			<td><input type="password" name="wr_password" id="wr_password" <?php echo $password_required ?> class="frm_input <?php echo $$write[wr_password] ?>" maxlength="20"> 고객 전화번호 뒤 4자리</td>
			</tr>
		<tr><td colspan=2 height=1 bgcolor=#e7e7e7></td></tr>


        <?php if ($is_email) { ?>
        <tr>
            <th scope="row"><label for="wr_email">이메일</label></th>
            <td><input type="text" name="wr_email" value="<?php echo $email ?>" id="wr_email" class="frm_input email" size="50" maxlength="100"></td>
        </tr>
        <?php } ?>

        <?php if ($is_homepage) { ?>
        <tr>
            <th scope="row"><label for="wr_homepage">홈페이지</label></th>
            <td><input type="text" name="wr_homepage" value="<?php echo $homepage ?>" id="wr_homepage" class="frm_input" size="50"></td>
        </tr>
        <?php } ?>

        <?php if ($option) { ?>
        <tr>
            <th scope="row">옵션</th>
            <td><?php echo $option ?></td>
        </tr>
        <?php } ?>

        <?php if ($is_category) { ?>
        <tr>
            <th scope="row"><label for="ca_name">분류<strong class="sound_only">필수</strong></label></th>
            <td>
                <select name="ca_name" id="ca_name" required class="required" >
                    <option value="">선택하세요</option>
                    <?php echo $category_option ?>
                </select>
            </td>
        </tr>
        <?php } ?>

<!------예약 항목 시작----------------------->


		<tr>
			<th scope="row"><label for="wr_2">예약일자</label></th>
			<td>
				<input type="text" name='wr_2' value="<?php echo $write[wr_2]?>" id="wr_2" class="frm_input" size="11" maxlength="10">&nbsp;&nbsp;<font color="#999999">※ 달력 그림을 클릭하여 날짜를 선택하세요.</font>
			</td>
		</tr>


		<tr>
			<th scope="row"><label for="ext5_00">휴대전화</label></th>
			<td>
			 <select name='ext5_00' itemname='휴대전화' required>
				<option value='010' <?php if ($ext5_00 == "010") echo "selected"; ?>>010</option>
				<option value='011' <?php if ($ext5_00 == "011") echo "selected"; ?>>011</option>
				<option value='012' <?php if ($ext5_00 == "012") echo "selected"; ?>>012</option>
				<option value='013' <?php if ($ext5_00 == "013") echo "selected"; ?>>013</option>
				<option value='014' <?php if ($ext5_00 == "014") echo "selected"; ?>>014</option>
				<option value='015' <?php if ($ext5_00 == "015") echo "selected"; ?>>015</option>
				<option value='016' <?php if ($ext5_00 == "016") echo "selected"; ?>>016</option>
				<option value='017' <?php if ($ext5_00 == "017") echo "selected"; ?>>017</option>
				<option value='018' <?php if ($ext5_00 == "018") echo "selected"; ?>>018</option>
				<option value='019' <?php if ($ext5_00 == "019") echo "selected"; ?>>019</option>
			  </select> - 
			  <input name='ext5_01' class=ed value='<?php echo $ext5_01?>' type='text' size='4' maxlength='4' onkeydown='onlyNumber(this);'  itemname='휴대전화 두번째자리' required class=frm_input>  - 
			  <input name='ext5_02' class=ed value='<?php echo $ext5_02?>' type='text' size='4' maxlength='4' onkeydown='onlyNumber(this);'  itemname='휴대전화 세번째자리' required class=frm_input>
			</td>
		</tr>


		<tr>
			<th scope="row"><label for="ext6_00">전화번호</label></th>
			<td>
			 <select name='ext6_00' itemname='전화번호' required>
				<option value='02' <?php if ($ext6_00 == "02") echo "selected"; ?>>02</option>
				<option value='03' <?php if ($ext6_00 == "03") echo "selected"; ?>>03</option>
				<option value='04' <?php if ($ext6_00 == "04") echo "selected"; ?>>04</option>
				<option value='05' <?php if ($ext6_00 == "05") echo "selected"; ?>>05</option>
				<option value='06' <?php if ($ext6_00 == "06") echo "selected"; ?>>06</option>
				<option value='07' <?php if ($ext6_00 == "07") echo "selected"; ?>>07</option>
				<option value='08' <?php if ($ext6_00 == "08") echo "selected"; ?>>08</option>
				<option value='09' <?php if ($ext6_00 == "09") echo "selected"; ?>>09</option>
				<option value='10' <?php if ($ext6_00 == "10") echo "selected"; ?>>10</option>
				<option value='11' <?php if ($ext6_00 == "11") echo "selected"; ?>>11</option>
				<option value='031' <?php if ($ext6_00 == "031") echo "selected"; ?>>031</option>
				<option value='032' <?php if ($ext6_00 == "032") echo "selected"; ?>>032</option>
				<option value='033' <?php if ($ext6_00 == "033") echo "selected"; ?>>033</option>
				<option value='041' <?php if ($ext6_00 == "041") echo "selected"; ?>>041</option>
				<option value='042' <?php if ($ext6_00 == "042") echo "selected"; ?>>042</option>
				<option value='043' <?php if ($ext6_00 == "043") echo "selected"; ?>>043</option>
				<option value='051' <?php if ($ext6_00 == "051") echo "selected"; ?>>051</option>
				<option value='052' <?php if ($ext6_00 == "052") echo "selected"; ?>>052</option>
				<option value='053' <?php if ($ext6_00 == "053") echo "selected"; ?>>053</option>
				<option value='054' <?php if ($ext6_00 == "054") echo "selected"; ?>>054</option>
				<option value='055' <?php if ($ext6_00 == "055") echo "selected"; ?>>055</option>
				<option value='061' <?php if ($ext6_00 == "061") echo "selected"; ?>>061</option>
				<option value='062' <?php if ($ext6_00 == "062") echo "selected"; ?>>062</option>
				<option value='063' <?php if ($ext6_00 == "063") echo "selected"; ?>>063</option>
				<option value='064' <?php if ($ext6_00 == "064") echo "selected"; ?>>064</option>
			  </select> - 
			  <input name='ext6_01' class=ed value='<?php echo $ext6_01?>' type='text' size='4' maxlength='4' onkeydown='onlyNumber(this);'  itemname='일반전화 두번째자리' required class=frm_input>  - 
			  <input name='ext6_02' class=ed value='<?php echo $ext6_02?>' type='text' size='4' maxlength='4' onkeydown='onlyNumber(this);'  itemname='일반전화 세번째자리' required class=frm_input>
			</td>
		</tr>
	
		
		<tr>
			<th scope="row"><?=caSubj(1);?></th>
			<td>
				<?=caWrite(1,"select/1","r","width:150px")?>
			</td>
		</tr>


<!-------예약 항목 끝------------------------>


        <tr>
            <th scope="row"><label for="wr_subject">제목<strong class="sound_only">필수</strong></label></th>
            <td>
                <div id="autosave_wrapper">
                    <input type="text" name="wr_subject" value="<?php echo $subject ?>" id="wr_subject" required class="frm_input required" size="50" maxlength="255">
                    <?php if ($is_member) { // 임시 저장된 글 기능 ?>
                    <script src="<?php echo G5_JS_URL; ?>/autosave.js"></script>
                    <?php if($editor_content_js) echo $editor_content_js; ?>
                    <button type="button" id="btn_autosave" class="btn_frmline">임시 저장된 글 (<span id="autosave_count"><?php echo $autosave_count; ?></span>)</button>
                    <div id="autosave_pop">
                        <strong>임시 저장된 글 목록</strong>
                        <div><button type="button" class="autosave_close"><img src="<?php echo $board_skin_url; ?>/img/btn_close.gif" alt="닫기"></button></div>
                        <ul></ul>
                        <div><button type="button" class="autosave_close"><img src="<?php echo $board_skin_url; ?>/img/btn_close.gif" alt="닫기"></button></div>
                    </div>
                    <?php } ?>
                </div>
            </td>
        </tr>


        <tr>
            <th scope="row"><label for="wr_content">내용<strong class="sound_only">필수</strong></label></th>
            <td class="wr_content">
                <?php if($write_min || $write_max) { ?>
                <!-- 최소/최대 글자 수 사용 시 -->
                <p id="char_count_desc">이 게시판은 최소 <strong><?php echo $write_min; ?></strong>글자 이상, 최대 <strong><?php echo $write_max; ?></strong>글자 이하까지 글을 쓰실 수 있습니다.</p>
                <?php } ?>
                <?php echo $editor_html; // 에디터 사용시는 에디터로, 아니면 textarea 로 노출 ?>
                <?php if($write_min || $write_max) { ?>
                <!-- 최소/최대 글자 수 사용 시 -->
                <div id="char_count_wrap"><span id="char_count"></span>글자</div>
                <?php } ?>
            </td>
        </tr>

        <?php for ($i=1; $is_link && $i<=G5_LINK_COUNT; $i++) { ?>
        <tr>
            <th scope="row"><label for="wr_link<?php echo $i ?>">링크 #<?php echo $i ?></label></th>
            <td><input type="text" name="wr_link<?php echo $i ?>" value="<?php if($w=="u"){echo$write['wr_link'.$i];} ?>" id="wr_link<?php echo $i ?>" class="frm_input" size="50"></td>
        </tr>
        <?php } ?>

        <?php for ($i=0; $is_file && $i<$file_count; $i++) { ?>
        <tr>
            <th scope="row">파일 #<?php echo $i+1 ?></th>
            <td>
                <input type="file" name="bf_file[]" title="파일첨부 <?php echo $i+1 ?> : 용량 <?php echo $upload_max_filesize ?> 이하만 업로드 가능" class="frm_file frm_input">
                <?php if ($is_file_content) { ?>
                <input type="text" name="bf_content[]" value="<?php echo ($w == 'u') ? $file[$i]['bf_content'] : ''; ?>" title="파일 설명을 입력해주세요." class="frm_file frm_input" size="50">
                <?php } ?>
                <?php if($w == 'u' && $file[$i]['file']) { ?>
                <input type="checkbox" id="bf_file_del<?php echo $i ?>" name="bf_file_del[<?php echo $i;  ?>]" value="1"> <label for="bf_file_del<?php echo $i ?>"><?php echo $file[$i]['source'].'('.$file[$i]['size'].')';  ?> 파일 삭제</label>
                <?php } ?>
            </td>
        </tr>
        <?php } ?>

        <?php if ($is_guest) { //자동등록방지  ?>
        <tr>
            <th scope="row">자동등록방지</th>
            <td>
                <?php echo $captcha_html ?>
            </td>
        </tr>
        <?php } ?>

        </tbody>
        </table>
    </div>

    <div class="btn_confirm">
        <input type="submit" value="작성완료" id="btn_submit" accesskey="s" class="btn_submit">
        <a href="./board.php?bo_table=<?php echo $bo_table ?>" class="btn_cancel">취소</a>
    </div>
    </form>


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

	$(function(){
		$("#wr_2").datepicker({ showOn: "button",
            buttonImage: "<?php echo $board_skin_url; ?>/img/calendar.png",
            buttonImageOnly: true, changeMonth: true, changeYear: true, dateFormat: "yymmdd", showButtonPanel: true, yearRange: "c-99:c+99"/*, minDate: "-0d"*/ });
	});	
	</script>
</section>
<!-- } 게시물 작성/수정 끝 -->