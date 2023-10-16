<script lang="ts">
	import { handlePopUp } from '../store';
	import './styles.css';

	$: isPopUp = 'off';
	handlePopUp.subscribe((value) => {
		isPopUp = value ? 'on' : 'off';
	});
</script>

<div class="app">
	<main>
		<slot />
	</main>

	<footer>
		<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
	</footer>
	<div class="popUpBackground {isPopUp}" />
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		position: relative;
	}

	.popUpBackground {
		width: 100vw;
		height: 100vh;
		position: absolute;
		z-index: -1;
	}
	.popUpBackground.on {
		background-color: rgba(0, 0, 0, 0.3);
		backdrop-filter: blur(3px);
		z-index: 10;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;

		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
