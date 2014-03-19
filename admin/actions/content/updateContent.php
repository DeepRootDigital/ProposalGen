<?php 

include 'dbconnect.php';

if ($_REQUEST) {
	$contenttitle = $_COOKIE['currentContent'];
	$newcontenttitle = $_REQUEST['name'];
	$content = $_REQUEST['content'];
	$assignment = $_REQUEST['assignment'];

		$query = "UPDATE content SET TITLE='".$newcontenttitle."', CONTENT='".$content."', ASSIGNMENT='".$assignment."' WHERE TITLE='".$contenttitle."'";
		mysqli_query($coninfo, $query);
		setcookie("currentContent",$newcontenttitle,0,'/');
		header('Location: http://localhost/proposalgen/admin/single-content-editor.php');

}

?>