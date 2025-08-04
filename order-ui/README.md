# Full-Stack Order Management System

This is a complete, full-stack application for managing customer orders, built with a modern tech stack including React, Node.js, and various AWS services. It features a CI/CD pipeline for automated deployments, JWT authentication for security, and real-time notifications.

## Project Status

* **Backend:** 100% Complete and Deployed on AWS Elastic Beanstalk.
* **Frontend:** 100% Complete and ready to run locally.
* **CI/CD:** 100% Complete for the backend service.

## Live Backend API

The backend service is live and running on AWS. All frontend interactions will communicate with this live endpoint.

* **API URL:** `http://OrderManagementSystem-env.eba-cqzipdwb.ap-south-1.elasticbeanstalk.com`

## How to Run and Test This Project

The best way to test the full application is to run the frontend on your local machine, which will connect to the live backend.

### **Prerequisites**

* Node.js v18+
* Git

### **Step-by-Step Instructions**

**1. Clone the repository:**

```bash
git clone [https://github.com/your-username/order-management-system.git](https://github.com/your-username/order-management-system.git)
cd order-management-system
(Note: Please replace your-username with your actual GitHub username in the link above.)

2. Install and Run the Frontend:

Bash

# Navigate to the frontend directory
cd order-ui

# Install all necessary packages
npm install

# Start the local development server
npm run dev
The application will automatically open in your browser at http://localhost:5173 (or a similar port). You can now register a new user, log in, and create orders. All data will be processed by the live AWS backend.

# Features Implemented
Secure User Authentication: Full Register/Login system using JWT to protect all API endpoints.

Order Management: Create, view, and list customer orders.

Direct File Upload: PDF invoices are streamed directly to AWS S3.

Real-time Notifications: Email alerts on new orders via AWS SNS.

Data Logging (Bonus): All created orders are automatically logged as JSON files in S3 for backup and analysis.

Sales Analytics (Bonus): The dashboard features a chart visualizing daily sales totals.

Fully Documented API: Interactive API documentation is available via Swagger UI at the live backend URL + /api-docs.

Automated CI/CD: The backend is automatically deployed to AWS on every push to the main branch using GitHub Actions.

# Tech Stack
Frontend: React.js, Vite, Tailwind CSS, Axios, Chart.js

Backend: Node.js, Express.js

Database: AWS DynamoDB

File Storage: AWS S3

Notifications: AWS SNS

Authentication: JSON Web Tokens (JWT)

CI/CD: GitHub Actions

Deployment: AWS Elastic Beanstalk