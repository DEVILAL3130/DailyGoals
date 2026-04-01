import React from "react";
import { useTodoContext } from "../context/TodoContext";

function BulkActions() {
  const { clearCompleted, deleteAllTodos, darkMode } = useTodoContext();

  return (
    <div className="flex flex-wrap gap-3 mb-6">
      <button
        onClick={clearCompleted}
        className="px-5 py-2 rounded-xl bg-green-600 text-white font-medium hover:bg-green-700 transition"
      >
        Clear Completed
      </button>

      <button
        onClick={deleteAllTodos}
        className="px-5 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
      >
        Delete All
      </button>
    </div>
  );
}

export default BulkActions;