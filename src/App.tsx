import React, { useState, useEffect } from 'react';
import StateManager from './customStateManager/StateManager';
import './index.css'

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const todoManager = new StateManager<Todo[]>([]);

const TodoList = () => {
  const [newTodoText, setNewTodoText] = useState('');
  const [todos, setTodos] = useState(todoManager.getState());

  useEffect(() => {
    const listener = (newTodos: Todo[]) => {
      setTodos(newTodos);
    };
    todoManager.subscribe(listener);
    return () => {
      todoManager.unsubscribe(listener);
    };
  }, []);

  const handleAddTodo = () => {
    const newTodo: Todo = {
      id: Date.now(),
      text: newTodoText,
      completed: false,
    };
    const newTodos = [...todos, newTodo];
    todoManager.setState(newTodos);
    setNewTodoText('');
  };

  const handleToggleTodo = (id: number) => {
    const newTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    todoManager.setState(newTodos);
  };

  const handleDeleteTodo = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    todoManager.setState(newTodos);
  };

  return (
    <div className='container'>
      <h1>Todo List</h1>
      <div className='add-todo'>
        <input
          className='add-todo_input'
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
        />
        <button className='add-todo_button' onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className='todos-list'>
        {todos.map((todo) => (
          <li className={todo.completed ? 'completed-todo' : 'todo'} key={todo.id}>
            <input
              className='todo_checkbox'
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <p className='todo_text'>{todo.text}</p>
            <button className='todo_delete-button' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};

export default App;
