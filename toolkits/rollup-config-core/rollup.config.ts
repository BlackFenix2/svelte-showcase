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
import type { RollupOptions, WarningHandler, RollupWarning } from 'rollup';

// Utilize process.cwd() instead of __dirname to get the working directory of the calling script rather rhan this file

const mode = process.env.NODE_ENV;
const dev = mode === 'development';

const onwarn = (warning: RollupWarning, onwarn: WarningHandler): void | true =>
  (warning.code === 'MISSING_EXPORT' && /'preload'/.test(warning.message)) ||
  (warning.code === 'CIRCULAR_DEPENDENCY' &&
    /[/\\]@sapper[/\\]/.test(warning.message)) ||
  warning.code === 'THIS_IS_UNDEFINED' ||
  onwarn(warning);

const extensions = ['.mjs', '.js', '.json', '.node', '.ts', '.svelte'];

const useTypescriptEntry = (string: string) => {
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
        'process.browser': JSON.stringify(true),
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
      typescript({ sourceMap: dev }),

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
        'process.browser': JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      svelte({
        generate: 'ssr',
        hydratable: true,
        dev,
        preprocess: autoPreprocess(),
      }),
      resolve({
        dedupe: ['svelte'],
        extensions: extensions,
      }),
      commonjs(),
      typescript({ sourceMap: dev }),
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
        'process.browser': JSON.stringify(true),
        'process.env.NODE_ENV': JSON.stringify(mode),
      }),
      commonjs(),
      typescript({ sourceMap: dev }),

      !dev && terser(),
    ],

    preserveEntrySignatures: false,
    onwarn,
  },
};

export default rollupConfig;
