import React from "react";
import FilterLink from "../containers/FilterLink";
import { Filter } from "../store/modules/visibilityFilter";

const FILTER_TITLES = {
  SHOW_ALL: "All",
  SHOW_ACTIVE: "Active",
  SHOW_COMPLETED: "Completed"
} as const;

type Props = {
  completedCount: number;
  activeCount: number;
  onClearCompleted: () => void;
};

export default function Footer({
  activeCount,
  completedCount,
  onClearCompleted
}: Props) {
  const itemWord = activeCount === 1 ? "item" : "items";

  return (
    <footer className="footer">
      <span className="todo-count">
        <strong>{activeCount || "No"}</strong> {itemWord} left
      </span>
      <ul className="filters">
        {(Object.keys(FILTER_TITLES) as Filter[]).map(filter => (
          <li key={filter}>
            <FilterLink filter={filter}>{FILTER_TITLES[filter]}</FilterLink>
          </li>
        ))}
      </ul>
      {!!completedCount && (
        <button className="clear-completed" onClick={onClearCompleted}>
          Clear completed
        </button>
      )}
    </footer>
  );
}
