import commonjs from "@rollup/plugin-commonjs";

function createConfig(format) {
  const dir = format === "module" ? "esm" : format;
  return {
    input: require.resolve("autopublish-template"),
    output: {
      file: `${dir}/index.js`,
      format
    },
    plugins: [commonjs()]
  };
}

export default [createConfig("module"), createConfig("system")];
