import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const exportsToAdd = [
  {
    "./es2015": {
      default: "./dist/esm/index.js",
    },
  },
  {
    "./es2015/ajax": {
      default: "./dist/esm/ajax/index.js",
    },
  },
  {
    "./es2015/fetch": {
      default: "./dist/esm/fetch/index.js",
    },
  },
  {
    "./es2015/operators": {
      default: "./dist/esm/operators/index.js",
    },
  },
  {
    "./es2015/testing": {
      default: "./dist/esm/testing/index.js",
    },
  },
  {
    "./es2015/webSocket": {
      default: "./dist/esm/webSocket/index.js",
    },
  },
];

exportsToAdd.forEach((_export) => {
  const packagePath = `${resolve("node_modules/rxjs")}/package.json`;
  addExportToPackageJson(_export, packagePath);
});

function addExportToPackageJson(_export, packageJSONPath) {
  try {
    const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf-8"));
    // only add the export if rxjs version is v7
    const isVersion7 = packageJSON.version.startsWith("7");
    if (isVersion7) {
      packageJSON.exports = { ...packageJSON.exports, ..._export };
      writeFileSync(packageJSONPath, JSON.stringify(packageJSON, undefined, 2));
      console.info(
        `successfully added export ${Object.keys(_export)} to package.json`
      );
    } else {
      console.info(
        `rxjs version is not v7 so ${Object.keys(
          _export
        )} export was not added to package.json`
      );
    }
  } catch (e) {
    console.error(e);
  }
}
