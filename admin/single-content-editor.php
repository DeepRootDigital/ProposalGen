<!doctype html>
<html>
<head>
	<title>Proposal Generator Admin</title>
	<link rel="stylesheet" type="text/css" href="style.css">
	<?php include '/actions/content/getContentData.php'; ?>
	<script src="http://js.nicedit.com/nicEdit-latest.js" type="text/javascript"></script>
	<script type="text/javascript">
	var area1;

	function toggleArea1() {
		if(!area1) {
			area1 = new nicEditor({fullPanel : true}).panelInstance('myArea1',{hasPanel : true});
		} else {
			area1.removeInstance('myArea1');
			area1 = null;
		}
	}
	bkLib.onDomLoaded(function() { toggleArea1(); });
	</script>
</head>
<body>
	<div class="container">
		<h1>Business on Market St. Proposal Generator</h1>
		<div class="parent">
			<div class="third left-align panel content-editor">
				<form action="http://localhost/proposalgen/admin/actions/content/updateContent.php" method="get">
					<input type="text" name="name" value="<?php echo Get_Title(); ?>">
					<hr/>
					<textarea id="myArea1" name="content"><?php echo Get_Content(); ?></textarea>
					<button onclick="event.preventDefault(); toggleArea1();">Toggle Editor Mode</button>
					<hr/>
					<select name="assignment">
						<?php Get_Assignment(); ?>
					</select>
					<input type="submit" value="save">
				</form>
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