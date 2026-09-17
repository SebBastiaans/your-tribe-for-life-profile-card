<script>
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>Visitekaartje van Seb</title>
	<link rel="icon" href={favicon} />
</svelte:head>


<h1>Scroll horizontaal of pak en sleep de kaart vast</h1>

<main>
{@render children()}
</main>

<style>
main{
  display: grid;
  perspective: 50rem;
  transform-style: preserve-3d;
  position: fixed;
  left: 50%;
  transform: translateX(-50%) rotate(var(--swing, 0deg));
  transform-origin: top center;
  height: 600px;
  cursor: grab;

  &:not(:global(.dragging)){
    transition: transform .6s cubic-bezier(.34, 1.56, .64, 1);
  }

  &:global(.dragging){
    cursor: grabbing;
  }
}

main:not(:global(.dragging)) :global(.lanyard-cord){
  transition: rotate .6s cubic-bezier(.34, 1.56, .64, 1);
}

h1{
transform: translateX(-50%);
left: 50%;
position: fixed;
bottom: 2rem;
width: min(90vw, max-content);
text-align: center;
font-family: roboto;
font-size: clamp(0.9rem, 4vw, 1.5rem);
}
</style>