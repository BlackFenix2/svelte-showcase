<script lang="ts">
  import { Header, Body, Footer } from '../layout';

</script>

<style>
  /* utilize full width of the webpage, prevents dangling footers */
  :global(html, body) {
    width: 100%;
    height: 100%;
  }

  /* gives parent div flex */
  :global(#svelte) {
    display: flex;
    min-height: 100%;
    flex-direction: column;
  }

</style>

<template>
  <Header />
  <Body>
    <slot />
  </Body>
  <Footer />
</template>
