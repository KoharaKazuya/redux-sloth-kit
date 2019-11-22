import { combineReducers, Reducer } from "redux";
import { Module, SelectorMap, UnionToIntersection } from "./types";

type ReducerState<R> = R extends Reducer<infer S> ? S : never;

type InferedState<M extends Record<string, Module<any, any, any>>> = {
  [K in keyof M]: ReducerState<M[K]["reducer"]>;
};

type CombinedSelectors<S, M extends SelectorMap<any>> = {
  [K in keyof M]: (
    ...args: Parameters<M[K]>
  ) => (state: S) => ReturnType<ReturnType<M[K]>>;
};

function nestSelectors<S>(childKey: keyof S, selectors: SelectorMap<any>) {
  return Object.keys(selectors).reduce(
    (accu, key) => ({
      ...accu,
      [key]: (...args: any[]) => (state: S) =>
        selectors[key](...args)(state[childKey])
    }),
    {} as any
  );
}

export default function combineModules<
  M extends Record<string, Module<any, any, any>>
>(
  moduleMap: M
): {
  reducer: Reducer<InferedState<M>>;
  actionCreators: UnionToIntersection<M[keyof M]["actionCreators"]>;
  selectors: UnionToIntersection<
    CombinedSelectors<InferedState<M>, M[keyof M]["selectors"]>
  >;
} {
  const keys = Object.keys(moduleMap) as (keyof M)[];
  return {
    reducer: combineReducers(
      keys.reduce(
        (accu, key) => ({ ...accu, [key]: moduleMap[key].reducer }),
        {} as any
      )
    ),
    actionCreators: keys.reduce(
      (accu, key) => ({ ...accu, ...moduleMap[key].actionCreators }),
      {} as any
    ),
    selectors: keys.reduce(
      (accu, key) => ({
        ...accu,
        ...nestSelectors(key, moduleMap[key].selectors)
      }),
      {} as any
    )
  };
}
