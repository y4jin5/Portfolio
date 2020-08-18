<?php
error_reporting( E_CORE_ERROR | E_CORE_WARNING | E_COMPILE_ERROR | E_ERROR | E_WARNING | E_PARSE | E_USER_ERROR | E_USER_WARNING );


$board_skin_path = $_SERVER["DOCUMENT_ROOT"]."/skin/board/reserve_calendar";

include_once("$board_skin_path/moonday.php"); // 석봉운님의 음력날짜 함수


$bo_table = $_GET["bo_table"];

$col_height= 80 ;//내용 들어갈 사각공간의 세로길이를 가로 폭과 같도록
$today = getdate(); 

$today_ymd = date("Ymd",time());

$b_mon = $today['mon']; 
$b_day = $today['mday']; 
$b_year = $today['year']; 

$year = $_GET["year"];
$month = $_GET["month"];

if ($year < 1) { // 오늘의 달력 일때
  $month = $b_mon;
  $mday = $b_day;
  $year = $b_year;
}

if(!$year) 	$year = date("Y");

$file_index = $board_skin_path."/day"; ### 기념일 폴더 위치 지정

### 양력 기념일 파일 지정 : 해당년도 파일이 없으면 기본파일(solar.txt)을 불러온다
if(file_exists($file_index."/".$year.".txt")) {
	$dayfile = file($file_index."/".$year.".txt");
} else { 
	$dayfile = file($file_index."/solar.txt");
}

$lastday=array(0,31,28,31,30,31,30,31,31,30,31,30,31);
if ($year%4 == 0) $lastday[2] = 29;
$dayoftheweek = date("w", mktime (0,0,0,$month,1,$year));	
?>


<div class="schedule">
				<div class="tit_month">
					<span class="btn_before"> 
						<!-- <a href="<?php echo $_SERVER["PHP_SELF"]."?bo_table=".$bo_table."&"; ?><?php if ($month == 1) { $year_pre=$year-1; $month_pre=12; } else {$year_pre=$year; $month_pre=$month-1;} echo ("year=$year_pre&month=$month_pre");?>">왼쪽</a> -->
						<a href="javascript:void(0);" onclick="<?php if ($month == 1) { $year_pre=$year-1; $month_pre=12; } else {$year_pre=$year; $month_pre=$month-1;} ?>javascript:getCal('<?php echo $year_pre?>','<?php echo $month_pre?>');">왼쪽</a>
					</span>
					<span class="year_text">
						<!-- <a href="<?php echo $_SERVER["PHP_SELF"]."?bo_table=".$bo_table; ?>" title="오늘로"><?php echo "$year. &nbsp;".sprintf("%02d",$month); ?></a> -->
						<a href="javascript:void(0);" title="오늘로" onclick="javascript:getCal('<?php echo date("Y",time())?>','<?php echo date("n",time())?>');"><?php echo "$year. &nbsp;".sprintf("%02d",$month); ?></a>
					</span>
					<span class="btn_next">
						<!-- <a href="<?php echo $_SERVER["PHP_SELF"]."?bo_table=".$bo_table."&"; ?><?php if ($month == 12) { $year_pre=$year+1; $month_pre=1; } else {$year_pre=$year; $month_pre=$month+1;} echo ("year=$year_pre&month=$month_pre");?>">오른쪽</a> -->
						<a href="javascript:void(0);" onclick="<?php if ($month == 12) { $year_pre=$year+1; $month_pre=1; } else {$year_pre=$year; $month_pre=$month+1;} ?>javascript:getCal('<?php echo $year_pre?>','<?php echo $month_pre?>');">오른쪽</a>
					</span>
				</div>
				<table class="sche_table" border="0" summary="예약">
					<thead>
						<tr>
							<th scope="col">일</th>
							<th scope="col">월</th>
							<th scope="col">화</th>
							<th scope="col">수</th>
							<th scope="col">목</th>
							<th scope="col">금</th>
							<th scope="col" class="last">토</th>
						</tr>
					</thead>
					<tbody>
<?php
	// 달력의 틀을 보여주는 부분
	$cday = 1;
	$temp = 7 - (($lastday[$month]+$dayoftheweek)%7);

	if ($temp == 7) $temp = 0;
	 $lastcount = $lastday[$month]+$dayoftheweek + $temp;

	for ($iz = 1; $iz <= $lastcount; $iz++) 
	{
		$bgcolor = "#ffffff";  // 쭉 흰색으로 칠하고

		if ($b_year==$year && $b_mon==$month && $b_day==$cday) {
			$bgcolor = "#DEFADE";      //  "#DFFDDF"; // 오늘날짜 연두색으로 표기
		}

		if (($iz%7) == 1) {
			echo ("<tr>"); // 주당 7개씩 한쎌씩을 쌓는다.
		}

		if ($dayoftheweek < $iz  &&  $iz <= $lastday[$month]+$dayoftheweek)	{
			
			// 전체 루프안에서 숫자가 들어가는 셀들만 해당됨
			// 즉 11월 달에서 1일부터 30 일까지만 해당
			
			$daytext = "$cday";   // $cday 는 숫자 예> 11월달은 1~ 30일 까지
			$yes_cls = "yes";

			//$daytext 은 셀에 써질 날짜 숫자 넣을 공간
			$daycontcolor = "" ; 
			$daycolor = ""; 
			
			$td_last = "";
			if ($iz%7 == 1) {
				$daycolor = "red"; // 일요일
			}

			if ($iz%7 == 0) {
				$daycolor = "blue"; // 토요일
				$td_last = "last";
			}

			$f_date = $year.sprintf("%02d",$month).sprintf("%02d",$cday);

			// 기념일 파일 내용 비교위한 변수 선언, 월과 일을 두자리 포맷으로 고정
			if (strlen($month) == 1) { 
				$monthp = "0".$month ;
			} else {
				$monthp = $month ; 
			}

			if (strlen($cday) == 1) {
				$cdayp = "0".$cday ;
			}
			else { 
				$cdayp = $cday ; 
			}

			$memday = $year.$monthp.$cdayp;
			$daycont = "" ;

			// 기념일(양력) 표시
			for($i=0 ; $i < sizeof($dayfile) ; $i++) {  // 파일 첫 행부터 끝행까지 루프
				$arrDay = explode("|", $dayfile[$i]);
				if($memday == $year.$arrDay[0]) {
					$daycont = $arrDay[1]; 
					$daycontcolor = $arrDay[2];
					if(substr($arrDay[2],0,3)=="red") $daycolor = "red"; // 공휴일은 날짜를 빨간색으로 표시
				}
			}

			// 석봉운님의 음력날짜 변수선언
			$myarray = soltolun($year,$month,$cday);
		
			// 음력 절기 파일, 기념일 추가시 else if 구문 복사해서 사용하세요. 한자리 날짜는 한자리로 써야 합니다. 
			if ( $myarray["month"].'/'.$myarray["day"]=="12/30" ) { // 설연휴
				$daycolor="red" ;
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="1/1" ) { // 설날
				$daycolor="red" ;
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="1/2" ) { // 설연휴
				$daycolor="red" ;
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="4/8" ) { // 석가탄신일
				$daycolor="red"; 
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="8/14" ) { // 추석연휴
				$daycolor="red" ;
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="8/15" ) { // 추석
				$daycolor="red" ;
			}
			else if ( $myarray["month"].'/'.$myarray["day"]=="8/16" ) { // 추석연휴
				$daycolor="red" ;
			}
			else { 
				$annivmoonday="" ;
			}

			if ($annivmoonday&&$daycont) {
//				$blank="<br />"; // 음력절기와 양력기념일이 동시에 있으면 한칸 띔
			}
			else {
				$blank="";
			}

			if($daycolor == "red") {
				$yes_cls = "red";
			}
		
			if($today_ymd > $f_date) {
				$yes_cls = "";
			}


			// 여기까지 숫자와 들어갈 내용에 대한 변수들의 세팅이 끝나고 
			// 이제 여기 부터 직접 셀이 그려지면서 그 안에 내용이 들어 간다.
			echo "<td class='$td_last $yes_cls {curr_date:\"$f_date\"}'>";

			echo "$daytext $moonday";

			echo $html_day[$cday];
			echo ("</td>");  // 한칸을 마무리

			$cday++; // 날짜를 카운팅
		}

		// 유효날짜가 아니면 그냥 회색을 칠한다.
		else {
			echo ("     <td>&nbsp;</td>"); 
		}

		if (($iz%7) == 0) {
			echo ("  </tr>");
		}
	}
?>
					</tbody>
				</table>
				<div class="date_ok yeardate">
					<span class="date_choice year_class"></span><span>을 선택하셨습니다.</span>
				</div>
			</div>