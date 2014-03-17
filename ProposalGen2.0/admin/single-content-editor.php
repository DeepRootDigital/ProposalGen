<!doctype html>
<html>
<head>
	<title>Proposal Generator Admin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
	<script type="text/javascript">bkLib.onDomLoaded(nicEditors.allTextAreas);</script>
	<?php include '/actions/content/getContentData.php'; ?>
</head>
<body>
	<div class="container">
		<h1>Business on Market St. Proposal Generator</h1>
		<div class="parent">
			<div class="third left-align panel content-editor">
				<form action="http://localhost/proposalgen/admin/actions/content/updateContent.php" method="get">
					<input type="text" name="name" value="<?php echo Get_Title(); ?>">
					<textarea name="content"><?php echo Get_Content(); ?></textarea>
					<select name="assignment">
						<?php Get_Assignment(); ?>
					</select>
					<input type="submit" value="save">
				</form>
			</div>
			<div class="sidebar right-align panel">
				<h2>Add a New Proposal</h2>
				<form method="get" action="http://localhost/proposalgen/admin/actions/addProposal.php">
					<input type="text" name="name">
					<button>Add New Proposal</button>
				</form>
			</div>
		</div>
	</div>
</body>
</html>