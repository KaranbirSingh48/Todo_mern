const mongoose = require('mongoose');

const todoSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the task'],
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
