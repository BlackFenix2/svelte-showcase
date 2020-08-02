<script lang="ts">
  export let title: string = 'Svelte Showcase';
  export let description: string = "Ernie's web app trying out Svelte";
  export let imgSrc: string;
</script>

<svelte:head>
  <meta name="description" content={description} />
  <meta property="og:type" content="website" />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />

  {#if imgSrc}
    <meta property="og:image" content={imgSrc} />
  {/if}

  <title>Cameoparison</title>
</svelte:head>
