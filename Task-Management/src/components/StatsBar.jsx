import React from "react";
import { useTodoContext } from "../context/TodoContext";

function StatsBar() {
  const { totalTodos, completedTodos, activeTodos, progress, darkMode } = useTodoContext();

  return (
    <div className="mb-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className={`rounded-2xl p-4 shadow ${darkMode ? "bg-gray-800" : "bg-blue-100"}`}>
          <p className="text-sm opacity-80">Total Tasks</p>
          <h2 className="text-2xl font-bold">{totalTodos}</h2>
        </div>

        <div className={`rounded-2xl p-4 shadow ${darkMode ? "bg-gray-800" : "bg-green-100"}`}>
          <p className="text-sm opacity-80">Completed</p>
          <h2 className="text-2xl font-bold">{completedTodos}</h2>
        </div>

        <div className={`rounded-2xl p-4 shadow ${darkMode ? "bg-gray-800" : "bg-yellow-100"}`}>
          <p className="text-sm opacity-80">Active</p>
          <h2 className="text-2xl font-bold">{activeTodos}</h2>
        </div>
      </div>

      <div className={`rounded-2xl p-4 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <div className="flex items-center justify-between mb-2">
          <p className="font-medium">Progress</p>
          <span className="text-sm font-semibold">{progress}%</span>
        </div>
        <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default StatsBar;