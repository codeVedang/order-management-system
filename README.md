# Full-Stack Order Management System

This is a complete, full-stack application for managing customer orders, built with a modern tech stack including React, Node.js, and various AWS services. It features a CI/CD pipeline for automated deployments, JWT authentication for security, and real-time notifications.

## Project Status

* **Backend:** 100% Complete and Deployed on AWS Elastic Beanstalk.
* **Frontend:** 100% Complete and ready to run locally.
* **CI/CD:** 100% Complete for the backend service.
* **Docker:** 100% Complete. The backend service is fully containerized.

## Live Backend API

The backend service is live and running on AWS. All frontend interactions will communicate with this live endpoint.

* **API URL:** `http://OrderManagementSystem-env.eba-cqzipdwb.ap-south-1.elasticbeanstalk.com`

---

## Project Showcase

Here are some screenshots of the live application.

### 1. Secure User Authentication (Login Page)

Users must register and log in to access the application. All API routes for managing orders are protected by JWT.

<img width="1919" height="967" alt="Login Page" src="https://github.com/user-attachments/assets/7ae240ce-fbdf-4116-ae85-302ce8e9c9be" />

### 2. Order Creation

A clean and simple form allows users to create new orders and upload PDF invoices directly to AWS S3.

<img width="1916" height="1027" alt="Create Order Page" src="https://github.com/user-attachments/assets/a5813f64-3bf3-46b5-9424-583a70ba8cf0" />

### 3. Main Dashboard (Analytics & Order Table)

The main dashboard provides an at-a-glance view of business metrics and a detailed list of all orders.

* **Sales Analytics Chart (Bonus Task):** A bar chart visualizes the total sales amount for each day.
* **Order Table:** A responsive table displays all order details, with links to view individual orders and download invoices.

<img width="1546" height="970" alt="Dashboard" src="https://github.com/user-attachments/assets/0c8e4408-9277-4e95-a928-a9903c171fc3" />

---

## How to Run and Test This Project

### **Prerequisites**

* Node.js v18+
* Git
* Docker Desktop (must be running to test the backend locally)

### **Method 1: Run Frontend Locally (Recommended for Testing)**

This is the easiest way to test the full application. It will connect to the live backend running on AWS.

**1. Clone the repository:**

```bash
git clone [https://github.com/codeVedang/order-management-system.git](https://github.com/codeVedang/order-management-system.git)
cd order-management-system
2. Install and Run the Frontend:

=

# Navigate to the frontend directory
cd order-ui

# Install all necessary packages
npm install

# Start the local development server
npm run dev
The application will automatically open in your browser at http://localhost:5173.
```
Method 2: Run Backend Locally with Docker

If you wish to run the backend service on your own machine, you can use the provided Docker container.

**1. Setup Environment File:**
```bash
Navigate to the /order-service directory.

Create a .env file and populate it with your AWS credentials and resource names.

2. Build and Run the Docker Container:

Bash

# Navigate to the backend directory
cd order-service

# Build the Docker image
docker build -t order-service-app .

# Run the Docker container
docker run -p 3001:3001 --env-file ./.env order-service-app
The backend server will now be running on http://localhost:3001.
```

##Features Implemented
Secure User Authentication: Full Register/Login system using JWT.

Order Management: Create, view, and list customer orders.

Direct File Upload: PDF invoices are streamed directly to AWS S3.

Real-time Notifications: Email alerts on new orders via AWS SNS.

Containerization (Mandatory): The backend application is fully containerized with Docker.

Data Logging (Bonus): All created orders are automatically logged as JSON files in S3.

Sales Analytics (Bonus): The dashboard features a chart visualizing daily sales totals.

Fully Documented API: Interactive API documentation is available via Swagger UI at the live backend URL + /api-docs.

Automated CI/CD: The backend is automatically deployed to AWS on every push to the main branch using GitHub Actions.

##Tech Stack
Frontend: React.js, Vite, Tailwind CSS, Axios, Chart.js

Backend: Node.js, Express.js

Database: AWS DynamoDB

File Storage: AWS S3

Notifications: AWS SNS

Authentication: JSON Web Tokens (JWT)

Containerization: Docker

CI/CD: GitHub Actions

Deployment: AWS Elastic Beanstalk
