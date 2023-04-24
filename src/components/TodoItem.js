import React, { useState } from 'react';
import axios from 'axios';
import './TodoItem.css' ;

const TodoItem = ({ todo, todos, setTodos }) => {
  const [editMode, setEditMode] = useState(false);
  const [editInput, setEditInput] = useState(todo.title);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleCompleted = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/todos/${id}`, {
        completed: !todo.completed,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, completed: response.data.completed } : todo
        )
      );
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


  const handleEdit = (id) =>{
    setEditMode(true)
}

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:4000/api/todos/${id}`, 
      {
        title: editInput,
      });
      setTodos(
        todos.map((todo) =>
          todo._id === id ? { ...todo, title: response.data.title } : todo
        )
      );
      setEditMode(false);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };


 
  
  return (
    <div className="todo-item">
      {!editMode ? (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => handleToggleCompleted(todo._id)}
          />
          <p>{todo.title}</p>
          <button onClick={() => handleEdit(todo._id)}>Edit</button>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editInput}
            onChange={(e) => setEditInput(e.target.value)}
          />
          <button onClick={() => handleUpdate(todo._id)}>Save</button>
          <button onClick={() => setEditMode(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default TodoItem;

