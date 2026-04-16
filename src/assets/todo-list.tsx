import Todo from "./todo";
import React from "react";

function TodoList({
  todos,
  toggleComplete,
  deleteTodo,
  editTodo,
}: {
  todos: any[];
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, updatedData: { content: string; dueDate: string; priority: 'high' | 'medium' | 'low' }) => void;
}) {
  const [filter, setFilter] = React.useState<
    "today" | "all" | "overdue" | "completed"
  >("all");

  const today = new Date();

  const filteredTodos = todos.filter((todo) => {
    const dueDate = new Date(todo.dueDate);

    if (filter === "today") {
      return dueDate.toDateString() === today.toDateString();
    } else if (filter === "overdue") {
      return dueDate < today && !todo.completed;
    } else if (filter === "completed") {
      return todo.completed;
    }

    return true; // all
  });
  return (
    <div className="todo">
      <div className="todo-filter">
        <button
          className="filter-button today"
          onClick={() => setFilter("today")}
        >
          Today
        </button>
        <button className="filter-button all" onClick={() => setFilter("all")}>
          All
        </button>
        <button
          className="filter-button overdue"
          onClick={() => setFilter("overdue")}
        >
          Overdue
        </button>
        <button
          className="filter-button completed"
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>
      <div className="todo-content">
        <h1 className="task-title">Tasks</h1>
      </div>
      {filteredTodos.length === 0 ? (
        <p className="empty">No tasks yet</p>
      ) : (
        filteredTodos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={toggleComplete}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))
      )}
    </div>
  );
}
export default TodoList;
