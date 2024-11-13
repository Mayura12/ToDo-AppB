import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoApp from "./TodoApp";

describe("TodoApp Component", () => {
    test("renders ToDo App header", () => {
        render(<TodoApp />);
        expect(screen.getByText("ToDo App")).toBeInTheDocument();
    });

    test("adds a task when 'Add Task' button is clicked", () => {
        render(<TodoApp />);
        fireEvent.click(screen.getByText("Add Task"));
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    test("clears all tasks when 'Clear All' button is clicked", () => {
        render(<TodoApp />);
        fireEvent.click(screen.getByText("Add Task"));
        fireEvent.click(screen.getByText("Clear All"));
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
});
