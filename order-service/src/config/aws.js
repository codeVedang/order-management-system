const AWS = require('aws-sdk');

// Load AWS credentials and region from .env file
AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
});

// Create instances of the AWS services to be used
const s3 = new AWS.S3();
const dynamoDb = new AWS.DynamoDB.DocumentClient(); // Use DocumentClient for easier JSON handling
const sns = new AWS.SNS();

console.log('AWS SDK configured successfully.');

// Export the instances for use in other parts of the application
module.exports = {
    s3,
    dynamoDb,
    sns
};