// File: /order-service/src/app.js

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const ordersRouter = require('./api/orders');
const authRouter = require('./api/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// --- Middleware ---
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- THIS IS THE DEFINITIVE FIX ---
// Only load and set up Swagger if we are NOT in the production environment.
// Elastic Beanstalk automatically sets the NODE_ENV variable to 'production'.
if (process.env.NODE_ENV !== 'production') {
  console.log('Development environment detected, setting up Swagger...');
  // Use a reliable path to find swagger.js for local development
  const setupSwagger = require(path.join(__dirname, '../swagger'));
  setupSwagger(app);
}

// --- API Routes ---
app.get('/', (req, res) => {
    res.status(200).json({ 
        message: 'Order Management Service is running.'
    });
});

app.use('/auth', authRouter);
app.use('/orders', ordersRouter);

// --- Central Error Handling ---
app.use(errorHandler);

// --- Start the Server ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
