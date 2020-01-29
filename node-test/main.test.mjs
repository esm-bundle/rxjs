import { animationFrameScheduler, of } from "../esm/rxjs.min.js";
import { map, filter, switchMap } from "../esm/rxjs-operators.min.js";

describe("@esm-bundle/rxjs", () => {
  it("rxjs has correct properties on it", () => {
    expect(animationFrameScheduler).to.be.ok;
    expect(of).to.be.ok;
  });

  it("rxjs operators have correct properties on it", () => {
    expect(map).to.be.ok;
    expect(filter).to.be.ok;
    expect(switchMap).to.be.ok;
  });
});
