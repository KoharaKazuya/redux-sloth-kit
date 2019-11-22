import React from "react";
import HeaderComponent from "../components/Header";
import useActions from "../hooks/useActions";

export default function Header() {
  const actions = useActions();
  return <HeaderComponent {...actions} />;
}
