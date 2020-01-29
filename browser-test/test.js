describe("@esm-bundle/rxjs", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/rxjs.min.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/rxjs.min.js");
  });
});

describe("rxjs operators", () => {
  it("can load the ESM bundle", () => {
    return import("/base/esm/rxjs-operators.min.js");
  });

  it("can load the System.register bundle", () => {
    return System.import("/base/system/rxjs-operators.min.js");
  });
});
