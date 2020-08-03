import { pickRandom, remove } from 'src/utils';

const ROUNDS_PER_GAME = 10;

export function select(celebs, lookup, category) {
  const filtered = celebs.filter((c) => {
    return c.categories.includes(category);
  });

  const seen = new Set();
  const selection = [];

  let i = ROUNDS_PER_GAME;
  while (i--) {
    const n = Math.random();
    const ai = Math.floor(n * filtered.length);
    const a = filtered[ai];

    // remove a from the array so this person can't be picked again
    remove(filtered, ai);

    let b;

    // if this celeb has 'similar' celebs, decide whether to pick one
    const similar = a.similar.filter((id) => !seen.has(id));
    if (similar.length > 0 && Math.random() < 0.75) {
      const id = pickRandom(similar);
      b = lookup.get(id);
    }

    // otherwise pick someone at random
    else {
      b = pickRandom(filtered);
    }

    selection.push({ a, b });

    seen.add(a.id);
    seen.add(b.id);

    // remove b from the array so this person can't be picked again
    remove(filtered, filtered.indexOf(b));
  }

  return selection;
}
