const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;

// Connect to DB
require('./Models/db');

// CORS middleware - allow requests from frontend
app.use(cors({
  origin: ['http://localhost:3000', 'https://student-management-2-fmq2.onrender.com/add-student'], // React default port - added both localhost and IP
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware to parse JSON
app.use(express.json());

// Import routes
const StudentRouter = require('./Routes/StudentRoutes');

// Test route
app.get('/', (req, res) => {
    res.send('Student API is running');
});

// Use student routes
app.use('/api/student', StudentRouter);

// Global error handler
app.use((err, req, res, next) => {
  console.error('Global error:', err.stack);
  res.status(500).json({
    error: 'Something went wrong on the server',
    message: err.message
  });
});

// Start server with graceful shutdown support
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
