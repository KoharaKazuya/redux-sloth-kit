import combineModules from "./combineModules";

describe("combineModules", () => {
  const { reducer, actionCreators, selectors } = combineModules({
    counter: {
      reducer: (state = 0, action) => state,
      actionCreators: {
        increment: () => ({ type: "increment", payload: [] })
      },
      selectors: {
        getCount: () => (state: number) => state
      }
    },
    user: {
      reducer: (state = "", action) => state,
      actionCreators: {
        rename: (name: string) => ({ type: "rename", payload: [name] })
      },
      selectors: {
        getUser: () => (state: string) => state
      }
    }
  });

  it("combines modules", () => {});

  describe("combined module", () => {
    it("has initail state", () => {
      expect(reducer(undefined, {} as any)).toEqual({
        counter: 0,
        user: ""
      });
    });

    it("has all action creators", () => {
      expect(actionCreators.increment()).toEqual({
        type: "increment",
        payload: []
      });
      expect(actionCreators.rename("example")).toEqual({
        type: "rename",
        payload: ["example"]
      });
    });

    it("has all selectors", () => {
      const state = reducer(undefined, {} as any);
      expect(selectors.getCount()(state)).toBe(0);
      expect(selectors.getUser()(state)).toBe("");
    });
  });
});
