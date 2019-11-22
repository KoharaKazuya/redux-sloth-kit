import { Reducer } from "redux";
import {
  ActionCreator,
  Module,
  SelectorMap,
  UnionToIntersection
} from "./types";

export default function reduceModules<
  S,
  R extends Record<string, ActionCreator<any, any>>,
  T extends SelectorMap<S>,
  M extends Module<S, any, any>[]
>(
  baseModule: Module<S, R, T>,
  ...restModules: M
): {
  reducer: Reducer<S>;
  actionCreators: R & UnionToIntersection<M[number]["actionCreators"]>;
  selectors: T & UnionToIntersection<M[number]["selectors"]>;
} {
  const modules = [baseModule, ...restModules];
  return {
    reducer: (state, action) =>
      modules.reduce((accu, m) => m.reducer(accu, action), state as S),
    actionCreators: modules.reduce(
      (accu, m) => ({
        ...accu,
        ...m.actionCreators
      }),
      {} as any
    ),
    selectors: modules.reduce(
      (accu, m) => ({ ...accu, ...m.selectors }),
      {} as any
    )
  };
}
