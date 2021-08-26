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
      rxjs: `src/rxjs.js`,
      "rxjs-operators": `src/rxjs-operators.js`,
      "rxjs-ajax": `src/rxjs-ajax.js`,
      "rxjs-fetch": `src/rxjs-fetch.js`,
      "rxjs-websocket": `src/rxjs-websocket.js`,
      "rxjs-testing": `src/rxjs-testing.js`,
    },
    output: {
      dir,
      entryFileNames: `[name].min.js`,
      chunkFileNames: `rxjs-shared.min.js`,
      manualChunks: (id, { getModuleInfo }) => {
        if (getModuleInfo(id).isEntry) {
          return;
        }
        const indexOfNodeModules = id.indexOf("/node_modules/");
        if (indexOfNodeModules >= 0) {
          // we want to place 'rxjs/testing' code in a separate chunk, because it is used mainly for tests
          if (id.indexOf("/internal/testing/", indexOfNodeModules) > 0) {
            return "internal/testing";
          }
          // everything else goes into a single separate chunk
          // ajax, fetch, sockets are too small to separate them similar to 'rxjs/testing'.
          else if (id.indexOf("/internal/", indexOfNodeModules) > 0) {
            return "internal";
          }
        }
      },
      format,
      banner: `/* rxjs@${dependencyVersion} */`,
    },
    plugins: [
      resolve({
        exportConditions: target === "es2015" ? ["es2015"] : undefined,
      }),
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
