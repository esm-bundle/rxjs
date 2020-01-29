describe("@esm-bundle/autopublish-template", () => {
  it("can load the esm bundle without dying", () => {
    return import("../esm/index.js");
  });
});
