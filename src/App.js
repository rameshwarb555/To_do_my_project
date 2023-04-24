import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";
import axios from "axios";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/todos/getalltodos");
        setTodos(response.data);
      } catch (error) {
        console.error("Error fetching todos", error);
      }
    };
    fetchTodos();
  }, []);


  
  return (
    <div className="App">
      <h2>Daily To Do List</h2>
      <AddTodo setTodos={setTodos} todos={todos}/>
      <TodoList
        todos={todos}
        setTodos={setTodos}
      />
    </div>
  );
};

export default App;
