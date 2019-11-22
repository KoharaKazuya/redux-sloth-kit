import reduceModules from "./reduceModules";

type State = {
  count: number;
  user: string;
};
const initialState: State = {
  count: 0,
  user: ""
};

describe("reduceModules", () => {
  const counter = {
    reducer: (state: State = initialState, action: any) => state,
    actionCreators: {
      increment: () => ({ type: "increment", payload: [] })
    },
    selectors: {
      getCount() {
        return (state: State) => state.count;
      }
    }
  };
  const user = {
    reducer: (state: State = initialState, action: any) => state,
    actionCreators: {
      rename: (name: string) => ({ type: "rename", payload: [name] })
    },
    selectors: {
      getUser() {
        return (state: State) => state.user;
      }
    }
  };
  const { reducer, actionCreators, selectors } = reduceModules(counter, user);

  it("reduces modules", () => {});

  describe("reduced module", () => {
    it("has initail state", () => {
      expect(reducer(undefined, {} as any)).toEqual({
        count: 0,
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
