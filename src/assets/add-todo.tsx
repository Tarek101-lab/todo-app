import React from "react";

function AddTodo({ addTodo }: { addTodo: (todo: any) => void }) {
  const [content, setContent] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const [priority, setPriority] = React.useState<'high' | 'medium' | 'low'>('medium');

  const handleSubmit = () => {
    if (!content || !dueDate) return;

    addTodo({
      content,
      dueDate,
      priority,
    });

    setContent("");
    setDueDate("");
    setPriority("medium");
  };

  return (
    <div className="add-todo-container">

      <input
        type="text"
        placeholder="Todo content"
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

      <button onClick={handleSubmit} className="add-todo">
        ➕ Add Todo
      </button>

    </div>
  );
}

export default AddTodo;