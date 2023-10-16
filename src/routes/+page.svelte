<script lang="ts">
	import List from '../components/List.svelte';
	import Title from '../components/Title.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="main">
	<Title movePath="/reservation" title="Reservation" />
	<List />
</section>

<style>
	.main {
		background-color: rgb(242, 243, 240);
	}
</style>
