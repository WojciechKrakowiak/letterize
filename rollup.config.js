import babel from 'rollup-plugin-babel';
import { eslint } from 'rollup-plugin-eslint';
import resolve from '@rollup/plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import license from 'rollup-plugin-license';
import pkg from './package.json';
import typescript from "rollup-plugin-typescript2";
import {DEFAULT_EXTENSIONS} from "@babel/core";

const date = new Date();

let plugins = [
  resolve({
    jsnext: true,
    browser: true,
  }),
  eslint(),
  progress(),
  typescript(),
  license({
    banner: `letterize.js v${pkg.version}
(c) ${date.getFullYear()} Wojciech Krakowiak
Released under the MIT license
https://github.com/WojciechWKROPCE/letterize`,
  }),
  filesize({
    showGzippedSize: false,
  }),
];


let pluginsMinify = [
  resolve({
    jsnext: true,
    browser: true,
  }),
  eslint(),
  typescript({tsconfigOverride: {module: 'CommonJS', target: "es5", declaration: false}}),
  commonjs({ extensions: ['.js', '.ts']}),
  progress(),
  babel({
    exclude: 'node_modules/**',
    presets: [['@babel/env', { modules: false }]],
    extensions: [
        ...DEFAULT_EXTENSIONS,
        '.ts'
    ]
  }),
  uglify(),
  license({
    banner: `letterize.js v${pkg.version}
(c) ${date.getFullYear()} Wojciech Krakowiak
Released under the MIT license
https://github.com/WojciechWKROPCE/letterize`,
  }),
  filesize({
    showGzippedSize: false,
  }),
];

const config = [{
  input: 'src/letterize.ts',
  output: {
    file: 'lib/letterize.min.js',
    format: 'umd',
    name: 'Letterize',
  },
  plugins: pluginsMinify,
}, {
  input: 'src/letterize.ts',
  output: {
    file: 'lib/letterize.js',
    format: 'es',
    name: 'Letterize',
  },
  plugins: plugins,
}];

export default config;
