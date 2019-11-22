import classnames from "classnames";
import React, { useState } from "react";

type Props = {
  onSave: (text: string) => void;
  text?: string;
  placeholder?: string;
  editing?: boolean;
  newTodo?: boolean;
};

export default function TodoTextInput({
  onSave,
  text: initialText,
  placeholder,
  editing,
  newTodo
}: Props) {
  const [text, setText] = useState(initialText || "");

  const handleSubmit = (e: any) => {
    const text = (e.target as any).value.trim();
    if (e.which === 13) {
      onSave(text);
      if (newTodo) {
        setText("");
      }
    }
  };

  const handleChange = (e: any) => {
    setText(e.target.value);
  };

  const handleBlur = (e: any) => {
    if (!newTodo) {
      onSave(e.target.value);
    }
  };

  return (
    <input
      className={classnames({
        edit: editing,
        "new-todo": newTodo
      })}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onBlur={handleBlur}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
}
