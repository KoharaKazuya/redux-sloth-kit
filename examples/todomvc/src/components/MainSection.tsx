import React from "react";
import VisibleTodoList from "../containers/VisibleTodoList";
import Footer from "./Footer";

type Props = {
  todosCount: number;
  completedCount: number;
  actions: {
    completeAllTodos: () => void;
    clearCompleted: () => void;
  };
};

export default function MainSection({
  todosCount,
  completedCount,
  actions
}: Props) {
  return (
    <section className="main">
      {!!todosCount && (
        <span>
          <input
            className="toggle-all"
            type="checkbox"
            checked={completedCount === todosCount}
            readOnly
          />
          <label onClick={actions.completeAllTodos} />
        </span>
      )}
      <VisibleTodoList />
      {!!todosCount && (
        <Footer
          completedCount={completedCount}
          activeCount={todosCount - completedCount}
          onClearCompleted={actions.clearCompleted}
        />
      )}
    </section>
  );
}
