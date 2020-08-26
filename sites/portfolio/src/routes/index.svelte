<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  figcaption {
    text-align: center;
  }

  h1 {
    margin: 0 0 0.5em 0;
    font-size: 2.8em;
    font-weight: 700;
    text-transform: uppercase;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 0 0 1em 0;
  }

  p {
    margin: 1em 0;
  }

  @media (min-width: 480px) {
    h1 {
      font-size: 4em;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<template>
  <section>
    <h1>Great success!</h1>

    <figure>
      <img alt="Success Kid" src="successkid.jpg" />
      <figcaption>Have fun with Sapper!</figcaption>
    </figure>

    <p>
      <strong>
        Try editing this file (src/routes/index.svelte) to test live reloading.
      </strong>
    </p>
  </section>
</template>
