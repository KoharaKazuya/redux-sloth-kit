import produce from "immer";
import { Reducer } from "redux";
import {
  InferedModule,
  ModuleConstructor,
  ReducerMap,
  SelectorMap
} from "./types";

export default function createModule<
  S,
  R extends ReducerMap<S>,
  U extends SelectorMap<S>
>({
  initialState,
  reducers,
  selectors = {} as U
}: ModuleConstructor<S, R, U>): InferedModule<S, R, U> {
  const keys: (keyof R)[] = Object.keys(reducers);

  const rs: Reducer<S>[] = keys.map(k => (state: S | undefined, action) => {
    if (action.type !== k) return state!;
    return produce(state, (draft: S) =>
      reducers[k].apply(draft, action.payload)
    ) as S;
  });

  const actionCreators = keys.reduce(
    (accu, type) => ({
      ...accu,
      [type]: (...payload: any[]) => ({ type, payload })
    }),
    {} as any
  );

  return {
    reducer: (state = initialState, action) =>
      rs.reduce((accu, r) => r(accu, action), state),
    actionCreators,
    selectors: selectors as any
  };
}
