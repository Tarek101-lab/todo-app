function Todo({
  todo,
  toggleComplete,
  deleteTodo,
  editTodo
}: {
  todo: any,
  toggleComplete: (id: number) => void,
  deleteTodo: (id: number) => void,
  editTodo: (id: number, updatedData: { content: string; dueDate: string; priority: 'high' | 'medium' | 'low' }) => void
}) {

  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };
    const handleEditTodo = () => {
    const updatedContent = prompt("Edit todo content:", todo.content);
    const updatedDueDate = prompt("Edit due date (YYYY-MM-DD):", todo.dueDate);
    const updatedPriority = prompt("Edit priority (high, medium, low):", todo.priority);
    if (updatedContent && updatedDueDate && updatedPriority) {
        editTodo(todo.id, {
            content: updatedContent,
            dueDate: updatedDueDate,
            priority: updatedPriority as 'high' | 'medium' | 'low'
        });
    }
};
  return (
    <div className='todo-item'>

      <div className="checkbox" onClick={handleToggleComplete}>
        {todo.completed ? "✔️" : ""}
      </div>

      <div className="content">
        {todo.content}
      </div>

      <div className="due">
        ⏱️ {new Date(todo.dueDate).toDateString()}
      </div>

      <i className="edit" onClick={handleEditTodo}>
        🖊️
      </i>

      <div className={`priority-${todo.priority}`}></div>

      <button onClick={handleDeleteTodo} className="delete-button">Delete</button>

    </div>
  );
}

export default Todo;
