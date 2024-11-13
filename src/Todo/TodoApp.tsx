import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Task from "./Task";
import "./TodoApp.css";

export interface TaskType {
  id: string;
  text: string;
  completed: boolean;
  children: TaskType[];
}

// Utility functions for task management
export const addTask = (tasks: TaskType[]): TaskType[] => {
  const newTask: TaskType = { id: uuidv4(), text: "", completed: false, children: [] };
  return [...tasks, newTask];
};

export const addSubTask = (tasks: TaskType[], taskId: string): TaskType[] => {
  const addSubTaskRecursively = (tasks: TaskType[]): TaskType[] =>
    tasks.map((task) => {
      if (task.id === taskId) {
        const newSubTask: TaskType = { id: uuidv4(), text: "", completed: false, children: [] };
        return { ...task, children: [...task.children, newSubTask] };
      } else if (task.children) {
        return { ...task, children: addSubTaskRecursively(task.children) };
      }
      return task;
    });

  return addSubTaskRecursively(tasks);
};

export const updateTask = (tasks: TaskType[], taskId: string, newText: string): TaskType[] => {
  const updateTaskRecursively = (tasks: TaskType[]): TaskType[] =>
    tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, text: newText };
      } else if (task.children) {
        return { ...task, children: updateTaskRecursively(task.children) };
      }
      return task;
    });

  return updateTaskRecursively(tasks);
};

export const deleteTask = (tasks: TaskType[], taskId: string): TaskType[] => {
  const deleteTaskRecursively = (tasks: TaskType[]): TaskType[] =>
    tasks.filter((task) => {
      if (task.id === taskId) return false;
      if (task.children) task.children = deleteTaskRecursively(task.children);
      return true;
    });

  return deleteTaskRecursively(tasks);
};

export const toggleComplete = (tasks: TaskType[], taskId: string): TaskType[] => {
  const toggleCompleteRecursively = (tasks: TaskType[]): TaskType[] =>
    tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, completed: !task.completed };
      } else if (task.children) {
        return { ...task, children: toggleCompleteRecursively(task.children) };
      }
      return task;
    });

  return toggleCompleteRecursively(tasks);
};

const TodoApp: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [maxNestingLevel, setMaxNestingLevel] = useState<number>(3);

  const handleAddTask = () => setTasks(addTask(tasks));
  const handleAddSubTask = (taskId: string) => setTasks(addSubTask(tasks, taskId));
  const handleUpdateTask = (taskId: string, newText: string) => setTasks(updateTask(tasks, taskId, newText));
  const handleDeleteTask = (taskId: string) => setTasks(deleteTask(tasks, taskId));
  const handleToggleComplete = (taskId: string) => setTasks(toggleComplete(tasks, taskId));
  const handleClearAllTasks = () => setTasks([]);

  return (
    <div className="todo-app">
      <h1>ToDo App</h1>
      <button onClick={handleAddTask}>Add Task</button>
      <button onClick={handleClearAllTasks} className="clear-button">
        Clear All
      </button>

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
          <div key={task.id}>
            <Task
              task={task}
              onAddSubTask={handleAddSubTask}
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              onToggleComplete={handleToggleComplete}
              maxNestingLevel={maxNestingLevel}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
