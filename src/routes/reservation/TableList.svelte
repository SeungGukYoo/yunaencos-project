<script lang="ts">
	import { handleReservationInfo } from '../../store';

	const allTable = Array.from({ length: 8 }, (_, idx) => `${idx + 1} Table`);
	let reservedTable: number[] = [];
	function addTalbe(idx: number) {
		if (reservedTable.includes(idx)) {
			alert('aleady reserved table');
			return;
		}
		handleReservationInfo.update((prev) => {
			prev.reservedTable = [...prev.reservedTable, idx + 1];
			return prev;
		});
		reservedTable.push(idx);
	}
</script>

<ul class="tableListContainer">
	{#each allTable as table, idx}
		<li on:click={() => addTalbe(idx)}>{table}</li>
	{/each}
</ul>

<style>
	.tableListContainer {
		position: absolute;
		top: 21px;
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
