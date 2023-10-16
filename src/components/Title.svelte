<script lang="ts">
	import addIcon from '$lib/images/icons/add.svg';
	import cancelIcon from '$lib/images/icons/close.svg';
	import backIcon from '$lib/images/icons/keyboard_backspace.svg';

	import { handleMode } from '../store';
	let currentPath: string;

	function handleReservedPage(path: string) {
		if (path === window.location.pathname) return;
		handleMode.update((prev) => (prev = path));
		currentPath = path;
	}

	handleMode.subscribe((value) => {
		if (!value) return;
		currentPath = value;
	});
</script>

<section class="titleContainer">
	<div class="btnContainer">
		{#if currentPath === '/reservation'}
			<a class="addBtn" href="/" on:click={() => handleReservedPage('/')}>
				<img src={backIcon} alt="back-icon" />
			</a>
		{:else}
			<a class="addBtn" href="/reservation" on:click={() => handleReservedPage('/reservation')}>
				<img src={addIcon} alt="add-Icon" /> New Reservation
			</a>
		{/if}
	</div>

	<div class="title">
		{#if currentPath === '/reservation'}
			<h1>New Reservation</h1>
		{:else}
			<h1>Reservation</h1>
		{/if}
	</div>

	<a class="cancelBtn" href="/" on:click={() => handleReservedPage('/')}>
		<img src={cancelIcon} alt="" /></a
	>
</section>

<style>
	.titleContainer {
		background-color: rgb(255, 255, 255);
		position: relative;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
	}

	.btnContainer {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.addBtn {
		border: none;
		border-radius: 8px;
		background-color: rgb(251, 251, 251);
		font-size: 18px;
		color: rgb(228, 62, 25);
		outline: none;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 18px 22px;
		box-shadow: 1px 1px 3px 1px rgba(66, 66, 66, 0.35);
		cursor: pointer;
	}

	.cancelBtn {
		border: none;
		background-color: transparent;
		margin-right: 12px;
		grid-column: 5;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.title {
		margin: 0;
		grid-column: 3;
	}
</style>
