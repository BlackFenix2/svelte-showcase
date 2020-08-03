import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import typescript from '@rollup/plugin-typescript';
import autoPreprocess from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';
import * as path from 'path';
import type { RollupOptions } from 'rollup';

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const onwarn = (warning, onwarn) =>
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === 'THIS_IS_UNDEFINED' ||
  onwarn(warning);

const extensions = ['.mjs', '.js', '.json', '.node', '.ts', '.svelte'];

const useTypescriptEntry = (string) => {
  return string.replace(/\.js$/, '.ts');
};

interface RollupConfig {
  client: RollupOptions;
  server: RollupOptions;
  serviceworker: RollupOptions;
}

const rollupConfig: RollupConfig = {
  client: {
    input: useTypescriptEntry(config.client.input()),
    output: config.client.output(),
    plugins: [
      alias({
        entries: [
          { find: 'src', replacement: path.resolve(process.cwd(), 'src') },
        ],
      }),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        dev,
        hydratable: true,
        emitCss: true,
        preprocess: autoPreprocess(),
      }),
      resolve({
        browser: true,
        dedupe: ['svelte'],
        extensions: extensions,
      }),
      commonjs(),
      typescript(),

      !dev &&
        terser({
          module: true,
        }),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },

  server: {
    input: useTypescriptEntry(config.server.input().server),
    output: config.server.output(),
    plugins: [
      alias({
        entries: [
          { find: 'src', replacement: path.resolve(process.cwd(), 'src') },
        ],
      }),
      replace({
        'process.browser': false,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        generate: 'ssr',
        dev,
        preprocess: autoPreprocess(),
      }),
      resolve({
        dedupe: ['svelte'],
        extensions: extensions,
      }),
      commonjs(),
      typescript(),
    ],

    preserveEntrySignatures: 'strict',
    onwarn,
  },

  serviceworker: {
    input: useTypescriptEntry(config.serviceworker.input()),
    output: config.serviceworker.output(),
    plugins: [
      resolve(),
      replace({
        'process.browser': true,
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      typescript(),

      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};

export default rollupConfig;
