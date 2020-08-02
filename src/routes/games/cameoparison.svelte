<script lang="ts">
  import Welcome from 'src/pages/Welcome.svelte';
  import Game from 'src/pages/Game.svelte';
  import { onMount } from 'svelte';
  import { select } from 'src/services/cameoparisonService';
  import { Container, Button } from 'sveltestrap';
  import { loadImage } from 'src/utils';

  import { cameoparisonStore } from 'src/state/cameoparison';
  import CaughtCheating from 'src/pages/CaughtCheating.svelte';
  let celebsPromise;
  let selection;

  const restart = () => {
    cameoparisonStore.reset();
  };
  const start = async (e) => {
    const { celebs, lookup } = await celebsPromise;

    selection = select(celebs, lookup, e.detail.category.slug);

    cameoparisonStore.startGame();
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
  <meta property="og:title" content="Cameoparison" />
  <meta property="og:image" content="/images/capture.png" />
  <meta property="og:description" content="The Cameo comparison game" />
  <title>Cameoparison</title>
</svelte:head>
<template>

  <Container fluid class="bg-dark text-white flex-grow-1 d-flex flex-column">
    {#if $cameoparisonStore.gameStarted && !$cameoparisonStore.cheatingDetected}
      <Game {selection} />
    {:else if $cameoparisonStore.cheatingDetected}
      <CaughtCheating />
    {:else}
      <Welcome on:select={start} />
    {/if}

  </Container>
</template>
