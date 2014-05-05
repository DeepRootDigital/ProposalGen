<?php

include 'dbconnect.php';

$currentproposal = $_REQUEST['name'];

$querystring = "SELECT * FROM  proposals";
$query = mysqli_query($coninfo,$querystring);

//Default Case

echo '<option>';
echo '</option>';

while ($result = mysqli_fetch_assoc($query)) {

	if ($result['Name'] === $currentproposal) {
		echo '<option value="'.$result['Name'].'" selected="selected">';
		echo $result['Name'];
		echo '</option>';
	}
	else {
		echo '<option value="'.$result['Name'].'">';
		echo $result['Name'];
		echo '</option>';
	}

}

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_close($coninfo);
?>