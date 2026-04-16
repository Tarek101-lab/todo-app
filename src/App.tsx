import './App.css'
import AddTodo from './assets/add-todo';
import TodoList from './assets/todo-list'
import React, { useEffect } from 'react'

interface TodoItem {
    id: number;
    content: string;
    dueDate: string;
    priority: 'high' | 'medium' | 'low';
    completed: boolean;
}

function App() {
  const [todos, setTodos] = React.useState<TodoItem[]>(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const addTodo = (todo: Omit<TodoItem, 'id' | 'completed'>) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      content: todo.content,
      dueDate: todo.dueDate,
      priority: todo.priority,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const toggleComplete = (id: number) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  const editTodo = (id: number, updatedData: { content: string; dueDate: string; priority: 'high' | 'medium' | 'low' }) => {
  setTodos(todos.map(todo =>
    todo.id === id ? { ...todo, ...updatedData } : todo
  ));
  console.log(todos);
  };
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
    <div className='title'>
      Todo App
    </div>
    <AddTodo addTodo={addTodo} />
    <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo} editTodo={editTodo} />

    </>
  )
}

export default App
