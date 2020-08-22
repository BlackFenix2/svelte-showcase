<style>
  main {
    display: flex;
    background-color: white;
  }

  aside {
    flex: 1;
    padding: 5px;
    border: solid black thin;
  }

  article {
    flex: 3;
    padding: 2em;
  }

  @media (max-width: 640px) {
    main {
      flex-direction: column;
    }
  }
</style>

<template>

  <main>
    <aside>placeholder</aside>
    <article>
      <slot />
    </article>
    <aside>placeholder</aside>
  </main>

</template>
