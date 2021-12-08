import posts from './_posts';

const contents = posts.map((post) => {
  return {
    title: post.title,
    slug: post.slug,
  };
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export async function get({ params }) {
  return {
    body: {
      posts: contents,
    },
  };
}
