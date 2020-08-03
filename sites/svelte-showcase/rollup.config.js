import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import svelte from 'rollup-plugin-svelte';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';
import typescript from '@rollup/plugin-typescript';
import autoPreprocess from 'svelte-preprocess';
import alias from '@rollup/plugin-alias';
import path from 'path';

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

export default {
  client: {
    input: useTypescriptEntry(config.client.input()),
    output: config.client.output(),
    plugins: [
      alias({
        resolve: ['.ts', '.svelte'],
        entries: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
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
        resolve: ['.ts', '.svelte'],
        entries: [{ find: 'src', replacement: path.resolve(__dirname, 'src') }],
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
    external: Object.keys(pkg.dependencies).concat(
      require('module').builtinModules ||
        Object.keys(process.binding('natives'))
    ),

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
