<?php 
if ($_REQUEST) {
$currentContent = $_REQUEST['contenttitle'];
setcookie("currentContent",$currentContent,0,'/');
header('Location: http://localhost/proposalgen/admin/single-content-editor.php');
exit;
}
?>