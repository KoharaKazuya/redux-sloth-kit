import React from "react";
import TodoTextInput from "./TodoTextInput";

type Props = {
  addTodo: (text: string) => void;
};

export default function Header({ addTodo }: Props) {
  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput
        newTodo
        onSave={text => {
          if (text.length !== 0) {
            addTodo(text);
          }
        }}
        placeholder="What needs to be done?"
      />
    </header>
  );
}
