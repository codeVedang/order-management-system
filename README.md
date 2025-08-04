# Full-Stack Order Management System

This is a complete, full-stack application for managing customer orders, built with a modern tech stack including React, Node.js, and various AWS services. It features a CI/CD pipeline for automated deployments, JWT authentication for security, and real-time notifications.

## Project Status

* **Backend:** 100% Complete and Deployed on AWS Elastic Beanstalk.
* **Frontend:** 100% Complete and ready to run locally.
* **CI/CD:** 100% Complete for the backend service.

## Live Backend API

The backend service is live and running on AWS. All frontend interactions will communicate with this live endpoint.

* **API URL:** `http://OrderManagementSystem-env.eba-cqzipdwb.ap-south-1.elasticbeanstalk.com`

---

## Project Showcase

Here are some screenshots of the live application.

### 1. Secure User Authentication (Login Page)

Users must register and log in to access the application. All API routes for managing orders are protected by JWT.

*(Your Login Page Screenshot Here)*
![Login Page]<img width="1919" height="967" alt="Screenshot 2025-08-04 093037" src="https://github.com/user-attachments/assets/7ae240ce-fbdf-4116-ae85-302ce8e9c9be" />

### 2. Order Creation

A clean and simple form allows users to create new orders and upload PDF invoices directly to AWS S3.

*(Your Create Order Page Screenshot Here)*
![Create Order Page]<img width="1916" height="1027" alt="Screenshot 2025-08-04 092920" src="https://github.com/user-attachments/assets/a5813f64-3bf3-46b5-9424-583a70ba8cf0" />

### 3. Main Dashboard (Analytics & Order Table)

The main dashboard provides an at-a-glance view of business metrics and a detailed list of all orders.

* **Sales Analytics Chart (Bonus Task):** A bar chart visualizes the total sales amount for each day.
* **Order Table:** A responsive table displays all order details, with links to view individual orders and download invoices.

*(Your Dashboard Screenshot Here)*
![Dashboard with Chart and Table]<img width="1546" height="970" alt="Screenshot 2025-08-04 093026" src="https://github.com/user-attachments/assets/0c8e4408-9277-4e95-a928-a9903c171fc3" />


---

## How to Run and Test This Project

The best way to test the full application is to run the frontend on your local machine, which will connect to the live backend.

### **Prerequisites**

* Node.js v18+
* Git

### **Step-by-Step Instructions**

**1. Clone the repository:**

```bash
git clone [https://github.com/codeVedang/order-management-system.git](https://github.com/codeVedang/order-management-system.git)
cd order-management-system

# Navigate to the frontend directory
cd order-ui

# Install all necessary packages
npm install

# Start the local development server
npm run dev
The application will automatically open in your browser at http://localhost:5173 (or a similar port). You can now register a new user, log in, and create orders.
```

Features Implemented
Secure User Authentication: Full Register/Login system using JWT.

Order Management: Create, view, and list customer orders.

Direct File Upload: PDF invoices are streamed directly to AWS S3.

Real-time Notifications: Email alerts on new orders via AWS SNS.

Data Logging (Bonus): All created orders are automatically logged as JSON files in S3.

Sales Analytics (Bonus): The dashboard features a chart visualizing daily sales totals.

Fully Documented API: Interactive API documentation is available via Swagger UI at the live backend URL + /api-docs.

Automated CI/CD: The backend is automatically deployed to AWS on every push to the main branch using GitHub Actions.

Tech Stack
Frontend: React.js, Vite, Tailwind CSS, Axios, Chart.js

Backend: Node.js, Express.js

Database: AWS DynamoDB

File Storage: AWS S3

Notifications: AWS SNS

Authentication: JSON Web Tokens (JWT)

CI/CD: GitHub Actions

Deployment: AWS Elastic Beanstalk
