<script lang="ts">
  import { count } from 'src/state';
  import { Button, Container } from 'sveltestrap';
  import SEO from './_seo.svelte';

  function add() {
    console.log('add');
    count.increment();
  }

  function subtract() {
    count.decrement();
  }
</script>

<SEO title="About" />

<Container fluid>
  <h1>About this site</h1>

  <p>This is the 'about' page. There's not much here.</p>

  <p>count is {$count}</p>

  <Button color="primary" on:click={add}>+</Button>
  <Button color="secondary" on:click={subtract}>-</Button>
  <Button color="danger" on:click={count.reset}>Reset</Button>
</Container>
