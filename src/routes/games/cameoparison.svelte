<script lang="ts">
  import Welcome from 'src/pages/Welcome.svelte';
  import Game from 'src/pages/Game.svelte';
  import { onMount } from 'svelte';
  import { select } from 'src/services/cameoparisonService';
  import { Container } from 'sveltestrap';
  import { loadImage } from 'src/utils';

  let celebsPromise;
  let selection;
  let gameStarted = false;

  const restart = () => {
    gameStarted = false;
  };
  const start = async (e) => {
    const { celebs, lookup } = await celebsPromise;

    selection = select(celebs, lookup, e.detail.category.slug);

    gameStarted = true;
  };

  const loadCelebs = async () => {
    const res = await fetch('https://cameo-explorer.netlify.app/celebs.json');
    const data = await res.json();

    const lookup = new Map();

    data.forEach((celeb) => {
      lookup.set(celeb.id, celeb);
    });

    const subset = new Set();

    data.forEach((celeb) => {
      if (celeb.reviews >= 50) {
        subset.add(celeb);
        celeb.similar.forEach((id) => {
          subset.add(lookup.get(id));
        });
      }
      lookup.set(celeb.id, celeb);
    });

    return {
      celebs: Array.from(subset),
      lookup,
    };
  };

  onMount(() => {
    celebsPromise = loadCelebs();
    loadImage('/icons/right.svg');
    loadImage('/icons/wrong.svg');
  });
</script>

<style>

</style>

<svelte:head>
  <meta name="description" content="The Cameo comparison game" />
  <title>Cameoparison</title>
</svelte:head>
<template>

  <Container
    fluid
    class="bg-dark text-white flex-grow-1 d-flex align-items-center h-100">
    {#if gameStarted}
      <Game {selection} on:restart={restart} />
    {:else}
      <Welcome on:select={start} />
    {/if}

  </Container>
</template>
