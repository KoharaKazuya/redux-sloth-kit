import React from "react";
import { useSelector } from "react-redux";
import Link from "../components/Link";
import useActions from "../hooks/useActions";
import { selectors } from "../store";
import { Filter } from "../store/modules/visibilityFilter";

type Props = {
  filter: Filter;
  children: React.ReactNode;
};

export default function FilterLink({ filter, children }: Props) {
  const currentFilter = useSelector(selectors.getVisibilityFilter());
  const actions = useActions();

  return (
    <Link
      active={filter === currentFilter}
      setFilter={() => actions.setVisibilityFilter(filter)}
    >
      {children}
    </Link>
  );
}
