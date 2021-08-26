import { resolve } from "path";
import { readFileSync, writeFileSync } from "fs";

const exportsToModify = [
  {
    ".": {
      es2015: "./dist/esm/index.js",
    },
  },
  {
    "./ajax": {
      es2015: "./dist/esm/ajax/index.js",
    },
  },
  {
    "./fetch": {
      es2015: "./dist/esm/fetch/index.js",
    },
  },
  {
    "./operators": {
      es2015: "./dist/esm/operators/index.js",
    },
  },
  {
    "./testing": {
      es2015: "./dist/esm/testing/index.js",
    },
  },
  {
    "./webSocket": {
      es2015: "./dist/esm/webSocket/index.js",
    },
  },
];

exportsToModify.forEach((_export) => {
  const packagePath = `${resolve("node_modules/rxjs")}/package.json`;
  modifyExportInPackageJson(_export, packagePath);
});

function modifyExportInPackageJson(_export, packageJSONPath) {
  try {
    const packageJSON = JSON.parse(readFileSync(packageJSONPath, "utf-8"));
    // only add the export if rxjs version is v7
    const isVersion7 = packageJSON.version.startsWith("7");
    const key = Object.keys(_export)[0];
    if (isVersion7) {
      if (packageJSON.exports[key] !== undefined) {
        packageJSON.exports[key] = {
          ..._export[key],
          ...packageJSON.exports[key],
        };
      }
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
