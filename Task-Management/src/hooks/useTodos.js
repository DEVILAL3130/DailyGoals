import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(darkMode));
  }, [darkMode]);

  const addTodo = ({ text, dueDate, priority, category }) => {
    if (!text.trim()) return;

    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      dueDate: dueDate || "",
      priority: priority || "medium",
      category: category || "personal",
    };

    setTodos((prev) => [newTodo, ...prev]);
    toast.success("Task added");
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.success("Task deleted");
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
    toast.success("Task updated");
  };

  const editTodo = (id, updates) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
    toast.success("Task updated");
  };

  const clearCompleted = () => {
    const completedCount = todos.filter((t) => t.completed).length;
    if (completedCount === 0) return toast("No completed tasks to clear");
    setTodos((prev) => prev.filter((todo) => !todo.completed));
    toast.success("Completed tasks cleared");
  };

  const deleteAllTodos = () => {
    if (todos.length === 0) return toast("No tasks to delete");
    setTodos([]);
    toast.success("All tasks deleted");
  };

  const reorderTodos = (startIndex, endIndex) => {
    const updated = Array.from(todos);
    const [removed] = updated.splice(startIndex, 1);
    updated.splice(endIndex, 0, removed);
    setTodos(updated);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesFilter =
        filter === "all"
          ? true
          : filter === "active"
          ? !todo.completed
          : todo.completed;

      const matchesSearch = todo.text
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ? true : todo.category === categoryFilter;

      return matchesFilter && matchesSearch && matchesCategory;
    });
  }, [todos, filter, search, categoryFilter]);

  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const progress = totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  return {
    todos,
    filteredTodos,
    filter,
    setFilter,
    search,
    setSearch,
    categoryFilter,
    setCategoryFilter,
    darkMode,
    setDarkMode,
    addTodo,
    deleteTodo,
    toggleComplete,
    editTodo,
    clearCompleted,
    deleteAllTodos,
    reorderTodos,
    totalTodos,
    completedTodos,
    activeTodos,
    progress,
  };
}

export default useTodos;