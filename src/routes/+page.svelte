<script lang="ts">
	import List from './List.svelte';

	import { handleMode } from '../store';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="main">
	{#if $handleMode}
		<p>new Reservation page</p>
	{:else}
		<List />
	{/if}
</section>

<style>
	.main {
		background-color: rgb(242, 243, 240);
	}
</style>
