const express = require('express');
const userRoutes = require('./routes/userRoutes');
const app = express();
// Standard Middlewares
app.use(express.json()); // Parses incoming JSON requests
// Routes
app.use('/api/users', userRoutes);
// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong on the server!' });
});
module.exports = app;
