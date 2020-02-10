import babel from "rollup-plugin-babel";
import { eslint } from "rollup-plugin-eslint";
import resolve from "@rollup/plugin-node-resolve";
import { uglify } from "rollup-plugin-uglify";
import filesize from "rollup-plugin-filesize";
import commonjs from "@rollup/plugin-commonjs";
import progress from "rollup-plugin-progress";
import license from "rollup-plugin-license";
const pkg = require("./package");

const date = new Date();

let pluginOptions = [
  resolve({
    jsnext: true,
    browser: true
  }),
  commonjs(),
  eslint(),
  progress(),
  babel({
    exclude: "node_modules/**",
    presets: [["@babel/env", { modules: false }]]
  }),
  uglify(),
  license({
    banner: `letterize.js v${pkg.version}
(c) ${date.getFullYear()} Wojciech Krakowiak
Released under the MIT license
https://github.com/WojciechWKROPCE/letterize`
  }),
  filesize({
    showGzippedSize: false
  })
];

const config = {
  input: "src/letterize.js",
  output: {
    file: "lib/letterize.min.js",
    format: "umd",
    name: "Letterize"
  },
  plugins: pluginOptions
};

export default config;
