// File: /order-service/src/services/orderService.js

const { v4: uuidv4 } = require('uuid');
const { dynamoDb, s3, sns } = require('../config/aws');

const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME;
const SNS_TOPIC_ARN = process.env.SNS_TOPIC_ARN;

/**
 * Creates a new order, saves it to DynamoDB, logs it to S3, and publishes an SNS notification.
 */
exports.createOrder = async (orderData) => {
    const { customerName, orderAmount, invoiceFileUrl } = orderData;
    
    const timestamp = new Date().toISOString();
    // This line generates the unique ID. It was likely missing or incorrect.
    const orderId = uuidv4();

    // This is the object we will save. It MUST include the orderId.
    const order = {
        orderId: orderId,
        customerName: customerName,
        orderAmount: parseFloat(orderAmount),
        orderDate: timestamp,
        invoiceFileUrl: invoiceFileUrl,
    };

    // 1. Store the order data in DynamoDB
    const dynamoParams = {
        TableName: TABLE_NAME,
        Item: order,
    };
    await dynamoDb.put(dynamoParams).promise();
    console.log(`Order ${orderId} saved to DynamoDB.`);

    // 2. Save a JSON log file to S3 (Bonus Task)
    const logData = JSON.stringify(order, null, 2);
    const logParams = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: `logs/${new Date().toISOString().split('T')[0]}/${order.orderId}.json`,
        Body: logData,
        ContentType: 'application/json'
    };
    await s3.putObject(logParams).promise();
    console.log(`JSON log for order ${order.orderId} saved to S3.`);

    // 3. Publish a notification to the SNS topic
    const snsMessage = {
        Subject: `New Order Created: ${order.orderId}`,
        Message: `A new order has been successfully created.\n\nOrder Details:\n- Order ID: ${order.orderId}\n- Customer: ${order.customerName}\n- Amount: $${order.orderAmount.toFixed(2)}\n- Invoice URL: ${order.invoiceFileUrl}`,
    };
    const snsParams = {
        Message: JSON.stringify(snsMessage, null, 2),
        TopicArn: SNS_TOPIC_ARN,
    };
    await sns.publish(snsParams).promise();
    console.log(`Notification for order ${orderId} published to SNS.`);

    return order;
};

/**
 * Fetches all orders from DynamoDB.
 */
exports.getAllOrders = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const result = await dynamoDb.scan(params).promise();
    return result.Items;
};

/**
 * Fetches a single order by its ID from DynamoDB.
 */
exports.getOrderById = async (orderId) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            orderId: orderId,
        },
    };
    const result = await dynamoDb.get(params).promise();
    return result.Item;
};