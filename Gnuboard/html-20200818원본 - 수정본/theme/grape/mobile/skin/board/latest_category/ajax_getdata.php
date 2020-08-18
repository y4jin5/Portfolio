<?php
	$url = $_POST["url"];
	$table = "g5_write_". $_POST["t"];
	$cate = $_POST["c"];
	if ($cate == "전체") $where = "";
	else $where = "where ca_name like '$cate' ";


	include_once($url. '/common.php');
	$res = sql_query("select * from $table $where order by wr_num limit $rows");
	$num_rows = sql_num_rows($res);
	if($num_rows == 0){
		echo "<ul><li>게시물이 없습니다.</li></ul>";
		exit;
	}

	echo "<ul>";
	while($row = sql_fetch_array($res)) {
		$link = G5_BBS_DIR. "/board.php?bo_table=". $_POST["t"]. "&wr_id=". $row['wr_id'];
		echo "<li class=\"basic_li\">";					
		echo "<a href='".$link. "'>";
		echo "<span class='new_ti'>". $row['wr_subject']. "</span>";
		echo "</a>";
		echo "<span class=\"new_dt\">". date('m-d',strtotime($row['wr_datetime'])). "</span>";
		echo "</li>";
	}	
	echo "</ul>";
	
?>