import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Task from "./Task";
import { TaskType } from "./TodoApp";

describe("Task Component", () => {
    const sampleTask: TaskType = {
        id: "1",
        text: "Sample Task",
        completed: false,
        children: [],
    };

    const setup = (props = {}) =>
        render(
            <Task
                task={sampleTask}
                onAddSubTask={jest.fn()}
                onUpdate={jest.fn()}
                onDelete={jest.fn()}
                onToggleComplete={jest.fn()}
                maxNestingLevel={3}
                {...props}
            />
        );

    test("renders task with checkbox and input field", () => {
        setup();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("calls onToggleComplete when checkbox is clicked", () => {
        const onToggleComplete = jest.fn();
        setup({ onToggleComplete });
        fireEvent.click(screen.getByRole("checkbox"));
        expect(onToggleComplete).toHaveBeenCalledWith("1");
    });

    test("calls onUpdate when text is changed", () => {
        const onUpdate = jest.fn();
        setup({ onUpdate });
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "New Task" } });
        expect(onUpdate).toHaveBeenCalledWith("1", "New Task");
    });

    test("shows add sub-task button on hover", () => {
        const { container } = setup();
        fireEvent.mouseEnter(container.firstChild as HTMLElement);
        expect(screen.getByText("+ Sub-task")).toBeInTheDocument();
    });
});
