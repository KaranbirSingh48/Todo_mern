const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample route
app.get('/', (req, res) => res.send('Backend is Running.........'));

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


const todoRoutes = require('./routes/todoRoutes');

// Use To-Do routes
app.use('/api/todos', todoRoutes);
