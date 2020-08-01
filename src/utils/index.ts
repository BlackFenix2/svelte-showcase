export function pickRandom(array: any[]) {
  const index = Math.floor(array.length * Math.random());
  return array[index];
}

export function remove(array, index) {
  // if a 'similar' account was picked, there's no
  // guarantee that it's in the filtered array
  if (index === -1) return;

  // this is much faster than splicing the array
  array[index] = array[array.length - 1];
  array.pop();
}

export function sleep(ms: number) {
  return new Promise((fulfil) => {
    setTimeout(fulfil, ms);
  });
}

export function loadImage(src) {
  return new Promise((fulfil, reject) => {
    const img = new Image();
    img.onload = () => fulfil(img);
    img.onerror = reject;
    img.src = src;
  });
}
