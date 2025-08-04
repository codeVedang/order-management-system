// File: /src/api/orders.js

const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const orderController = require('../controllers/orderController');
const upload = require('../services/fileUploadService');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * @swagger
 * tags:
 * name: Orders
 * description: Order management
 */

/**
 * @swagger
 * /orders:
 * post:
 * summary: Create a new order
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * requestBody:
 * required: true
 * content:
 * multipart/form-data:
 * schema:
 * type: object
 * required:
 * - customerName
 * - orderAmount
 * - invoiceFile
 * properties:
 * customerName:
 * type: string
 * orderAmount:
 * type: number
 * format: double
 * invoiceFile:
 * type: string
 * format: binary
 * description: The invoice PDF file to upload.
 * responses:
 * 201:
 * description: Order created successfully
 * 400:
 * description: Bad request (e.g., missing fields, invalid file type)
 * 401:
 * description: Unauthorized
 */
router.post(
    '/',
    // authMiddleware, // Temporarily commented out for easy testing
    upload.single('invoiceFile'),
    [
      body('customerName').notEmpty().withMessage('Customer name is required'),
      body('orderAmount').isFloat({ gt: 0 }).withMessage('Order amount must be a positive number')
    ],
    orderController.createOrder
);

/**
 * @swagger
 * /orders:
 * get:
 * summary: Retrieve a list of all orders
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: A list of orders
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Order'
 * 401:
 * description: Unauthorized
 */
router.get('/', /* authMiddleware, */ orderController.getAllOrders);
// In src/api/orders.js
router.post(
    '/',
    authMiddleware,
    upload.single('invoiceFile'),
    [
      body('customerName').notEmpty().withMessage('Customer name is required'),
      body('orderAmount').isFloat({ gt: 0 }).withMessage('Order amount must be a positive number')
    ],
    orderController.createOrder
);
router.get('/', authMiddleware, orderController.getAllOrders);
router.get('/:id', authMiddleware, orderController.getOrderById);


/**
 * @swagger
 * /orders/{id}:
 * get:
 * summary: Retrieve a single order by ID
 * tags: [Orders]
 * security:
 * - bearerAuth: []
 * parameters:
 * - in: path
 * name: id
 * required: true
 * schema:
 * type: string
 * description: The order ID
 * responses:
 * 200:
 * description: Order details
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Order'
 * 404:
 * description: Order not found
 * 401:
 * description: Unauthorized
 */
router.get('/:id', /* authMiddleware, */ orderController.getOrderById);

/**
 * @swagger
 * components:
 * schemas:
 * Order:
 * type: object
 * properties:
 * orderId:
 * type: string
 * format: uuid
 * customerName:
 * type: string
 * orderAmount:
 * type: number
 * format: double
 * orderDate:
 * type: string
 * format: date-time
 * invoiceFileUrl:
 * type: string
 * format: uri
 */

module.exports = router;