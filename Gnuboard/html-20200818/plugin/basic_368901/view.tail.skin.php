<?

$bpard_scrap="g5_write_".$board['bo_1_subj'];
       
	   $sql="SELECT * FROM `".$bpard_scrap."` where wr_9=".$wr_id." and wr_10='".$bo_table."'";

       $row_chl=sql_fetch($sql);

		//if(!$row_chl[wr_9]){
					$wr_num = get_next_num($bpard_scrap);

					$wr_reply = '';
					$wr_subject=$member['mb_id'].'-'.$board['bo_subject'].'게시판---'.$wr_id."--".$bo_table;
					$wr_content=$member['mb_id'].'-'.$board['bo_subject'].'게시판';
				$sql = " insert into $bpard_scrap
							set wr_num = '$wr_num',
								 wr_reply = '$wr_reply',
								 wr_comment = 0,
								 ca_name = '$ca_name',
								 wr_option = '$html,$secret,$mail',
								 wr_subject = '$wr_subject',
								 wr_content = '$wr_content',
								 wr_seo_title = '$wr_seo_title',
								 wr_link1 = '$wr_link1',
								 wr_link2 = '$wr_link2',
								 wr_link1_hit = 0,
								 wr_link2_hit = 0,
								 wr_hit = 0,
								 wr_good = 0,
								 wr_nogood = 0,
								 mb_id = '{$member['mb_id']}',
								 wr_password = '$wr_password',
								 wr_name = '$wr_name',
								 wr_email = '$wr_email',
								 wr_homepage = '$wr_homepage',
								 wr_datetime = '".G5_TIME_YMDHIS."',
								 wr_last = '".G5_TIME_YMDHIS."',
								 wr_ip = '{$_SERVER['REMOTE_ADDR']}',
								 wr_1 = '$wr_1',
								 wr_2 = '$wr_2',
								 wr_3 = '$wr_3',
								 wr_4 = '$wr_4',
								 wr_5 = '$wr_5',
								 wr_6 = '$wr_6',
								 wr_7 = '$wr_7',
								 wr_8 = '$wr_8',
								 wr_9 = '$wr_id',
								 wr_10 = '$bo_table' ";

			  sql_query($sql);

			   $wr_id = sql_insert_id();
			   
				   // 부모 아이디에 UPDATE
					  sql_query(" update $bpard_scrap set wr_parent = '$wr_id' where wr_id = '$wr_id' ");
				   
				   // 게시글 1 증가
					  sql_query("update {$g5['board_table']} set bo_count_write = bo_count_write + 1 where bo_table = '{$board[bo_1_subj]}'");

				   // 새글 INSERT
					  sql_query(" insert into {$g5['board_new_table']} ( bo_table, wr_id, wr_parent, bn_datetime, mb_id ) values ( '{$board[bo_1_subj]}', '{$wr_id}', '{$wr_id}', '".G5_TIME_YMDHIS."', '{$member['mb_id']}' ) ");

		//	}
?>