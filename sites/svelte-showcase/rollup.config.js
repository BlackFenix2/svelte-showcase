import config from 'rollup-config-core';
import pkg from './package.json';

export default {
  ...config,
  server: {
    ...config.server,
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),
  },
};
