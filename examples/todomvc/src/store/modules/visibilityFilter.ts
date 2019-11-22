import { createModule } from "redux-sloth-kit";

export type Filter = "SHOW_ALL" | "SHOW_ACTIVE" | "SHOW_COMPLETED";

export default createModule({
  initialState: "SHOW_ALL" as Filter,
  reducers: {
    setVisibilityFilter(filter: Filter) {
      return filter;
    }
  },
  selectors: {
    getVisibilityFilter() {
      return state => state;
    }
  }
});
