import { combineModules } from "redux-sloth-kit";
import todos from "./todos";
import visibilityFilter from "./visibilityFilter";

const { reducer, actionCreators, selectors } = combineModules({
  todos,
  visibilityFilter
});
export { reducer, actionCreators, selectors };
