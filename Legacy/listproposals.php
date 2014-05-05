<?php

include '/actions/dbconnect.php';

$currentproposal = $_REQUEST['name'];

$querystring = "SELECT * FROM  proposals";
$query = mysqli_query($coninfo,$querystring);

while ($result = mysqli_fetch_assoc($query)) {

	if ($result['name'] === $currentproposal) {
		echo '<option value="'.$result['name'].'" selected>';
		echo $result['name'];
		echo '</option>';
	}
	else {
		echo '<option value="'.$result['name'].'">';
		echo $result['name'];
		echo '</option>';
	}

}

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_close($coninfo);
?>