import React, { useState } from "react";
import "./Task.css";

const Task = ({
  task,
  onAddSubTask,
  onUpdate,
  onDelete,
  onToggleComplete,
  level = 1,
  maxNestingLevel,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleToggleComplete = () => {
    if (task.text.trim() === "") {
      alert("Task cannot be marked complete if the description is empty.");
      return;
    }
    onToggleComplete(task.id);
  };

  return (
    <div
      className="task"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ paddingLeft: `${level * 20}px` }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={handleToggleComplete}
      />
      <input
        type="text"
        value={task.text}
        onChange={(e) => onUpdate(task.id, e.target.value)}
        className={task.completed ? "completed" : ""}
      />

      {/* Show the add sub-task button if within the allowed nesting level */}
      {isHovered && level < maxNestingLevel && (
        <button onClick={() => onAddSubTask(task.id)}>+ Sub-task</button>
      )}

      <button onClick={() => onDelete(task.id)} className="delete-btn">Delete</button>

      {task.children &&
        task.children.map((subTask) => (
          <Task
            key={subTask.id}
            task={subTask}
            onAddSubTask={onAddSubTask}
            onUpdate={onUpdate}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
            level={level + 1}
            maxNestingLevel={maxNestingLevel}
          />
        ))}
    </div>
  );
};

export default Task;