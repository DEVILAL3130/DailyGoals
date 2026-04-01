import React from "react";
import { useTodoContext } from "../context/TodoContext";

function FilterBar() {
  const { filter, setFilter, sortBy, setSortBy, darkMode } = useTodoContext();

  const filters = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => (
          <button
            key={item.value}
            onClick={() => setFilter(item.value)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              filter === item.value
                ? "bg-blue-600 text-white"
                : darkMode
                ? "bg-gray-800 text-gray-300 hover:bg-gray-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className={`px-4 py-2 rounded-xl border outline-none ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="az">A-Z</option>
        <option value="za">Z-A</option>
        <option value="priority">Priority</option>
      </select>
    </div>
  );
}

export default FilterBar;