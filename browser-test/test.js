describe("@esm-bundle/rxjs", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/es2015/rxjs.min.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/es2015/rxjs.min.js");
  });
});

describe("rxjs operators", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/es2015/rxjs-operators.min.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/es2015/rxjs-operators.min.js");
  });
});
