<script lang="ts">
	import '../app.css';

	import { onMount } from 'svelte';
	import { initClient } from '$lib/atproto';
	import LoginModal from '$lib/UI/LoginModal.svelte';

	let { children } = $props();

	onMount(() => {
		initClient();
	});
</script>

{@render children()}

<LoginModal />
