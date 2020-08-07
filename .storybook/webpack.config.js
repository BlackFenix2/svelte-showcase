const autoPreprocess = require('svelte-preprocess');

// manually inject svelte preporcessor into storybook webpack config
module.exports = ({ config, mode }) => {
  const svelteLoader = config.module.rules.find(
    (r) => r.loader && r.loader.includes('svelte-loader')
  );
  svelteLoader.options.preprocess = autoPreprocess();
  config.resolve.extensions.push('.ts', '.tsx');
  return config;
};
