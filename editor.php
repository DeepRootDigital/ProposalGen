<div class="editor">
	<form method="get" action="<?php echo $_SERVER['SERVER_NAME']; ?>">
		<select id="name" name="name">
			<?php include '/actions/listproposals.php'; ?>
		</select>
		<button>Load</button>
	</form>
	<button id="save" onclick="event.preventDefault(); SavetoDB();">Save</button>
	<form id="new" method="GET" action="<?php echo $_SERVER['SERVER_NAME']; ?>/actions/newProposal.php">
		<input type="text" name="Newname">
		<button>Add New</button>
	</form>
</div>