<script lang="ts">
	import addIcon from '$lib/images/icons/add.svg';
	import cancelIcon from '$lib/images/icons/close.svg';
	import backIcon from '$lib/images/icons/keyboard_backspace.svg';
	export let movePath: string;

	export let title: string;
</script>

<section class="titleContainer">
	<div class="btnContainer">
		<a class="addBtn" href={movePath}>
			{#if movePath === '/'}
				<img src={backIcon} alt="back-icon" />
			{:else}
				<img src={addIcon} alt="add-Icon" /> New Reservation
			{/if}
		</a>
	</div>

	<div class="title">
		<h1>{title}</h1>
	</div>

	<a class="cancelBtn" href="/"> <img src={cancelIcon} alt="" /></a>
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
