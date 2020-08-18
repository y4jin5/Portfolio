<?
if (!defined("_GNUBOARD_")) exit; // 개별 페이지 접근 불가 

// 자신만의 코드를 넣어주세요.

//주민등록번호

/*
$wr_4 = "$ext4_00-$ext4_01";
$sql4 = " update $write_table set wr_4 = '$wr_4' where wr_id = '$wr_id' ";
sql_query($sql4);
*/


//연락가능한 전화번호1
$wr_5 = "$ext5_00-$ext5_01-$ext5_02";
$sql5 = " update $write_table set wr_5 = '$wr_5' where wr_id = '$wr_id' ";
sql_query($sql5);

//연락가능한 전화번호2
$wr_6 = "$ext6_00-$ext6_01-$ext6_02";
$sql6 = " update $write_table set wr_6 = '$wr_6' where wr_id = '$wr_id' ";
sql_query($sql6);

/*
if($w != 'c'){
	$sql = " update $write_table 
				set wr_1 = '$wr_1',
					wr_password = '" . sql_password($wr_1) . "'
				where wr_id='$wr_id' 
			";
	sql_query($sql,FALSE);
}
*/
?>
