import React from "react";
import TodoItem from "./TodoItem";

type Props = {
  filteredTodos: Array<{
    id: number;
    completed: boolean;
    text: string;
  }>;
  actions: {
    editTodo: (id: number, text: string) => void;
    deleteTodo: (id: number) => void;
    completeTodo: (id: number) => void;
  };
};

export default function TodoList({ filteredTodos, actions }: Props) {
  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <TodoItem key={todo.id} todo={todo} {...actions} />
      ))}
    </ul>
  );
}
