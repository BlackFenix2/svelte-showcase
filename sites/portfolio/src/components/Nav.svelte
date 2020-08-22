<script lang="ts">
  export let segment: string;
</script>

<style>
  nav {
    padding: 0 1em;
    border-bottom: 1px solid rgba(255, 62, 0, 0.1);
    font-weight: 300;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  /* clearfix */
  ul::after {
    display: block;
    clear: both;
    content: '';
  }

  li {
    display: block;
    float: left;
  }

  [aria-current] {
    position: relative;
    display: inline-block;
  }

  [aria-current]::after {
    position: absolute;
    bottom: -1px;
    display: block;
    width: calc(100% - 1em);
    height: 2px;
    background-color: rgb(255, 62, 0);
    content: '';
  }

  a {
    display: block;
    padding: 1em 0.5em;
    text-decoration: none;
  }
</style>

<nav>
  <ul>
    <li>
      <a aria-current={segment === undefined ? 'page' : undefined} href=".">
        home
      </a>
    </li>
    <li>
      <a aria-current={segment === 'about' ? 'page' : undefined} href="about">
        about
      </a>
    </li>

    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'blog' ? 'page' : undefined}
        href="blog">
        blog
      </a>
    </li>
    <li>
      <a
        rel="prefetch"
        aria-current={segment === 'typography' ? 'page' : undefined}
        href="typography">
        Typography
      </a>
    </li>
  </ul>
</nav>
