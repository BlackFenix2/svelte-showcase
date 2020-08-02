<script lang="ts">
  import { Button, Container } from 'sveltestrap';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();
  const categories = [
    { slug: 'actors', label: 'Actors' },
    { slug: 'athletes', label: 'Athletes' },
    { slug: 'comedians', label: 'Comedians' },
    { slug: 'creators', label: 'Creators' },
    { slug: 'models ', label: 'Models' },
    { slug: 'musicians', label: 'Musicians' },
    { slug: 'reality-tv', label: 'Reality TV' },
  ];

  let selected = false;

  const select = (category) => {
    selected = true;
    dispatch('select', { category });
  };
</script>

<style>
  a {
    color: #7fdbff;
  }
  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: min(12vw, 4em);
    font-weight: 100;
    margin: 0 0 0.5em 0;
  }
  p {
    max-width: 24em;
    margin: 0 auto 1em auto;
    text-align: center;
  }

  .logo {
    display: inline-block;
    background: url(/icons/compare.svg) 50% 50% no-repeat;
    background-size: 100% 100%;
    width: 0.8em;
    top: 0.05em;
    transform: scale(1.4);
    left: 0.02em;
    text-indent: -9999px;
    margin: -20px;
  }
  .categories {
    width: 100%;
    max-width: 26em;
    text-align: center;
  }

  @media (max-width: 640px) {
    .categories {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>

<template>
  <Container
    class="d-flex flex-grow-1 flex-column align-items-center
    justify-content-center">
    <h1 class="text-center">
      Cameop
      <span class="logo">a</span>
      rison
    </h1>

    <p>
      On
      <a href="https://cameo.com" target="_blank">cameo.com</a>
      , you can buy personalised video clips from everyone from Lindsay Lohan to
      Ice T.
    </p>

    <p>But who commands the highest price?</p>

    <p>pick a category to play the game:</p>

    <div class="categories">
      {#each categories as category}
        <Button
          class="m-1"
          disabled={selected}
          color="primary"
          on:click={() => select(category)}>
          {category.label}
        </Button>
      {/each}
    </div>

    <p>Inspired by https://cameoparison.netlify.app/</p>
  </Container>
</template>
