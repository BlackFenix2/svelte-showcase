<script lang="ts">
  export let text: string = '';
</script>

<style>
  button {
    border: none;
    background-color: darkgray;
    color: white;
    padding: 8px 16px;
    border-radius: 5px;
  }
</style>

<template>
  <button>{text}</button>
</template>
