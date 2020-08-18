<?php
error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING );



$currdate = $_GET["currdate"];
//$nowdate = date("Ymd",strtotime("20150119"));
$nowdate = date("Ymd",time());
$day_type = date("N",strtotime($currdate)); // 1~5 평일, 6 토요일


$time_array[1] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00");
$time_array[2] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00");
$time_array[3] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00");
$time_array[4] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00");
$time_array[5] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00");
$time_array[6] = array("10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00");

$now_hour = date("H:i",time());
//$now_hour = date("H:i",strtotime("13:13"));
?>

<div class="schedule">
	<div class="time">
		<div class="time_list" id="time_list">
			<ul class="bu4" id="time_list2">
<?php
	foreach($time_array[$day_type] as $k=>$v)
	{
		$time_type = "오전";
		$reservation_yn = "N";

		if($v >= "12:00") {
			$time_type = "오후";
		}
		
		$v_strtotime = strtotime($currdate.$v);
		$now_strtotime = strtotime($nowdate.$now_hour);
		
		if ($v_strtotime > $now_strtotime)
		{
			$reservation_yn = "Y";
		}
?>				
				<li class="time_cls {currtime:'<?php echo $time_type." ".$v?>',reservation_yn:'<?php echo $reservation_yn?>'}"><a href="javascript:void(0);"><?php echo $time_type." ".$v?> <?php echo $reservation_yn=="Y"?"(예약가능)":"(예약불가)"?></a></li>
<?php
	}
?>				
				<li>&nbsp;</li>
			</ul>
		</div>
	</div>
</div>
<div class="date_ok timedate">
	<span class="date_choice time_class"></span><span>을 선택하셨습니다.</span>
</div>