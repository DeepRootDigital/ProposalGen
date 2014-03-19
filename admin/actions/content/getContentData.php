<?php 

function Get_Title() {
	include 'dbconnect.php';
	if(isset($_COOKIE['currentContent'])) {
		$currentContent = $_COOKIE['currentContent'];
		$query = mysqli_query($coninfo,"SELECT * FROM content WHERE TITLE='".$currentContent."'");
		while ($result = mysqli_fetch_assoc($query)) {
			return $result['TITLE'];
		}
	}
	else {
		return 'Add New Content';
	}
}

function Get_Content() {
	include 'dbconnect.php';
	if(isset($_COOKIE['currentContent'])) {
		$currentContent = $_COOKIE['currentContent'];
		$query = mysqli_query($coninfo,"SELECT * FROM content WHERE TITLE='".$currentContent."'");
		while ($result = mysqli_fetch_assoc($query)) {
			return $result['CONTENT'];
		}
	}
	else {
		return '';
	}
}

function Get_Assignment() {
	include 'dbconnect.php';
	if (isset($_COOKIE['currentContent'])) {
		$currentContent = $_COOKIE['currentContent'];
		$query = mysqli_query($coninfo,"SELECT * FROM Proposals");
		while ($result = mysqli_fetch_assoc($query)) {
			if ($result['TITLE'] == $currentContent) {
				echo '<option value="'.$result['TITLE'].'" selected>';
				echo $result['TITLE'];
				echo '</option>';
			}
			else {
				echo '<option value="'.$result['TITLE'].'">';
				echo $result['TITLE'];
				echo '</option>';
			}

		}
	}
	else {
		echo '<option value="Unassigned" selected>Unassigned</option>';
	}
}

?>