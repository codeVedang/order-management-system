// File: /order-service/src/app.js

// Load environment variables from .env file at the very beginning
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const setupSwagger = require('../swagger');
const ordersRouter = require('./api/orders');
const authRouter = require('./api/auth'); // For the bonus task
const errorHandler = require('./middleware/errorHandler');

// Create the Express application
const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- Swagger API Documentation Setup ---
setupSwagger(app);

// --- API Routes ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Order Management Service is running.',
        docs: '/api-docs'
    });
});

// Use the routers for all routes starting with their respective paths
app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

// --- Central Error Handling ---
app.use(errorHandler);

// --- Start the Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});