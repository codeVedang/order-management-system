const orderService = require('../services/orderService');
const { validationResult } = require('express-validator');

exports.createOrder = async (req, res, next) => {
    // Validate request data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if a file was uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'Invoice PDF file is required.' });
    }

    try {
        const { customerName, orderAmount } = req.body;
        const invoiceFileUrl = req.file.location; // URL from multer-s3

        const orderData = { customerName, orderAmount, invoiceFileUrl };
        const newOrder = await orderService.createOrder(orderData);
        
        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        // Pass errors to the central error handler
        next(error);
    }
};

exports.getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

exports.getOrderById = async (req, res, next) => {
    try {
        const orderId = req.params.id;
        const order = await orderService.getOrderById(orderId);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        
        res.status(200).json(order);
    } catch (error) {
        next(error);
    }
};