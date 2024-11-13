jest.mock('uuid', () => ({ v4: () => '123456789' }));


import { addTask, addSubTask, updateTask, deleteTask, toggleComplete, TaskType } from './Todo/TodoApp';

const sampleTask: TaskType = {
    id: "1",
    text: "Sample Task",
    completed: false,
    children: []
};

describe('Task Utilities', () => {
    test('addTask should add a new task', () => {
        const tasks: TaskType[] = [];
        const updatedTasks = addTask(tasks);
        expect(updatedTasks).toHaveLength(1);
        expect(updatedTasks[0]).toMatchObject({ id: '123456789', text: '', completed: false });
    });

    test('addSubTask should add a new sub-task to the specified task', () => {
        const tasks: TaskType[] = [sampleTask];
        const updatedTasks = addSubTask(tasks, '1');
        expect(updatedTasks[0].children).toHaveLength(1);
        expect(updatedTasks[0].children[0].id).toBe('123456789');
    });

    test('updateTask should update the task text', () => {
        const tasks: TaskType[] = [sampleTask];
        const updatedTasks = updateTask(tasks, "1", "Updated Task");
        expect(updatedTasks[0].text).toBe("Updated Task");
    });

    test('deleteTask should remove the task with the specified id', () => {
        const tasks: TaskType[] = [sampleTask];
        const updatedTasks = deleteTask(tasks, "1");
        expect(updatedTasks).toHaveLength(0);
    });

    test('toggleComplete should toggle the completed status of a task', () => {
        const tasks: TaskType[] = [sampleTask];
        const updatedTasks = toggleComplete(tasks, "1");
        expect(updatedTasks[0].completed).toBe(true);
    });
});
