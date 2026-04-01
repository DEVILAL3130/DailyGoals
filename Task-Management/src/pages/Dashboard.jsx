import React, { useEffect } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import StatsBar from "../components/StatsBar";
import BulkActions from "../components/BulkActions";
import { useTodoContext } from "../context/TodoContext";
import { useAuthContext } from "../context/AuthContext";

function Dashboard() {
  const { darkMode, setDarkMode, fetchTodos } = useTodoContext();
  const { user, logout } = useAuthContext();

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gradient-to-br from-blue-50 to-purple-100 text-gray-900"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div
          className={`rounded-3xl shadow-2xl p-6 md:p-8 border ${
            darkMode
              ? "bg-gray-900 border-gray-800"
              : "bg-white/80 backdrop-blur-md border-white/40"
          }`}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Premium Todo App
              </h1>

              <p
                className={`mt-2 text-sm md:text-base ${
                  darkMode ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Welcome back, <span className="font-semibold">{user?.name}</span>
              </p>

              <p
                className={`text-xs md:text-sm ${
                  darkMode ? "text-gray-500" : "text-gray-500"
                }`}
              >
                {user?.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`px-4 py-2 rounded-xl font-medium transition ${
                  darkMode
                    ? "bg-yellow-400 text-black hover:bg-yellow-300"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
              >
                {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
              </button>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-xl font-medium transition bg-red-600 text-white hover:bg-red-700"
              >
                Logout
              </button>
            </div>
          </div>

          <StatsBar />
          <TodoForm />
          <SearchBar />
          <FilterBar />
          <BulkActions />
          <TodoList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
