import React from "react";
import TodoItem from "./TodoItem";
import { useTodoContext } from "../context/TodoContext";

function TodoList() {
  const { filteredTodos, darkMode } = useTodoContext();

  if (filteredTodos.length === 0) {
    return (
      <div
        className={`mt-6 text-center py-10 rounded-2xl border ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-gray-400"
            : "bg-gray-50 border-gray-200 text-gray-500"
        }`}
      >
        No tasks found 🚀
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-4">
      {filteredTodos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;