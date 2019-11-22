import { Store } from "redux";
import store from ".";

type StateOf<S> = S extends Store<infer State> ? State : never;
type State = StateOf<typeof store>;

const selectors = {
  getVisibleTodos() {
    return (state: State) => {
      switch (state.visibilityFilter) {
        case "SHOW_ALL":
          return state.todos;
        case "SHOW_COMPLETED":
          return state.todos.filter(t => t.completed);
        case "SHOW_ACTIVE":
          return state.todos.filter(t => !t.completed);
        default:
          throw new Error("Unknown filter: " + state.visibilityFilter);
      }
    };
  }
};
export default selectors;
