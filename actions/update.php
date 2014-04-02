<?php

include 'dbconnect.php'; 

$name = $_REQUEST['name'];

$content = $_REQUEST['content'];

$content = str_replace(array("\r\n", "\r", "\n"), "", $content);

$content = htmlspecialchars($content, ENT_QUOTES);

$querystring = "UPDATE proposals SET Content='".$content."' WHERE Name='q2f'";

mysqli_query($coninfo,$querystring);

if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

mysqli_close($coninfo);

echo htmlspecialchars_decode($content);

?>