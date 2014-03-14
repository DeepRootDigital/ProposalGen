<?php 

if (isset($_COOKIE['currentProposal'])) {
$currentproposal = $_COOKIE['currentProposal'];
}
else {
	echo 'ERROR';
	$currentproposal = 'admin';
}
include 'dbconnect.php';

$query = mysqli_query($coninfo,"SELECT * FROM content WHERE ASSIGNMENT='".$currentproposal."'");

while ($result = mysqli_fetch_assoc($query)) {
	echo '<tr>';
	echo '<td>';
	echo $result['TITLE'];
	echo '</td>';
	echo '<td>';
	echo '<form method="get" action="http://localhost/proposalgen/admin/actions/delProposal.php">';
	echo '<input type="hidden" name="name" value="'.$result['TITLE'].'" />';
	echo '<button>Delete</button>';
	echo '</form>';
	print_r($_COOKIE);
	echo '</td>';
	echo '</tr>';
}

?>