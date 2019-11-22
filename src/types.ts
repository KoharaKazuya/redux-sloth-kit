import { Reducer } from "redux";

export type UnionToIntersection<U> = (U extends any
  ? (k: U) => void
  : never) extends ((k: infer I) => void)
  ? I
  : never;

export type ReducerMap<S, A extends any[] = any[]> = Record<
  string,
  (this: S, ...args: A) => S | void
>;

export type SelectorMap<S> = Record<
  string,
  (...args: any[]) => (state: S) => any
>;

export interface ModuleConstructor<
  S,
  R extends ReducerMap<S>,
  U extends SelectorMap<S>
> {
  initialState: S;
  reducers: R;
  selectors?: U;
}

export type ActionCreator<T, A extends any[]> = (
  ...args: A
) => { type: T; payload: A };

type UntypedIsEmpty<T, U> = string extends (keyof T) ? {} : U;

export type InferedModule<S, R extends ReducerMap<S>, U> = {
  reducer: Reducer<S, any>;
  actionCreators: { [K in keyof R]: ActionCreator<K, Parameters<R[K]>> };
  selectors: UntypedIsEmpty<U, { [K in keyof U]: U[K] }>;
};

export interface Module<
  S,
  R extends Record<string, ActionCreator<any, any>>,
  T extends SelectorMap<S>
> {
  reducer: Reducer<S>;
  actionCreators: R;
  selectors: T;
}
