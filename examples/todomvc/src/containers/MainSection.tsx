import React from "react";
import { useSelector } from "react-redux";
import { default as MainSectionComponent } from "../components/MainSection";
import useActions from "../hooks/useActions";
import { selectors } from "../store";

export default function MainSection() {
  const todosCount = useSelector((state: any) => state.todos.length);
  const completedCount = useSelector(selectors.getCompletedTodoCount());
  const actions = useActions();

  return (
    <MainSectionComponent
      todosCount={todosCount}
      completedCount={completedCount}
      actions={actions}
    />
  );
}
