<?php

/* Configuration Settings */
$dbHOST = 'localhost';
$dbUSER = 'nick';
$dbPASS = '10201991';
$dbNAME = 'proposalgen';

//Perfom Actual Connection

$coninfo=mysqli_connect($dbHOST,$dbUSER,$dbPASS,$dbNAME);

// Check connection
if (mysqli_connect_errno())
{
	echo "Failed to connect to MySQL: " . mysqli_connect_error();
}

?>