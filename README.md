# Job Application Portal

A robust MERN stack application designed for seamless job application and management. It provides essential tools for users to explore opportunities and for administrators to oversee job postings and applications efficiently.

## Features

### User Features
- **Job Listings:** Explore detailed job postings categorized by title, location, and availability.
- **Application Tracking:** Apply to jobs and monitor the status of applications in real time.
- **Duplicate Prevention:** Users cannot apply to the same job twice.

### Admin Features
- **Job Management:** Post, edit, and delete job listings with complete details (title, salary, location, etc.).
- **Application Oversight:** View and update the status of applications submitted to jobs created by the admin.
- **User Roles:** Manage user roles and assign admin privileges.

## Tech Stack
- **Frontend:** React, Material-UI
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **State Management:** Redux

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/naman-sethiya/Job-Application-Portal.git
```

### 2. Backend Setup
```bash
cd Backend
npm install
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm start
```

### 4. Environment Variables
Configure `.env` files for database connection and server secrets.

## 🎥 Demo Videos

### User Functionality
[![User Demo]()](https://youtu.be/sdesWLqpMLg)

### Admin Functionality
[![Admin Demo]()](https://youtu.be/DN2jhTMLQ_w)

## Folder Structure

### Backend
- **Routes:** Handles job and user APIs.
- **Models:** Defines schemas for users and jobs in MongoDB.
- **Middleware:** Handles authentication, authorization, and error management.
- **Controllers:** Implements the core logic for API requests.

### Frontend
- **Components:** Modular UI elements for reuse.
- **Pages:** Dedicated views for admin and user functionalities.
- **State Management:** Redux slices for managing application state.

## Key Highlights
- **Security:** Implements JWT authentication and role-based access control.
- **Efficiency:** Optimized database queries using Mongoose.
- **Scalability:** Modular codebase to support future feature additions.

