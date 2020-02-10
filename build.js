const { rollup } = require("rollup");
const { minify } = require("uglify-js");
const pretty = require("pretty-bytes");
const sizer = require("gzip-size");
const pkg = require("./package");

const date = new Date();
const banner = `/*
 * letterize.js v${pkg.version}
 * (c) ${date.getFullYear()} Wojciech Krakowiak
 * Released under the MIT license
 * https://github.com/WojciechWKROPCE/letterize
 */
`;

console.info("Compiling...");

rollup({
  input: "src/letterize.js",
  output: [
    {
      format: "cjs",
      file: "./lib/letterize-cjs.js"
    },
    {
      format: "umd",
      file: "./lib/letterize.min.js"
    }
  ]
}).catch(console.error);
