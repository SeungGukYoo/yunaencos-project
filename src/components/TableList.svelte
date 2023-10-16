<script lang="ts">
	const allTable = Array.from({ length: 8 }, (_, idx) => `${idx + 1} Table`);
	export let addTable: (addTableNumber: number) => void;
</script>

<ul class="tableListContainer">
	{#each allTable as table, idx}
		<li on:click={() => addTable(idx)}>{table}</li>
	{/each}
</ul>

<style>
	.tableListContainer {
		position: absolute;

		top: 33px;
		left: 0px;
		width: 100%;
		list-style: none;
		text-align: center;
		background-color: #eee;
		border-left: 1px solid black;
		border-right: 1px solid black;
	}

	.tableListContainer li {
		padding: 12px;
		border-bottom: 1px solid black;
		cursor: pointer;
	}
	.tableListContainer li:hover {
		background-color: #a1a1a1;
	}
	.tableListContainer li:last-child {
		margin-bottom: 0;
		padding: 12px;
		border-bottom: 1px solid black;
	}
</style>
