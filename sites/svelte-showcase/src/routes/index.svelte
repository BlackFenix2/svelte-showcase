<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Container } from 'sveltestrap';
  import SEO from './_seo.svelte';
</script>

<style>
  h1 {
    margin: 0 0 0.5em 0;
    font-size: 2.8em;
    font-weight: 700;
    text-transform: uppercase;
  }

  figure {
    margin: 0 0 1em 0;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<SEO />

<template>
  <Container
    fluid
    class="d-flex flex-column justify-content-center align-items-center">
    <h1>Great success!</h1>

    <figure in:fade>
      <img alt="Success Kid" src="successkid.jpg" />
      <figcaption>Have fun with Sapper!</figcaption>
    </figure>

    <p>
      <strong>
        Try editing this file (src/routes/index.svelte) to test live reloading.
      </strong>
    </p>
  </Container>
</template>
