# File: /order-service/Dockerfile

# --- Stage 1: Build the application ---

# Use an official Node.js runtime as a parent image. We choose a specific version for consistency.
FROM node:18-alpine AS builder

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files first.
# This is a Docker optimization. If these files don't change, Docker can reuse cached layers, making future builds faster.
COPY package*.json ./

# Install the application's dependencies
RUN npm install

# Copy the rest of your application's source code into the container
COPY . .


# --- Stage 2: Create the final, smaller production image ---

# Start from a clean, lightweight Node.js image again.
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy the installed dependencies from the 'builder' stage
COPY --from=builder /app/node_modules ./node_modules

# Copy the application source code from the 'builder' stage
COPY --from=builder /app .

# The application will run on port 3001 inside the container.
# We will map this to a port on our local machine when we run it.
EXPOSE 3001

# Define the command to run your application
# This is the same as your "npm start" script.
CMD [ "node", "src/app.js" ]
