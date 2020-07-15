<script lang="typescript">
  import { Router, Link, Route } from 'svelte-routing';
  import Home from './routes/Home.svelte';
  export let name: string;
  export let blueBackground = false;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    color: #ff3e00;
    text-transform: uppercase;
    font-size: 4em;
    font-weight: 100;
  }

  .blueBackground {
    background-color: blue;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="about">About</Link>
      <Link to="blog">Blog</Link>
    </nav>
    <div>

      <Route path="/">
        <Home test={222} />
      </Route>
    </div>
  </Router>
  <h1>Hello {name}!</h1>
  <p class:blueBackground>
    Visit the
    <a href="https://svelte.dev/tutorial">Svelte tutorial</a>
    to learn how to build Svelte apps.
  </p>
</main>
