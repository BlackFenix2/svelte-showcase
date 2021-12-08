<script context="module">
  /** @type {import('@sveltejs/kit').Load} */
  export async function load({ page, fetch, session, stuff }) {
    // the `slug` parameter is available because
    // this file is called [slug].svelte

    console.log('in svelte: ', page.params);
    const res = await fetch(`blog/${page.params.slug}.json`);
    console.log('Post List: ', res);
    const { post } = await res.json();
    console.log('Post List: ', post);
    if (res.status === 200) {
      return { props: post };
    }
    return {
      status: res.status,
      error: new Error(`Could not load ${url}`),
    };
  }
</script>

<script>
  export let post;
</script>

<style>
  /*
		By default, CSS is locally scoped to the component,
		and any unused styles are dead-code-eliminated.
		In this page, Svelte can't know which elements are
		going to appear inside the {{{post.html}}} block,
		so we have to use the :global(...) modifier to target
		all elements inside .content
	*/
  .content :global(h2) {
    font-size: 1.4em;
    font-weight: 500;
  }

  .content :global(pre) {
    padding: 0.5em;
    background-color: #f9f9f9;
    border-radius: 2px;
    box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
    overflow-x: auto;
  }
  .content :global(ul) {
    line-height: 1.5;
  }

  .content :global(li) {
    margin: 0 0 0.5em 0;
  }
  .content :global(pre) :global(code) {
    padding: 0;
    background-color: transparent;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div class="content">
  {@html post.html}
</div>
