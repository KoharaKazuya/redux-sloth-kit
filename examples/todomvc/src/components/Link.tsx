import classnames from "classnames";
import React from "react";

type Props = {
  active: boolean;
  setFilter: () => void;
  children: React.ReactNode;
};

export default function Link({ active, setFilter, children }: Props) {
  return (
    <a
      className={classnames({ selected: active })}
      style={{ cursor: "pointer" }}
      onClick={() => setFilter()}
    >
      {children}
    </a>
  );
}
