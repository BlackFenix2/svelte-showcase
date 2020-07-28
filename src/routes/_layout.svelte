<script lang="typescript">
  import 'bootstrap/dist/css/bootstrap.min.css';
  import { Header, Body, Footer } from '../layout';
</script>

<Header />
<Body>
  <slot />
</Body>
<Footer />
