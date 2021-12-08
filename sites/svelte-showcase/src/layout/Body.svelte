<script lang="ts">
</script>

<style>
  main {
    /* allows child container to utilize the full width of this element */
    display: flex;

    /* grows body to full width of parent */
    flex: 1;
    flex-direction: column;
  }
</style>

<main>
  <slot />
</main>
