<script lang="ts">
  import { Button, Container } from "sveltestrap";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();
  const categories = [
      { slug: "actors", label: "Actors" },
      { slug: "athletes", label: "Athletes" },
      { slug: "comedians", label: "Comedians" },
      { slug: "creators", label: "Creators" },
      { slug: "models ", label: "Models" },
      { slug: "musicians", label: "Musicians" },
      { slug: "reality-tv", label: "Reality TV" },
  ];

  let selected = false;

  const select = category => {

      selected = true;
      dispatch( "select", { category } );

  };
</script>

<style>
  a {
    color: #7fdbff;
  }
  h1 {
    margin: 0 0 0.5em 0;
    color: #ff3e00;
    font-size: min(12vw, 4em);
    font-weight: 100;
    text-transform: uppercase;
  }
  p {
    max-width: 24em;
    margin: 0 auto 1em auto;
    text-align: center;
  }

  .logo {
    top: 0.05em;
    left: 0.02em;
    display: inline-block;
    width: 0.8em;
    margin: -20px;
    background: url(/icons/compare.svg) 50% 50% no-repeat;
    background-size: 100% 100%;
    text-indent: -9999px;
    transform: scale(1.4);
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
  <div class="contain">
    <Container
      class="d-flex flex-column align-items-center justify-content-center pt-5">
      <h1 class="text-center">
        Cameop
        <span class="logo">a</span>
        rison
      </h1>

      <p>
        On
        <a href="https://cameo.com" target="_blank">cameo.com</a>
        , you can buy personalised video clips from everyone from Lindsay Lohan
        to Ice T.
      </p>

      <p>But who commands the highest price?</p>

      <p>pick a category to play the game:</p>

      <div class="categories">
        {#each categories as category}
          <Button
            class="m-1"
            disabled={selected}
            color="primary"
            on:click={() => select( category )}>
            {category.label}
          </Button>
        {/each}
      </div>

      <p>
        Created from the frontendmasters workshop by
        <a
          href="https://github.com/Rich-Harris/cameoparison-starter"
          target="_blank">
          https://github.com/Rich-Harris/cameoparison-starter
        </a>
      </p>
    </Container>
  </div>
</template>
