import posts from './_posts';

const lookup = new Map();
posts.forEach((post) => {
  lookup.set(post.slug, JSON.stringify(post));
});

/** @type {import('@sveltejs/kit').RequestHandler} */
export function get({ params }) {
  console.log('server hit: ', params);
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = params;
  if (lookup.has(slug)) {
    return { body: { post: lookup.get(slug) } };
  } else {
    return { body: { post: lookup.get(slug) } };
  }
}
