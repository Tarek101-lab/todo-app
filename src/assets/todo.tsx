import React from 'react';
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

  const [isEditing, setIsEditing] = React.useState(false);

  const [content, setContent] = React.useState(todo.content);
  const [dueDate, setDueDate] = React.useState(todo.dueDate);
  const [priority, setPriority] = React.useState(todo.priority);

  const handleToggleComplete = () => {
    toggleComplete(todo.id);
  };

  const handleDeleteTodo = () => {
    deleteTodo(todo.id);
  };

  const handleEditTodo = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    editTodo(todo.id, { content, dueDate, priority });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(todo.content);
    setDueDate(todo.dueDate);
    setPriority(todo.priority);
    setIsEditing(false);
  };

  return (
    <div className='todo-item'>

      <div className="checkbox" onClick={handleToggleComplete}>
        {todo.completed ? "✔️" : ""}
      </div>

      {isEditing ? (
        <>
          <input
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          <button onClick={handleSave} className='save-button'>
            Save
          </button>
          <button onClick={handleCancel} className='cancel-button'>
            Cancel
          </button>
        </>
      ) : (
        <>
          <div className="content">{todo.content}</div>

          <div className="due">
            ⏱️ {new Date(todo.dueDate).toDateString()}
          </div>

          <i className="edit" onClick={handleEditTodo}>
            🖊️
          </i>

          <div className={`priority-${todo.priority}`}></div>

          <button onClick={handleDeleteTodo} className="delete-button">
            Delete
          </button>
        </>
      )}

    </div>
  );
}

export default Todo;
