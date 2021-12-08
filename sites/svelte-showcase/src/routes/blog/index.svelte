<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch, session, stuff }) {
    const res = await fetch(`blog.json`);
    const { posts } = await res.json();
    return { props: { posts } };
  }
</script>

<script>
  export let posts;
</script>

<style>
  ul {
    margin: 0 0 1em 0;
    line-height: 1.5;
  }
</style>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
  {#each posts as post}
    <li>
      <a rel="prefetch" href="blog/{post.slug}">{post.title}</a>
    </li>
  {/each}
</ul>
