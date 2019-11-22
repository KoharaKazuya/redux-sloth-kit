import { createStore } from "redux";
import additionalSelectors from "./additional-selectors";
import { reducer, selectors as moduleSelectors } from "./modules";

export const selectors = { ...moduleSelectors, ...additionalSelectors };

export default createStore(reducer);
