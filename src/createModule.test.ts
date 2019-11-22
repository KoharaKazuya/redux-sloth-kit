import createModule from "./createModule";

describe("createModule", () => {
  const { reducer, actionCreators, selectors } = createModule({
    initialState: { count: 0 },
    reducers: {
      increment() {
        this.count++;
      },
      add(amount) {
        this.count += amount;
      }
    },
    selectors: {
      getDouble() {
        return ({ count }) => count * 2;
      }
    }
  });

  describe("reducer", () => {
    it("has initial state", () => {
      const state = reducer(undefined, {} as any);
      expect(state.count).toBe(0);
    });
  });

  describe("actionCreators", () => {
    it("is an action creator", () => {
      const action = actionCreators.increment();
      expect(action).toEqual({ type: "increment", payload: [] });
    });

    it("deals with function payload", () => {
      const state = reducer(undefined, actionCreators.add(5));
      expect(state.count).toBe(5);
    });
  });

  describe("selectors", () => {
    it("converts select", () => {
      const state = reducer(undefined, actionCreators.add(5));
      const double = selectors.getDouble()(state);
      expect(double).toBe(10);
    });
  });
});
