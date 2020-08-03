import { configure } from '@storybook/svelte';

function loadStories() {
  const req = require.context('../', true, /\.stories\.ts$/);
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
