import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Task from './Task';
import './TodoApp.css';

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [maxNestingLevel, setMaxNestingLevel] = useState(3); 

  const addTask = () => {
    const newTask = { id: uuidv4(), text: "", completed: false, children: [] };
    setTasks([...tasks, newTask]);
  };

  const addSubTask = (taskId) => {
    const addSubTaskRecursively = (tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          const newSubTask = { id: uuidv4(), text: "", completed: false, children: [] };
          return { ...task, children: [...(task.children || []), newSubTask] };
        } else if (task.children) {
          return { ...task, children: addSubTaskRecursively(task.children) };
        }
        return task;
      });

    setTasks(addSubTaskRecursively(tasks));
  };

  const updateTask = (taskId, newText) => {
    const updateTaskRecursively = (tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, text: newText };
        } else if (task.children) {
          return { ...task, children: updateTaskRecursively(task.children) };
        }
        return task;
      });

    setTasks(updateTaskRecursively(tasks));
  };

  const deleteTask = (taskId) => {
    const deleteTaskRecursively = (tasks) =>
      tasks.filter((task) => {
        if (task.id === taskId) return false;
        if (task.children) task.children = deleteTaskRecursively(task.children);
        return true;
      });

    setTasks(deleteTaskRecursively(tasks));
  };

  const toggleComplete = (taskId) => {
    const toggleCompleteRecursively = (tasks) =>
      tasks.map((task) => {
        if (task.id === taskId) {
          return { ...task, completed: !task.completed };
        } else if (task.children) {
          return { ...task, children: toggleCompleteRecursively(task.children) };
        }
        return task;
      });

    setTasks(toggleCompleteRecursively(tasks));
  };

  const clearAllTasks = () => setTasks([]);

  return (
    <div className="todo-app">
      <h1>ToDo App</h1>
      <button onClick={addTask}>Add Task</button>
      <button onClick={clearAllTasks} className="clear-button">Clear All</button>
      
      <div className="nesting-level-input">
        <label>Set Max Nesting Level: </label>
        <input
          type="number"
          value={maxNestingLevel}
          onChange={(e) => setMaxNestingLevel(parseInt(e.target.value) || 1)}
          min="1"
          max="10"
        />
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onAddSubTask={addSubTask}
            onUpdate={updateTask}
            onDelete={deleteTask}
            onToggleComplete={toggleComplete}
            maxNestingLevel={maxNestingLevel}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoApp;