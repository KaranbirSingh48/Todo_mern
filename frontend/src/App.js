import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch tasks from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  // Add a new task
  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const response = await axios.post('http://localhost:5001/api/todos', { title: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Delete a task
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Handle "Enter" key for adding tasks
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App" style={styles.container}>
      <h1 style={styles.heading}>📝 To-Do List</h1>

      {/* Add Task Input */}
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          onKeyPress={handleKeyPress} // Add support for "Enter" key
          placeholder="Add a new task"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>

      {/* Display Tasks */}
      <ul style={styles.todoList}>
        {todos.map((todo) => (
          <li key={todo._id} style={styles.todoItem}>
            <span style={styles.todoText}>{todo.title}</span>
            <button onClick={() => deleteTodo(todo._id)} style={styles.deleteButton}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '50px auto',
    fontFamily: 'Arial, sans-serif',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    borderRadius: '10px',
  },
  heading: {
    fontSize: '2em',
    color: '#333',
    marginBottom: '20px',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
  },
  input: {
    width: '70%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  addButton: {
    padding: '10px 15px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  addButtonHover: {
    backgroundColor: '#0056b3',
  },
  todoList: {
    listStyleType: 'none',
    padding: 0,
  },
  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  todoText: {
    fontSize: '16px',
    color: '#333',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default App;
