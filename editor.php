<div class="editor">
	<form method="get" action="http://localhost/proposalgen/">
		<select id="name" name="name">
			<?php include '/actions/listproposals.php'; ?>
		</select>
		<button>Load</button>
	</form>
	<button id="save" onclick="event.preventDefault(); SavetoDB();">Save</button>
	<form id="new" method="GET" action="http://localhost/proposalgen/actions/newProposal.php">
		<input type="text" name="Newname">
		<button>Add New</button>
	</form>
</div>