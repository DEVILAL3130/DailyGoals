import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

const TodoContext = createContext();

export function TodoProvider({ children }) {
  // ---------------------------
  // Core Todo State
  // ---------------------------
  const [todos, setTodos] = useState([]);

  // ---------------------------
  // UI State
  // ---------------------------
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [darkMode, setDarkMode] = useState(() => {
    return JSON.parse(localStorage.getItem("darkMode")) || false;
  });

  // ---------------------------
  // Persist Dark Mode
  // ---------------------------
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  // ---------------------------
  // Fetch Todos from Backend
  // ---------------------------
  const fetchTodos = async () => {
    try {
      const { data } = await API.get("/todos");
      setTodos(data);
    } catch (error) {
      console.error("Fetch todos error:", error);
    }
  };

  // ---------------------------
  // Add Todo
  // ---------------------------
  const addTodo = async ({ text, dueDate, priority, category }) => {
    if (!text.trim()) return;

    try {
      const { data } = await API.post("/todos", {
        text,
        dueDate,
        priority,
        category,
      });

      setTodos((prev) => [data, ...prev]);
      toast.success("Task added successfully");
    } catch (error) {
      console.error("Add todo error:", error);
      toast.error("Failed to add task");
    }
  };

  // ---------------------------
  // Delete Todo
  // ---------------------------
  const deleteTodo = async (id) => {
    try {
      await API.delete(`/todos/${id}`);
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
      toast.success("Task deleted");
    } catch (error) {
      console.error("Delete todo error:", error);
      toast.error("Failed to delete task");
    }
  };

  // ---------------------------
  // Toggle Complete
  // ---------------------------
  const toggleComplete = async (id) => {
    try {
      const currentTodo = todos.find((todo) => todo._id === id);
      if (!currentTodo) return;

      const { data } = await API.put(`/todos/${id}`, {
        completed: !currentTodo.completed,
      });

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? data : todo))
      );

      toast.success(data.completed ? "Task completed" : "Task marked active");
    } catch (error) {
      console.error("Toggle complete error:", error);
      toast.error("Failed to update task");
    }
  };

  // ---------------------------
  // Edit Todo
  // ---------------------------
  const editTodo = async (id, updates) => {
    try {
      const { data } = await API.put(`/todos/${id}`, updates);

      setTodos((prev) =>
        prev.map((todo) => (todo._id === id ? data : todo))
      );

      toast.success("Task updated");
    } catch (error) {
      console.error("Edit todo error:", error);
      toast.error("Failed to update task");
    }
  };

  // ---------------------------
  // Delete All Completed
  // ---------------------------
  const deleteCompleted = async () => {
    try {
      const completedTodos = todos.filter((todo) => todo.completed);

      await Promise.all(
        completedTodos.map((todo) => API.delete(`/todos/${todo._id}`))
      );

      setTodos((prev) => prev.filter((todo) => !todo.completed));
      toast.success("Completed tasks deleted");
    } catch (error) {
      console.error("Delete completed error:", error);
      toast.error("Failed to delete completed tasks");
    }
  };

  // ---------------------------
  // Mark All Complete / Incomplete
  // ---------------------------
  const markAllComplete = async () => {
    try {
      const updates = todos.map((todo) =>
        API.put(`/todos/${todo._id}`, { completed: true })
      );

      const results = await Promise.all(updates);
      setTodos(results.map((res) => res.data));
      toast.success("All tasks marked complete");
    } catch (error) {
      console.error("Mark all complete error:", error);
      toast.error("Failed to update all tasks");
    }
  };

  const markAllIncomplete = async () => {
    try {
      const updates = todos.map((todo) =>
        API.put(`/todos/${todo._id}`, { completed: false })
      );

      const results = await Promise.all(updates);
      setTodos(results.map((res) => res.data));
      toast.success("All tasks marked active");
    } catch (error) {
      console.error("Mark all incomplete error:", error);
      toast.error("Failed to update all tasks");
    }
  };

  // ---------------------------
  // Reorder Todos (Frontend only for now)
  // ---------------------------
  const reorderTodos = (newTodos) => {
    setTodos(newTodos);
  };

  // ---------------------------
  // Filtered + Searched Todos
  // ---------------------------

const filteredTodos = useMemo(() => {
  let result = [...todos];

  // 1) SEARCH
  if (searchTerm.trim()) {
    result = result.filter((todo) =>
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.priority.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // 2) FILTER
  if (filter === "completed") {
    result = result.filter((todo) => todo.completed);
  } else if (filter === "active") {
    result = result.filter((todo) => !todo.completed);
  } else if (filter === "high") {
    result = result.filter((todo) => todo.priority === "high");
  } else if (filter === "medium") {
    result = result.filter((todo) => todo.priority === "medium");
  } else if (filter === "low") {
    result = result.filter((todo) => todo.priority === "low");
  }

  // 3) SORT
  if (sortBy === "newest") {
    result.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  } else if (sortBy === "oldest") {
    result.sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateA - dateB;
    });
  } else if (sortBy === "az") {
    result.sort((a, b) => a.text.localeCompare(b.text));
  } else if (sortBy === "za") {
    result.sort((a, b) => b.text.localeCompare(a.text));
  } else if (sortBy === "priority") {
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    result.sort(
      (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
  }

  return result;
}, [todos, searchTerm, filter, sortBy]);

  // ---------------------------
  // Stats
  // ---------------------------
  const totalTodos = todos.length;
  const completedTodos = todos.filter((todo) => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const progress =
    totalTodos === 0 ? 0 : Math.round((completedTodos / totalTodos) * 100);

  // ---------------------------
  // Context Value
  // ---------------------------
  return (
    <TodoContext.Provider
      value={{
        // Raw state
        todos,
        setTodos,

        // UI state
        searchTerm,
        setSearchTerm,
        filter,
        setFilter,
        darkMode,
        setDarkMode,

        // Derived state
        filteredTodos,
        totalTodos,
        completedTodos,
        activeTodos,
        progress,

        // CRUD
        fetchTodos,
        addTodo,
        deleteTodo,
        toggleComplete,
        editTodo,

        // Bulk actions
        deleteCompleted,
        markAllComplete,
        markAllIncomplete,

        // DnD
        reorderTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodoContext() {
  return useContext(TodoContext);
}