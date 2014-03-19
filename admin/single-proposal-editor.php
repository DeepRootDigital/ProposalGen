<!doctype html>
<html>
<head>
	<title>Proposal Generator Admin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
	<div class="container">
		<h1>Business on Market St. Proposal Generator</h1>
		<div class="parent">
			<div class="third left-align panel proposals">
				<table>
					<thead>
						<th>Content Title</th>
						<th>Delete</th>
					</thead>
					<tbody>
						<?php include 'actions/showAssignedContent.php'; ?>
					</tbody>
				</table>
			</div>
			<div class="sidebar right-align panel">
				<h2>Add a New Proposal</h2>
				<form method="get" action="http://localhost/proposalgen/admin/actions/proposal/addProposal.php">
					<input type="text" name="name">
					<button>Add New Proposal</button>
				</form>
			</div>
		</div>
	</div>
</body>
</html>