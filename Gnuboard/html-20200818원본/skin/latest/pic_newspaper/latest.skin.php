<?php
	if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가
	include_once(G5_LIB_PATH.'/thumbnail.lib.php');

	// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
	add_stylesheet('<link rel="stylesheet" href="'.$latest_skin_url.'/style.css">', 0);
	$list_count = (is_array($list) && $list) ? count($list) : 0;
	$option_color = $options['color'];
	$option_width = $options['width'];	
	$hover_color = "onMouseOver=\"this.style.color='".$options['color']."'\" ".
	"onMouseOut=\"this.style.color='black'\"";

?>

<section class="pic-newspaper" style="width:<?php echo $option_width ?>">
	<div class="hr" style="border-color: <?php echo $option_color?>;">
		<div class="titlebox" style="<?php echo "background: $option_color; border-color: $option_color;" ?>">
			<a href="<?php echo get_pretty_url($bo_table); ?>"><?php echo $bo_subject; ?></a>
		</div>		
	</div>	

	<article class="flexbox flex-row">	
		<?php	
			for ($i=0; $i<$list_count; $i++) {
				$thumb = get_list_thumbnail($bo_table, $list[$i]['wr_id'], "400", "350", false, true);		
				if($thumb['src']) {
					$img = $thumb['src'];
				} else {
					$img = G5_IMG_URL.'/no_img.png';
					$thumb['alt'] = '이미지가 없습니다.';
				}
				$img_content = '<img src="'.$img.'" alt="'.$thumb['alt'].'" >';

				if($i == 0){
					echo "<ul class=\"big\" >";			
						echo "<li class=\"li-caption \">";
							echo "<a href='". $list[$i]['href']. "' $hover_color>". $img_content.PHP_EOL;
							echo "<h3>". $list[$i]['subject']. "</h3></a>".PHP_EOL;
							echo "<p>". cut_str($list[$i]['wr_content'], 200). "</p>";
						echo "</li>";
					echo "</ul>";
					
					echo "<ul class=\"small\">".PHP_EOL;
				}
				else{				
						echo "<li><a href='". $list[$i]['href']. "' $hover_color>". $img_content.PHP_EOL;
						echo "<h4>".$list[$i]['subject']."</h4></a>".PHP_EOL;				
						echo "</li>";	
				}	
			}
		?>
		</ul>		
	</article>
</section>