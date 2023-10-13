<script lang="ts">
	import List from './List.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="main">
	<List />
</section>

<style>
	.main {
		background-color: rgb(242, 243, 240);
	}
</style>
