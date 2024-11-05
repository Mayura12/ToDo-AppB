import React, { useState } from "react";
import "./Task.css";

const Task = ({
  task,
  onAddSubTask,
  onUpdate,
  onDelete,
  onToggleComplete,
  level = 1,
}) => {
  const [isHovered, setIsHovered] = useState(false);

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
        onChange={() => onToggleComplete(task.id)}
      />
      <input
        type="text"
        value={task.text}
        onChange={(e) => onUpdate(task.id, e.target.value)}
        className={task.completed ? "completed" : ""}
      />
      {isHovered && level < 3 && (
        <button onClick={() => onAddSubTask(task.id)}>+ Sub-task</button>
      )}
      <button onClick={() => onDelete(task.id)}>Delete</button>

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
          />
        ))}
    </div>
  );
};

export default Task;
