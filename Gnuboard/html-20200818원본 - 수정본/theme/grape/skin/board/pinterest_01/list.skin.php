<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
include_once(G5_LIB_PATH.'/thumbnail.lib.php');
$thumb_long = 960; // 썸네일 긴축
$thumb_width = 442; // 화면에 표시될 썸네일 너비
/*
 1100px 기준
 width: 194,  5개
 width: 247,  4개
 width: 336,  3개
 width: 515,  2개
 1880px 기준
 width: 442,  4개
 width: 349,  5개
 width: 288,  6개
 width: 244,  7개
 */
// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/css/style.css">', 1000);
/* add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/css/imagelightbox.css">', 1000); */
add_stylesheet('<link rel="stylesheet" href="'.$board_skin_url.'/css/lightgallery.css">', 1000);
// 게시글리스트 썸네일 생성
function get_list_thumbnail_masonry($bo_table, $wr_id, $thumb_long, $is_create=false, $is_crop=false, $crop_mode='center', $is_sharpen=false, $um_value='80/0.5/3')
{
    global $g5, $config;
    $filename = $alt = "";
    $edt = false;
    
    $sql = " select bf_file, bf_content from {$g5['board_file_table']}
                where bo_table = '$bo_table' and wr_id = '$wr_id' and bf_type between '1' and '3' order by bf_no limit 0, 1 ";
    $row = sql_fetch($sql);
    
    if($row['bf_file']) {
        $filename = $row['bf_file'];
        $filepath = G5_DATA_PATH.'/file/'.$bo_table;
        $alt = get_text($row['bf_content']);
        $srcfile = $filepath.'/'.$filename;
        $size = @getimagesize($srcfile);
    } else {
        $write_table = $g5['write_prefix'].$bo_table;
        $sql = " select wr_content from $write_table where wr_id = '$wr_id' ";
        $write = sql_fetch($sql);
        $matches = get_editor_image($write['wr_content'], false);
        $edt = true;
        
        for($i=0; $i<count($matches[1]); $i++)
        {
            // 이미지 path 구함
            $p = parse_url($matches[1][$i]);
            if(strpos($p['path'], '/'.G5_DATA_DIR.'/') != 0)
                $data_path = preg_replace('/^\/.*\/'.G5_DATA_DIR.'/', '/'.G5_DATA_DIR, $p['path']);
                else
                    $data_path = $p['path'];
                    
                    $srcfile = G5_PATH.$data_path;
                    
                    if(preg_match("/\.({$config['cf_image_extension']})$/i", $srcfile) && is_file($srcfile)) {
                        $size = @getimagesize($srcfile);
                        if(empty($size))
                            continue;
                            
                            $filename = basename($srcfile);
                            $filepath = dirname($srcfile);
                            
                            preg_match("/alt=[\"\']?([^\"\']*)[\"\']?/", $matches[0][$i], $malt);
                            $alt = get_text($malt[1]);
                            
                            break;
                    }
        }
    }
    
    // jpg 이면 exif 체크
    if($size[2] == 2 && function_exists('exif_read_data')) {
        $degree = 0;
        $exif = @exif_read_data($srcfile);
        if(!empty($exif['Orientation'])) {
            switch($exif['Orientation']) {
                case 8:
                    $degree = 90;
                    break;
                case 3:
                    $degree = 180;
                    break;
                case 6:
                    $degree = -90;
                    break;
            }
            // 세로사진의 경우 가로, 세로 값 바꿈
            if($degree == 90 || $degree == -90) {
                $tmp = $size;
                $size[0] = $tmp[1];
                $size[1] = $tmp[0];
            }
        }
    }
    
    $thumb_width = $thumb_height = $thumb_long;
    if($size[0] > $size[1]) {
        // 가로 사진
        $thumb_width = $thumb_long;
        $thumb_height = round(($thumb_long * $size[1]) / $size[0]);
    } else if($size[0] < $size[1]) {
        // 세로사진
        $thumb_width = round(($thumb_long * $size[0]) / $size[1]);
        $thumb_height = $thumb_long;
    }
    if(!$filename)
        return false;
        
        $tname = thumbnail($filename, $filepath, $filepath, $thumb_width, $thumb_height, $is_create, $is_crop, $crop_mode, $is_sharpen, $um_value);
        
        if($tname) {
            if($edt) {
                // 오리지날 이미지
                $ori = G5_URL.$data_path;
                // 썸네일 이미지
                $src = G5_URL.str_replace($filename, $tname, $data_path);
            } else {
                $ori = G5_DATA_URL.'/file/'.$bo_table.'/'.$filename;
                $src = G5_DATA_URL.'/file/'.$bo_table.'/'.$tname;
            }
        } else {
            return false;
        }
        
        $thumb = array("src"=>$src, "ori"=>$ori, "alt"=>$alt);
        
        return $thumb;
}
?>
  
<!-- 게시판 목록 시작 { -->
<div id="bo_gall" style="width:<?php echo $width; ?>">
	<!-- 게시판 목록 시작 { -->
    <div class="gall_all_wrap">
    	<h2 hidden id="container_title"><?php echo $board['bo_subject'] ?><span class="sound_only"> 목록</span></h2>
    <!-- 게시판 정보 시작 -->
     <?php if ($is_category) { ?>
    <nav id="bo_cate">
        <h2><?php echo $board['bo_subject'] ?> 카테고리</h2>
        <ul id="bo_cate_ul">
            <?php echo $category_option ?>
        </ul>
    </nav>
    <?php } ?>

    <div class="bo_fx">
    <?php  if($member[mb_level] == 9){ //관리자만 가능?>
        <div id="bo_list_total">
            <span>Total <?php //echo number_format($total_count) ?>건</span>
            <?php echo $page ?> 페이지
        </div>
    <?php }?>
        <?php if ($rss_href || $write_href) { ?>
        <ul class="btn_bo_user">
            <?php if ($rss_href) { ?><li><a href="<?php echo $rss_href ?>" class="btn_b01">RSS</a></li><?php } ?>
            <?php if ($admin_href) { ?><li><a href="<?php echo $admin_href ?>" class="btn_admin">관리자</a></li><?php } ?>
            <?php if ($write_href) { ?><li><a href="<?php echo $write_href ?>" class="btn_b02">사진올리기</a></li><?php } ?>
        </ul>
        <?php } ?>
    </div>

    <form name="fboardlist"  id="fboardlist" action="./board_list_update.php" onsubmit="return fboardlist_submit(this);" method="post">
    <input type="hidden" name="bo_table" value="<?php echo $bo_table ?>">
    <input type="hidden" name="sfl" value="<?php echo $sfl ?>">
    <input type="hidden" name="stx" value="<?php echo $stx ?>">
    <input type="hidden" name="spt" value="<?php echo $spt ?>">
    <input type="hidden" name="sst" value="<?php echo $sst ?>">
    <input type="hidden" name="sod" value="<?php echo $sod ?>">
    <input type="hidden" name="page" value="<?php echo $page ?>">
    <input type="hidden" name="sw" value="">

    <?php if ($is_checkbox) { ?>
    <div id="gall_allchk">
        <input type="checkbox" id="chkall" onclick="if (this.checked) all_checked(true); else all_checked(false);">
        <span class="checkmark"></span>
        <label for="chkall" class="chkall">전체 선택</label>
        <?php if ($list_href || $is_checkbox || $write_href) { ?>
        <ul class="btn_bo_adm">
            <li><input type="submit" name="btn_submit" value="선택삭제" onclick="document.pressed=this.value"></li>
            <li><input type="submit" name="btn_submit" value="선택복사" onclick="document.pressed=this.value"></li>
            <li><input type="submit" name="btn_submit" value="선택이동" onclick="document.pressed=this.value"></li>
        </ul>
        <?php } ?>
    </div>
    <?php } ?>
    <!-- 게시판 정보 끝-->
    
    <!-- 게시판 데이터 시작 -->
        <div class="waterfall_wrap">
            	<ul id="waterfall" class="owl-carousel">
            
            <?php for ($i=0; $i<count($list); $i++) {
                if($i>0 && ($i % $bo_gallery_cols == 0))
                    $style = 'clear:both;';
                else
                    $style = '';
                if ($i == 0) $k = 0;
                $k += 1;
                if ($k % $bo_gallery_cols == 0) $style .= "margin:0 !important;";
                $thumb = get_list_thumbnail_masonry($bo_table, $list[$i]['wr_id'], $thumb_long);
                if($thumb['src']) {
                    $img_content = '<img src="'.$thumb['src'].'" alt="'.$thumb['alt'].'" style="width:100%">';
                } else {
                    continue;
                }
             ?>
                	<li>
                    <div class="grid">
                    	<a href="<?php echo $list[$i]['href'] ?>">
                    	<figure class="effect-ming">
                    		<?php echo $img_content ?>
                        	<figcaption class="list_disnone">
								<span><?php echo $list[$i]['subject'] ?>.</span>
							</figcaption>		
						</figure>	
                    	</a>
                    	<?php if ($admin_href) {?>
                    	<div class="chk_and_wrbtn">
                    	<?php if ($is_checkbox) { ?>
                            <label for="chk_wr_id_<?php echo $i ?>" class="sound_only"><?php echo $list[$i]['subject'] ?></label>
                            <input type="checkbox" name="chk_wr_id[]" value="<?php echo $list[$i]['wr_id'] ?>" id="chk_wr_id_<?php echo $i ?>" class="chk_wr_ids">
                    	<?php } ?>
            				<a class="modified" href="<?php echo G5_BBS_URL ?>/write.php?w=u&bo_table=<?php echo $bo_table ?>&wr_id=<?php echo $list[$i]['wr_id'] ?>">수정하기</a>
        				 </div>
            			<?php }?>
                	</div>
                		<figcaption>
                  			<h5 class="figure" data-selector="h5.figure" data-ie-clamp="1,1,1"><?php echo $list[$i]['subject'] ?></h5> 
                  			<div class="figure datetime hide"><?php echo $list[$i]['datetime2'] ?></div>
                  		</figcaption>
                	</li>
                	
            <?php } ?>
            </ul>
        </div>
    </div>
    </form>
</div>

<?php if($is_checkbox) { ?>
<noscript>
<p>자바스크립트를 사용하지 않는 경우<br>별도의 확인 절차 없이 바로 선택삭제 처리하므로 주의하시기 바랍니다.</p>
</noscript>
<?php } ?>

<!-- 페이지 
<?php //echo $write_pages;  ?>
-->
<!-- 게시물 검색 시작 { 
<fieldset id="bo_sch">
    <legend>게시물 검색</legend>

    <form name="fsearch" method="get">
    <input type="hidden" name="bo_table" value="<?php echo $bo_table ?>">
    <input type="hidden" name="sca" value="<?php echo $sca ?>">
    <input type="hidden" name="sop" value="and">
    <label for="sfl" class="sound_only">검색대상</label>
    <select name="sfl" id="sfl">
        <option value="wr_subject"<?php echo get_selected($sfl, 'wr_subject', true); ?>>제목</option>
        <option value="wr_content"<?php echo get_selected($sfl, 'wr_content'); ?>>내용</option>
        <option value="wr_subject||wr_content"<?php echo get_selected($sfl, 'wr_subject||wr_content'); ?>>제목+내용</option>
        <option value="mb_id,1"<?php echo get_selected($sfl, 'mb_id,1'); ?>>회원아이디</option>
        <option value="mb_id,0"<?php echo get_selected($sfl, 'mb_id,0'); ?>>회원아이디(코)</option>
        <option value="wr_name,1"<?php echo get_selected($sfl, 'wr_name,1'); ?>>글쓴이</option>
        <option value="wr_name,0"<?php echo get_selected($sfl, 'wr_name,0'); ?>>글쓴이(코)</option>
    </select>
    <label for="stx" class="sound_only">검색어<strong class="sound_only"> 필수</strong></label>
    <input type="text" name="stx" value="<?php echo stripslashes($stx) ?>" required id="stx" class="frm_input required" size="15" maxlength="20">
    <input type="submit" value="검색" class="btn_submit">
    </form>
</fieldset>
<!-- } 게시물 검색 끝 -->
<script type="text/javascript" src="<?php echo $board_skin_url ?>/js/lightgallery-all.min.js"></script>
<script type="text/javascript" src="<?php echo $board_skin_url ?>/js/newWaterfall.js"></script>
<script type="text/javascript">
$(document).ready(function ()
{
    $('#waterfall').NewWaterfall({
        width: <?php echo $thumb_width ?>,
        delay: 50,
    });
    //$('#waterfall').lightGallery();
});
</script>

<?php if ($is_checkbox) { ?>
<script>
function all_checked(sw) {
    var f = document.fboardlist;

    for (var i=0; i<f.length; i++) {
        if (f.elements[i].name == "chk_wr_id[]")
            f.elements[i].checked = sw;
    }
}

function fboardlist_submit(f) {
    var chk_count = 0;

    for (var i=0; i<f.length; i++) {
        if (f.elements[i].name == "chk_wr_id[]" && f.elements[i].checked)
            chk_count++;
    }

    if (!chk_count) {
        alert(document.pressed + "할 게시물을 하나 이상 선택하세요.");
        return false;
    }

    if(document.pressed == "선택복사") {
        select_copy("copy");
        return;
    }

    if(document.pressed == "선택이동") {
        select_copy("move");
        return;
    }

    if(document.pressed == "선택삭제") {
        if (!confirm("선택한 게시물을 정말 삭제하시겠습니까?\n\n한번 삭제한 자료는 복구할 수 없습니다\n\n답변글이 있는 게시글을 선택하신 경우\n답변글도 선택하셔야 게시글이 삭제됩니다."))
            return false;

        f.removeAttribute("target");
        f.action = "./board_list_update.php";
    }

    return true;
}

// 선택한 게시물 복사 및 이동
function select_copy(sw) {
    var f = document.fboardlist;

    if (sw == 'copy')
        str = "복사";
    else
        str = "이동";

    var sub_win = window.open("", "move", "left=50, top=50, width=500, height=550, scrollbars=1");

    f.sw.value = sw;
    f.target = "move";
    f.action = "./move.php";
    f.submit();
}
</script>
<?php } ?>
<!-- } 게시판 목록 끝 -->
