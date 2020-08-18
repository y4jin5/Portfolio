<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가

// add_stylesheet('css 구문', 출력순서); 숫자가 작을 수록 먼저 출력됨
add_stylesheet('<link rel="stylesheet" href="'.$content_skin_url.'/style.css">', 0);
?>

<article id="ctt" class="ctt_<?php echo $co_id; ?>">
    <header>
        <h1><?php echo $g5['title']; ?></h1>
    </header>

    <div id="ctt_con">

    	<article class="timeline">
			<ul class="timeline timeline-split">

				

        <?php 
        $str = str_replace("</p><p>", "</p>\n<p>", $str);
        $str = strip_tags($str);
        $lines = explode("\n", $str);
        $old_year = "";
        for($i=0; $i<count($lines); $i++){
        	$data = explode("//", $lines[$i]);
        	$date = $data[0];
        	$year = strstr($date, ".", true);
        	$text = $data[1];       	

        	if ($old_year != $year){
        		if  ($old_year != "") echo "</div></li>".PHP_EOL;
        		echo "<li class=\"timeline-item\">".PHP_EOL;
        		echo "<div class=\"timeline-info\">";
				echo "<span>$year</span>";
				echo "</div>".PHP_EOL;
				echo "<div class=\"timeline-marker\"></div>";
				echo "<div class=\"timeline-content\">";
				$old_year = $year;
        	}        	
        	
        	echo "<div class=\"timeline-title\">";
        	echo "<span>". $date. " </span> ". $text;
        	echo "</div>";
        }
        ?>
    				</div>
    			</li>
	    	</ul>
		</article>
    </div>

</article>