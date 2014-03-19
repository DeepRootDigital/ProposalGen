<?php 

include '../dbconnect.php';

if ($_REQUEST) {

	$proposaltitle = $_REQUEST['name'];

	$query = "DELETE from Proposals WHERE TITLE='".$proposaltitle."'";
	mysqli_query($coninfo, $query);
	mysqli_close($coninfo);
	header('Location: http://localhost/proposalgen/admin/index.php');
}

?>