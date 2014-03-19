<?php 
if ($_REQUEST) {
$currentProposal = $_REQUEST['proptitle'];
setcookie("currentProposal",$currentProposal,0,'/');
header('Location: http://localhost/proposalgen/admin/single-proposal-editor.php');
exit;
}
?>