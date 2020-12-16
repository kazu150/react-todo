import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (e) => {
    setTodoText(e.target.value);
  };

  const onClickAdd = () => {
    if (todoText === "") return;
    addItem(todoText, incompleteTodos, setIncompleteTodos);
    setTodoText("");
  };

  const deleteItem = (index, todos, setTodos) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const addItem = (newTodo, todos, setTodos) => {
    const newTodos = [...todos, newTodo];
    setTodos(newTodos);
  };

  const onClickComplete = (index) => {
    deleteItem(index, incompleteTodos, setIncompleteTodos);
    addItem(incompleteTodos[index], completeTodos, setCompleteTodos);
  };

  const onClickDelete = (index) => {
    deleteItem(index, incompleteTodos, setIncompleteTodos);
  };

  const onClickBack = (index) => {
    deleteItem(index, completeTodos, setCompleteTodos);
    addItem(completeTodos[index], incompleteTodos, setIncompleteTodos);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
        disabled={incompleteTodos.length >= 5}
      />
      {incompleteTodos.length >= 5 && (
        <p style={{ color: "red" }}>登録できるTodoは5個まで！</p>
      )}
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};
