/* eslint-disable @typescript-eslint/no-var-requires */
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import camelCase from 'lodash.camelcase';

const pkg = require('./package.json')
const prod = !process.env.ROLLUP_WATCH;

export default {
  input: `src/${pkg.name}.ts`,
  output: [
    { file: pkg.module, format: 'es', sourcemap: true },
    { file: pkg.main, name: camelCase(pkg.name), format: 'umd', sourcemap: true },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  watch: {
    include: 'src/**',
    clearScreen: false
  },
  plugins: [
    // Compile TypeScript files
    typescript({
      noEmitOnError: false,
      tsconfig: "tsconfig.rollup.json",
    }),
    // Allow bundling cjs modules (unlike webpack, rollup doesn't understand cjs)
    commonjs(),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve(),
    // Minimazation for production build
    prod && terser(),
  ],
}
