const Todo = require('../models/Todo');

// Get all tasks
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new task
const createTodo = async (req, res) => {
  const { title } = req.body;

  try {
    const newTodo = await Todo.create({ title });
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a task (mark as completed/uncompleted)
const updateTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true } // Returns the updated document
    );
    if (!updatedTodo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a task
const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getTodos, createTodo, updateTodo, deleteTodo };
