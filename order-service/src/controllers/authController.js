// File: /order-service/src/controllers/authController.js
const { dynamoDb } = require('../config/aws');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

const USERS_TABLE = 'Users'; // We'll need to create this new table

exports.register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = {
            userId: uuidv4(),
            email,
            password: hashedPassword,
        };

        await dynamoDb.put({ TableName: USERS_TABLE, Item: newUser }).promise();
        res.status(201).json({ message: 'User registered successfully.' });
    } catch (error) {
        // Handle case where user already exists, etc.
        next(error);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await dynamoDb.get({ TableName: USERS_TABLE, Key: { email } }).promise();
        const user = result.Item;

        if (!user) {
            return res.status(401).json({ message: 'Authentication failed. User not found.' });
        }

        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            return res.status(401).json({ message: 'Authentication failed. Invalid password.' });
        }

        const token = jwt.sign(
            { email: user.email, userId: user.userId },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({ token, userId: user.userId });
    } catch (error) {
        next(error);
    }
};