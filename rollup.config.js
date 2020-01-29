import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";
import packageJson from "./package.json";

const dependencyVersion = /[0-9.]+$/.exec(
  packageJson.devDependencies["rxjs"]
)[0];

function createConfig(format, isOperators) {
  const dir = format === "module" ? "esm" : format;
  const filenameExtra = isOperators ? "-operators" : "";

  return {
    input: require.resolve(
      `rxjs/_esm2015${isOperators ? "/operators" : ""}/index.js`
    ),
    output: {
      file: `${dir}/rxjs${filenameExtra}.min.js`,
      format,
      banner: `/* rxjs${filenameExtra}@${dependencyVersion} */`
    },
    plugins: [
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

export default [
  createConfig("module"),
  createConfig("system"),
  createConfig("module", true),
  createConfig("system", true)
];
