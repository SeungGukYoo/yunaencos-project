<script lang="ts">
	import addIcon from '$lib/images/icons/add.svg';
	import cancelIcon from '$lib/images/icons/close.svg';
	import { handleMode } from '../store';

	function handleReservedPage() {
		handleMode.update((prev) => !prev);
	}
</script>

<section class="titleContainer">
	<a class="addBtn" href="/reservation" on:click={handleReservedPage}>
		<img src={addIcon} alt="add-Icon" /> New Reservation
	</a>

	<div class="title">
		{#if $handleMode}
			<h1>New Reservation</h1>
		{:else}
			<h1>Reservation</h1>
		{/if}
	</div>

	<a class="cancelBtn" href="/" on:click={handleReservedPage}> <img src={cancelIcon} alt="" /></a>
</section>

<style>
	.titleContainer {
		background-color: rgb(255, 255, 255);
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.addBtn {
		margin-left: 10px;
		flex-grow: 0;
		background-color: rgb(251, 251, 251);
		color: rgb(228, 62, 25);
		font-size: 18px;
		outline: none;
		border: none;
		border-radius: 8px;
		padding: 18px 22px;
		display: flex;
		align-items: center;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
		cursor: pointer;
	}
	.addBtn a {
		display: flex;
		align-items: center;
	}

	.cancelBtn {
		flex-grow: 0;
		border: none;
		background-color: transparent;
		margin-right: 12px;
	}

	.title {
		flex-grow: 2;

		margin: 0;
	}
</style>
