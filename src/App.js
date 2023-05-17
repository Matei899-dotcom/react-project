import "./styles.css";

import React from "react";
import { useState } from "react";

const todo1 = {
  value: "Spala Vase",
  completed: false
};

const todo2 = {
  value: "Mananca o budinca proteica",
  completed: true
};

const todo3 = {
  value: "Invata la mate",
  completed: false
};

const todos = [todo1, todo2, todo3];

export default function App() {
  return (
    <div className="App">
      <List todos={todos} />
    </div>
  );
}

function Form(props) {
  const [value, setValue] = useState("");

  const handleClick = (event) => {
    if (value !== "") {
      props.onItemClick(value);
      setValue("");
    }
  };

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div className="add-form">
      <input value={value} onChange={handleChange} />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

function List(props) {
  const [todos, setTodos] = useState(props.todos);

  const addItem = (item) => {
    setTodos((prev) => [...prev, { value: item, completed: false }]);
  };

  const removeItem = (removeIndex) => {
    setTodos((prev) => prev.filter((element, index) => index !== removeIndex));
  };

  return (
    <div className="list-wrapper">
      <div className="list">
        {todos.map((item, index) => (
          <Todo todo={item} onRemoveClick={() => removeItem(index)} />
        ))}
      </div>
      <Form onItemClick={addItem} />
    </div>
  );
}

function Todo(props) {
  const [completed, setCompleted] = useState(props.todo.completed);

  const color = completed ? "rgb(66, 102, 61)" : "rgb(102, 61, 61)";

  const completeTodo = () => setCompleted((prev) => !prev);

  return (
    <div className="todo" style={{ "background-color": color }}>
      <h3>{props.todo.value}</h3>
      <div className="todo-buttons">
        <button onClick={completeTodo}>Complete</button>
        <button onClick={props.onRemoveClick}>X</button>
      </div>
    </div>
  );
}
