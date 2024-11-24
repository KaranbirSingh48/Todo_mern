const express = require('express');
const {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
} = require('../controllers/todoController');

const router = express.Router();

router.get('/', getTodos); // Get all tasks
router.post('/', createTodo); // Create a new task
router.put('/:id', updateTodo); // Update a task
router.delete('/:id', deleteTodo); // Delete a task

module.exports = router;
