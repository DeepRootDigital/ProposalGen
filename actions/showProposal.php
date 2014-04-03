<?php

include 'dbconnect.php'; 

//INSTANSIATION DATA
if (isset($_REQUEST['name'])) {
	$name = $_REQUEST['name'];
}
else {
	header('Location: http://localhost/proposalgen/blank.php');
	exit;
}

$querystring = "SELECT * FROM proposals WHERE Name='".$name."'";
$query = mysqli_query($coninfo,$querystring);

while ($result = mysqli_fetch_assoc($query)) {
	//DECODE THE HTML
	echo htmlspecialchars_decode($result['Content']);
}

//ERROR HANDLER
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}
//CLOSE CONNECTION
mysqli_close($coninfo);

?>