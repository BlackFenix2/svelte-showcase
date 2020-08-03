<script lang="typescript">
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Header, Body, Footer } from '../layout';
  import SEO from './_seo.svelte';
</script>

<style>
  /* utilize full width of the webpage, prevents dangling footers */
  :global(app) {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  :global(html, body) {
    width: 100%;
    height: 100%;
  }
</style>

<template>
  <Header />
  <Body>
    <slot />
  </Body>
  <Footer />
</template>
