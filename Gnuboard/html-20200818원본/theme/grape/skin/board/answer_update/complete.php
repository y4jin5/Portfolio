<?php
$g4_path = "../../..";
include_once("$g4_path/common.php");

$sql = " update $write_table
                  set wr_8 = '2'
                  where wr_id = '$wr_id' ";
sql_query($sql);
echo"
    <script type='text/javascript'>
    //parent.opener.location.href = '$g4[bbs_path]/board.php?bo_table=$bo_table&wr_id=$wr_id';
    parent.opener.location.reload();
    window.close();
    </script>
    ";
?>