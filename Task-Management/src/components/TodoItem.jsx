import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";

function TodoItem({ todo }) {
  const { deleteTodo, toggleComplete, editTodo, darkMode } = useTodoContext();

  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);
  const [editedDueDate, setEditedDueDate] = useState(todo.dueDate || "");
  const [editedPriority, setEditedPriority] = useState(todo.priority || "medium");
  const [editedCategory, setEditedCategory] = useState(todo.category || "personal");

  const handleSave = async () => {
    if (!editedText.trim()) return;

    await editTodo(todo._id, {
      text: editedText,
      dueDate: editedDueDate,
      priority: editedPriority,
      category: editedCategory,
    });

    setIsEditing(false);
  };

  return (
    <div
      className={`rounded-2xl p-4 border shadow-sm transition ${
        darkMode
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border outline-none ${
              darkMode
                ? "bg-gray-900 border-gray-700 text-white"
                : "bg-white border-gray-300 text-gray-900"
            }`}
          />

          <div className="grid md:grid-cols-3 gap-3">
            <input
              type="date"
              value={editedDueDate}
              onChange={(e) => setEditedDueDate(e.target.value)}
              className={`px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            />

            <select
              value={editedPriority}
              onChange={(e) => setEditedPriority(e.target.value)}
              className={`px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <select
              value={editedCategory}
              onChange={(e) => setEditedCategory(e.target.value)}
              className={`px-4 py-3 rounded-xl border outline-none ${
                darkMode
                  ? "bg-gray-900 border-gray-700 text-white"
                  : "bg-white border-gray-300 text-gray-900"
              }`}
            >
              <option value="work">Work</option>
              <option value="study">Study</option>
              <option value="personal">Personal</option>
              <option value="health">Health</option>
            </select>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl bg-gray-500 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h3
              className={`text-lg font-semibold ${
                todo.completed ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.text}
            </h3>

            <div
              className={`text-sm mt-1 flex flex-wrap gap-3 ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              <span>📅 {todo.dueDate || "No due date"}</span>
              <span>⚡ {todo.priority}</span>
              <span>🏷 {todo.category}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => toggleComplete(todo._id)}
              className={`px-4 py-2 rounded-xl text-white ${
                todo.completed
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {todo.completed ? "Undo" : "Complete"}
            </button>

            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
            >
              Edit
            </button>

            <button
              onClick={() => deleteTodo(todo._id)}
              className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoItem;