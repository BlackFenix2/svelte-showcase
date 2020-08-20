<script lang="ts">
  import { Header, Body, Footer } from 'src/layouts';
  export let segment: string;
</script>

<template>
  <Header {segment} />
  <Body>
    <slot />
  </Body>
  <Footer />
</template>
