<?php 

include '../dbconnect.php';

if ($_REQUEST) {

	$contenttitle = $_REQUEST['name'];

	$query = "DELETE from content WHERE TITLE='".$contenttitle."'";
	mysqli_query($coninfo, $query);
	mysqli_close($coninfo);
	header('Location: http://localhost/proposalgen/admin/index.php');
}

?>