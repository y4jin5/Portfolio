<?php
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');
?>

<link rel="stylesheet" href="<?php echo $board_skin_url ?>/style.css">
<script src="<?php echo G5_JS_URL; ?>/viewimageresize.js"></script>

<!-- 게시물 읽기 시작 { -->


<article id="bo_v" style="width:<?php echo $width; ?>">
    <header>
       
    </header>

    <section id="bo_v_info">
        <h2>페이지 정보</h2>
        예약자 <strong><?php echo $view['name'] ?></strong>
        <span class="sound_only">접수일</span>접수일 <strong><?php echo date("20y-m-d", strtotime($view['wr_datetime'])) ?></strong>
    </section>

    <?php
    if ($view['file']['count']) {
        $cnt = 0;
        for ($i=0; $i<count($view['file']); $i++) {
            if (isset($view['file'][$i]['source']) && $view['file'][$i]['source'] && !$view['file'][$i]['view'])
                $cnt++;
        }
    }
     ?>

    <?php if($cnt) { ?>
    <!-- 첨부파일 시작 { -->
    <section id="bo_v_file">
        <h2>첨부파일</h2>
        <ul>
        <?php
        // 가변 파일
        for ($i=0; $i<count($view['file']); $i++) {
            if (isset($view['file'][$i]['source']) && $view['file'][$i]['source'] && !$view['file'][$i]['view']) {
         ?>
            <li>
                <a href="<?php echo $view['file'][$i]['href'];  ?>" class="view_file_download">
                    <img src="<?php echo $board_skin_url ?>/img/icon_file.gif" alt="첨부">
                    <strong><?php echo $view['file'][$i]['source'] ?></strong>
                    <?php echo $view['file'][$i]['bf_content'] ?> (<?php echo $view['file'][$i]['size'] ?>)
                </a>
                <span class="bo_v_file_cnt"><?php echo $view['file'][$i]['download'] ?>회 다운로드</span>
                <span>DATE : <?php echo $view['file'][$i]['datetime'] ?></span>
            </li>
        <?php
            }
        }
         ?>
        </ul>
    </section>
    <!-- } 첨부파일 끝 -->
    <?php } ?>

    <?php
    if (implode('', $view['link'])) {
     ?>
     <!-- 관련링크 시작 { -->
    <section id="bo_v_link">
        <h2>관련링크</h2>
        <ul>
        <?php
        // 링크
        $cnt = 0;
        for ($i=1; $i<=count($view['link']); $i++) {
            if ($view['link'][$i]) {
                $cnt++;
                $link = cut_str($view['link'][$i], 70);
         ?>
            <li>
                <a href="<?php echo $view['link_href'][$i] ?>" target="_blank">
                    <img src="<?php echo $board_skin_url ?>/img/icon_link.gif" alt="관련링크">
                    <strong><?php echo $link ?></strong>
                </a>
                <span class="bo_v_link_cnt"><?php echo $view['link_hit'][$i] ?>회 연결</span>
            </li>
        <?php
            }
        }
         ?>
        </ul>
    </section>
    <!-- } 관련링크 끝 -->
    <?php } ?>


   

    <section id="bo_v_atc">
        <h2 id="bo_v_atc_title">본문</h2>

        <?php
        // 파일 출력
        $v_img_count = count($view['file']);
        if($v_img_count) {
            echo "<div id=\"bo_v_img\">\n";

            for ($i=0; $i<=count($view['file']); $i++) {
                if ($view['file'][$i]['view']) {
                    //echo $view['file'][$i]['view'];
                    echo get_view_thumbnail($view['file'][$i]['view']);
                }
            }

            echo "</div>\n";
        }
         ?>


        <!-- 본문 내용 시작 { -->
        <div id="bo_v_con">

<style type="text/css">
#info { width:400px; }
#info .head { width:70px;padding:5px; background:#eaeaea;}	
#info td { border:1px solid #ccc; padding:8px;}
</style>
		<table id="info">
		<tr>
			<td class="head"><b>예약상태</b></td>
			<td><?=$view['wr_8']?> ( <b>선금</b> : <?=$view['wr_13']?> / <b>잔금</b> : <?=$view['wr_14']?> )</td>
		</tr>

		<tr>
			<td class="head"><b>룸정보</b> </td>
			<td><?=$view['wr_9']?></td>
		</tr>

		<tr>
			<td class="head"><b>예약자명</b></td>
			<td><?=$view['wr_name']?> (<b>입금자명</b> : <?=$view['wr_11']?> <b>연락처</b> : <?=$view['wr_12']?> )</td>
		</tr>

		<tr>
			<td class="head"><b>연락처</b></td>
			<td><?=$view['wr_6']?></td>
		</tr>

		<tr>
			<td class="head"><b>이메일</b></td>
			<td><?=$view['wr_7']?></td>
		</tr>

		<tr>
			<td class="head"><b>입실날짜</b></td>
			<td><?=date("20y-m-d", strtotime($view[wr_1]))?> ( <b>시간</b> : <?=$view['wr_10']?> )</td>
		</tr>

		<tr>
			<td class="head"><b>퇴실날짜</b></td>
			<td><?=date("20y-m-d", strtotime($view[wr_2]))?> <input type="text" name="wr_15" size="2" maxlength="1" value="<?=$write['wr_15']?>" style="border:none;text-align:center; font-size:17px; font-weight:bold; padding:4px; background:#006600; color:#fff;"> Night</td>
		</tr>

		<tr>
			<td class="head"><b>특이사항</b></td>
			<td><?=$view['wr_5']?></td>
		</tr>
		</table>


		
		</div>
        <?php//echo $view[rich_content]; // {이미지:0} 과 같은 코드를 사용할 경우 ?>
        <!-- } 본문 내용 끝 -->

        <?php if ($is_signature) { ?><p><?php echo $signature ?></p><?php } ?>

       
    </section>

    <?php
    include_once(G5_SNS_PATH."/view.sns.skin.php");
    ?>

   

    <!-- 링크 버튼 시작 { -->
    <div id="bo_v_bot">
         <ul class="bo_v_com">
            <?php if ($update_href) { ?><li><a href="<?php echo $update_href ?>" class="btn_b10">예약상태수정</a></li><?php } ?>
            <?php if ($delete_href) { ?><li><a href="<?php echo $delete_href ?>" class="btn_b01" onclick="del(this.href); return false;">삭제</a></li><?php } ?>
            <li><a href="<?php echo $list_href ?>" class="btn_b01">목록</a></li>


        </ul>
    </div>
    <!-- } 링크 버튼 끝 -->

</article>
<!-- } 게시판 읽기 끝 -->

<script>
<?php if ($board['bo_download_point'] < 0) { ?>
$(function() {
    $("a.view_file_download").click(function() {
        var msg = "파일을 다운로드 하시면 포인트가 차감(<?php echo number_format($board['bo_download_point']) ?>점)됩니다.\n\n포인트는 게시물당 한번만 차감되며 다음에 다시 다운로드 하셔도 중복하여 차감하지 않습니다.\n\n그래도 다운로드 하시겠습니까?";

        if(confirm(msg)) {
            var href = $(this).attr("href")+"&js=on";
            $(this).attr("href", href);

            return true;
        } else {
            return false;
        }
    });
});
<?php } ?>

function board_move(href)
{
    window.open(href, "boardmove", "left=50, top=50, width=500, height=550, scrollbars=1");
}
</script>

<script>
$(function() {
    $("a.view_image").click(function() {
        window.open(this.href, "large_image", "location=yes,links=no,toolbar=no,top=10,left=10,width=10,height=10,resizable=yes,scrollbars=no,status=no");
        return false;
    });

    // 추천, 비추천
    $("#good_button, #nogood_button").click(function() {
        var $tx;
        if(this.id == "good_button")
            $tx = $("#bo_v_act_good");
        else
            $tx = $("#bo_v_act_nogood");

        excute_good(this.href, $(this), $tx);
        return false;
    });

    // 이미지 리사이즈
    $("#bo_v_atc").viewimageresize();
});

function excute_good(href, $el, $tx)
{
    $.post(
        href,
        { js: "on" },
        function(data) {
            if(data.error) {
                alert(data.error);
                return false;
            }

            if(data.count) {
                $el.find("strong").text(number_format(String(data.count)));
                if($tx.attr("id").search("nogood") > -1) {
                    $tx.text("이 글을 비추천하셨습니다.");
                } else {
                    $tx.text("이 글을 추천하셨습니다.");
                }
            }
        }, "json"
    );
}
</script>
<!-- } 게시글 읽기 끝 -->