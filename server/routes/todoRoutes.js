const express = require("express");
const Todo = require("../models/TodoModel");
const router = express.Router();

// Get all todos
router.get("/getalltodos", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new todo
router.post("/createnewtodo", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed
  })
  try {
    const savedTodo = await todo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Update a todo
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.json(todo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Delete a todo
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);

    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
