import React from "react";
import { useSelector } from "react-redux";
import TodoList from "../components/TodoList";
import useActions from "../hooks/useActions";
import { selectors } from "../store";

export default function VisibleTodoList() {
  const filteredTodos = useSelector(selectors.getVisibleTodos());
  const actions = useActions();

  return <TodoList filteredTodos={filteredTodos} actions={actions} />;
}
