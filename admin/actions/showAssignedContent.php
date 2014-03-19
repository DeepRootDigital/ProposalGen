<?php 

if (isset($_COOKIE['currentProposal'])) {
$currentproposal = $_COOKIE['currentProposal'];
}
else {
	echo 'ERROR';
}
include 'dbconnect.php';

$query = mysqli_query($coninfo,"SELECT * FROM content WHERE ASSIGNMENT='".$currentproposal."'");

while ($result = mysqli_fetch_assoc($query)) {
	echo '<tr>';
	echo '<td>';
	echo '<form action="http://localhost/proposalgen/admin/actions/content/selectContent.php" method="get">';
	echo '<button name="contenttitle" value="'.$result['TITLE'].'">';
	echo $result['TITLE'];
	echo '</button>';
	echo '</td>';
	echo '<td>';
	echo '<form method="get" action="http://localhost/proposalgen/admin/actions/content/delContent.php">';
	echo '<input type="hidden" name="name" value="'.$result['TITLE'].'" />';
	echo '<button>Delete</button>';
	echo '</form>';
	echo '</td>';
	echo '</tr>';
}

?>