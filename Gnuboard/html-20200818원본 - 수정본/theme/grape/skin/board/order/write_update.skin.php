<?php
if (!defined('_GNUBOARD_')) exit; // 개별 페이지 접근 불가



$wr_6 = "$tel1-$tel2-$tel3"; 
$sql2  = " update $write_table set wr_6 = '$wr_6' where wr_id = '$wr_id' ";
sql_query($sql2);

$wr_7 = "$email1@$email2"; 
$sql3  = " update $write_table set wr_7 = '$wr_7' where wr_id = '$wr_id' ";
sql_query($sql3);


$wr_1 = " update $write_table set wr_1 = replace(wr_1, '-', '') where wr_id = '$wr_id' ";
sql_query($wr_1);

$wr_2 = " update $write_table set wr_2 = replace(wr_2, '-', '') where wr_id = '$wr_id' ";
sql_query($wr_2);


$sql15  = " update $write_table set wr_15 = '$wr_15' where wr_id = '$wr_id' ";
sql_query($sql15);

if ($w == '') {

alert("예약접수 되었습니다.", "write.php?bo_table=$bo_table");

} else if ($w == 'u') {

alert("수정 되었습니다.", "../adm/board.php?bo_table=$bo_table");

} 
?>
