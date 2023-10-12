<script>
	import welcome_fallback from '$lib/images/svelte-welcome.png';
	import welcome from '$lib/images/svelte-welcome.webp';
	import Counter from './Counter.svelte';
	import List from './List.svelte';
	import { default as Header, default as Title } from './Title.svelte';
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section class="main">
	<Title />
	<List />
</section>

<style>
	.main {
		background-color: rgb(242, 243, 240);
	}
</style>
