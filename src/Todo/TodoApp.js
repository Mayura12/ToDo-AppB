import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';  

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTask = { id: uuidv4(), text: "", completed: false };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (taskId, newText) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    ));
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const toggleComplete = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div>
      <h1>ToDo App</h1>
      <button onClick={addTask}>Add Task</button>
      <div className="task-list">
        {tasks.map(task => (
          <div key={task.id} className="task">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
            />
            <input
              type="text"
              value={task.text}
              onChange={(e) => updateTask(task.id, e.target.value)}
            />
            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;