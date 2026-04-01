import React from "react";
import { useTodoContext } from "../context/TodoContext";

function SearchBar() {
  const { searchTerm, setSearchTerm, darkMode } = useTodoContext();

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Search tasks by text, category, priority..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border outline-none ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400"
            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
        }`}
      />
    </div>
  );
}

export default SearchBar;