const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const healthRoutes = require('./routes/health');
const productsRoutes = require('./routes/products');

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Logging in non-test environments
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

// Routes
app.use('/health', healthRoutes);
app.use('/api/products', productsRoutes);

// Root route
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'node-app',
    version: '1.0.0',
    description: 'DevOps Express REST API',
    endpoints: ['/health', '/api/products']
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl
  });
});

// Centralized error handler
app.use((err, req, res, _next) => {
  console.error('Unhandled Server Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

module.exports = app;
