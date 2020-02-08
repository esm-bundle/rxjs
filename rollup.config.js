import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const dependencyVersion = /[0-9.]+$/.exec(
  packageJson.devDependencies["rxjs"]
)[0];

function createConfig(format, isOperators) {
  const dir = format === "module" ? "esm" : format;
  const filenameExtra = isOperators ? "-operators" : "";

  return {
    input: {
      rxjs: "src/rxjs.js",
      "rxjs-operators": "src/rxjs-operators"
    },
    output: {
      dir,
      entryFileNames: `[name].min.js`,
      chunkFileNames: `rxjs-shared.min.js`,
      format,
      banner: `/* rxjs${filenameExtra}@${dependencyVersion} */`
    },
    plugins: [
      resolve(),
      commonjs(),
      terser({
        output: {
          comments(node, comment) {
            return /^rxjs.*@/.test(comment.value.trim());
          }
        }
      })
    ]
  };
}

export default [createConfig("module"), createConfig("system")];
