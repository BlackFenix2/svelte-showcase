<script lang="ts">
  import Nav from '../components/Nav.svelte';

  export let segment: string;
</script>

<template>
  <header>
    <Nav {segment} />
  </header>
</template>
