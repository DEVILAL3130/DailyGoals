import Todo from "../models/Todo.js";

// @desc Get all todos of logged-in user
// @route GET /api/todos
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Create new todo
// @route POST /api/todos
export const createTodo = async (req, res) => {
  try {
    const { text, dueDate, priority, category } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const todo = await Todo.create({
      user: req.user._id,
      text,
      dueDate,
      priority,
      category,
    });

    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update todo
// @route PUT /api/todos/:id
export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete todo
// @route DELETE /api/todos/:id
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    if (todo.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await todo.deleteOne();

    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};