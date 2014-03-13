<?php 

include 'dbconnect.php';

if ($_REQUEST) {

	$proposaltitle = $_REQUEST['name'];

	//Check for the Same PROPOSAL Registration
	$multiCheck = mysqli_query($coninfo,"SELECT * FROM Proposals WHERE title='" . $proposaltitle . "'");
	if (count(mysqli_fetch_assoc($multiCheck)) > 0) {
		mysqli_close($coninfo);
		header('Location: http://localhost/proposalgen/admin/index.php');
	}
	else {
		$query = "INSERT INTO Proposals (TITLE) VALUES ('".$proposaltitle."')";
		mysqli_query($coninfo, $query);
		header('Location: http://localhost/proposalgen/admin/index.php');
	}
}

?>