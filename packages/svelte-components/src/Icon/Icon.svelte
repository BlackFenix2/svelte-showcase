<script lang="ts">
  let className: string;

  export { className as class };
</script>

<style lang="scss">
  i {
    font-size: 48px;
    font-style: normal;
  }
</style>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://use.fontawesome.com/releases/v5.14.0/css/all.css" />

</svelte:head>
<template>

  <i class={className} />

</template>
