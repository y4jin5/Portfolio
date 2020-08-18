<?php
	if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가	
	
	// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
	add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/style.css">', 0);
	$list_count = (is_array($list) && $list) ? count($list) : 0;
	$option_color = $options['color'];
	$option_width = $options['width'];
?>

<article class="latest-category" style="width:<?php echo $option_width ?>">
	<div class="tabs">

	<?php

		echo "<input id='tab1' type='radio' name='tabs'>";
		echo "<label for='tab1'><a href='". get_pretty_url($bo_table). "'>". $bo_subject. "</a></label>";

		echo "<input id='tab2' type='radio' name='tabs' checked>\n";
		echo "<label for='tab2' onclick=\"ajax_getdata('전체')\">전체</label>\n";

		$row = sql_fetch("select bo_category_list from g5_board where bo_table = '$bo_table'");

		$categories = explode("|", $row['bo_category_list']);
		for ($i=0; $i<count($categories); $i++) {
			$category = trim($categories[$i]);
			if (!$category) continue;
			echo "<input id='tab". ($i+3). "' type='radio' name='tabs'>\n";
			echo "<label for='tab". ($i+3). "' onclick=\"ajax_getdata('".$category ."')\">". $category. "</label>\n";			
		}		
	?>
		<div id="content" class="tab">
			<ul>
			<?php for ($i=0; $i<$list_count; $i++) {  ?>
				<li class="basic_li">
					<?php
					echo "<a href='".$list[$i]['href']. "'>";
					echo "<span class='new_ti'>". $list[$i]['subject']. "</span>";
					echo "</a>";					
					?>
					<span class="new_dt"><?php echo $list[$i]['datetime2'] ?></span>              
				</li>
			<?php }  ?>
			<?php if ($list_count == 0) { //게시물이 없을 때  ?>
			<li class="empty_li">게시물이 없습니다.</li>
			<?php }  ?>
			</ul>
		</div>
	</div>
</article>

<script>
	function ajax_getdata(val){		
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {				
				document.getElementById("content").innerHTML = this.responseText;
				//console.log(this.responseText);
			}
		};
		xhttp.open("POST", "<?php echo $latest_skin_url;?>/ajax_getdata.php", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("rows=<?php echo $rows?>&url=<?php echo G5_PATH?>&t=<?php echo $bo_table?>&c=" + val);
		//console.log("url=<?php echo $rows?>&url=<?php echo G5_PATH?>&t=<?php echo $bo_table?>&c=" + val);
	}

	document.documentElement.style.setProperty('--tab-background', '<?php echo $option_color; ?>');
</script>
