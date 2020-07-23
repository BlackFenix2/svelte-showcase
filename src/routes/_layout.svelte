<script lang="typescript">
  import { Header, Body, Footer } from '../layout';
</script>

<svelte:head>
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
</svelte:head>

<Header />
<Body>
  <slot />
</Body>
<Footer />
