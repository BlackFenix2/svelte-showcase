<script lang="ts">
  import { Button } from 'sveltestrap';

  import { cameoparisonStore } from 'src/state/cameoparison';

  const restart = () => {
    cameoparisonStore.reset();
  };
</script>

<template>
  <div
    class="d-flex flex-grow-1 flex-column align-items-center
    justify-content-center">
    <h2>
      Cheating Detected, you were caught cheating {$cameoparisonStore.cheatCount}
      time(s)
    </h2>
    <div>
      <img
        class="img-fluid"
        src="/images/caught-cheating-1.jpg"
        alt="caught cheating meme" />
    </div>
    <Button class="mt-2" color="primary" on:click={restart}>Play fair?</Button>
  </div>
</template>
