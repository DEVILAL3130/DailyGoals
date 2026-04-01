import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

function TodoForm() {
  const { addTodo, darkMode } = useTodoContext();

  const [text, setText] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [category, setCategory] = useState("personal");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) return;

    await addTodo({
      text,
      dueDate,
      priority,
      category,
    });

    setText("");
    setDueDate("");
    setPriority("medium");
    setCategory("personal");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Enter your task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border outline-none ${
          darkMode
            ? "bg-gray-800 border-gray-700 text-white"
            : "bg-white border-gray-300 text-gray-900"
        }`}
      />

      <div className="grid md:grid-cols-3 gap-3">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className={`px-4 py-3 rounded-xl border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className={`px-4 py-3 rounded-xl border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`px-4 py-3 rounded-xl border outline-none ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white"
              : "bg-white border-gray-300 text-gray-900"
          }`}
        >
          <option value="work">Work</option>
          <option value="study">Study</option>
          <option value="personal">Personal</option>
          <option value="health">Health</option>
        </select>
      </div>

      <button
        type="submit"
        className="w-full md:w-auto px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 font-medium"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;