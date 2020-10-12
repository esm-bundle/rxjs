import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const dependencyVersion = /[0-9.]+$/.exec(
  packageJson.devDependencies["rxjs"]
)[0];

function createConfig(format, target) {
  const dir = (format === "module" ? "esm" : format) + "/" + target;

  return {
    input: {
      rxjs: `src/${target}/rxjs.js`,
      "rxjs-operators": `src/${target}/rxjs-operators.js`,
      "rxjs-ajax": `src/${target}/rxjs-ajax.js`,
      "rxjs-fetch": `src/${target}/rxjs-fetch.js`,
      "rxjs-websocket": `src/${target}/rxjs-websocket.js`,
      "rxjs-testing": `src/${target}/rxjs-testing.js`,
    },
    output: {
      dir,
      entryFileNames: `[name].min.js`,
      chunkFileNames: `rxjs-shared.min.js`,
      format,
      banner: `/* rxjs@${dependencyVersion} */`,
    },
    plugins: [
      resolve(),
      commonjs(),
      terser({
        output: {
          comments(node, comment) {
            return /^rxjs.*@/.test(comment.value.trim());
          },
        },
      }),
    ],
  };
}

export default [
  createConfig("module", "es5"),
  createConfig("module", "es2015"),
  createConfig("system", "es5"),
  createConfig("system", "es2015"),
];
