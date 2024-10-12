Backend for AcademiaForms

This is the backend service for the AcademiaForms project, a platform to help class teachers manage student details, create dynamic polls and forms, and track students' adherence to guidelines. The backend is built with Node.js, Express, and uses MongoDB for the database.
Table of Contents

    Features
    Requirements
    Installation
    Environment Variables
    API Endpoints
    Contributing
    License

Features

    User authentication and authorization (JWT-based).
    Dynamic form and poll creation.
    Student profile management.
    Integration with LeetCode and CodeChef for tracking student progress.
    API for monitoring student adherence to guidelines.

Requirements

Before running this project, ensure you have the following installed:

    Node.js (version 14.x or higher)
    MongoDB (running locally or a MongoDB Atlas connection string)
    npm or yarn (for managing dependencies)

Installation

    Clone the repository:

bash

git clone https://github.com/MohamedHamdanA/AcademiaForms-backend.git
cd AcademiaForms-backend

    Install dependencies:

bash

npm install

    Set up the environment variables. See Environment Variables below.

    Start the server:

bash

npm start

This will start the server on http://localhost:5000.
Run in Development Mode

For development, you can use nodemon for auto-restarting the server on changes:

bash

npm run dev

Environment Variables

Create a .env file in the root of your project and add the following environment variables:

makefile

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key

Ensure to replace your_mongodb_connection_string and your_jwt_secret_key with your actual MongoDB connection URI and a secret key for JWT.
API Endpoints

Here is a basic outline of the available API endpoints:
Auth

    POST /api/auth/register - Register a new user (teacher).
    POST /api/auth/login - Login with email and password, returns JWT token.

Students

    GET /api/students - Fetch all students.
    POST /api/students - Add a new student.
    GET /api/students/:id - Get a single student by ID.
    PUT /api/students/:id - Update a student's details.
    DELETE /api/students/:id - Delete a student.

Forms and Polls

    POST /api/forms - Create a new form or poll.
    GET /api/forms - Get all forms/polls.
    POST /api/forms/:id/submit - Submit a response to a form/poll.

Integration

    GET /api/integrations/leetcode/:username - Fetch a student's LeetCode profile.
    GET /api/integrations/codechef/:username - Fetch a student's CodeChef profile.

Contributing

Contributions are welcome! Please follow these steps:

    Fork the repository.
    Create a new feature branch (git checkout -b feature-branch).
    Commit your changes (git commit -m 'Add some feature').
    Push to the branch (git push origin feature-branch).
    Create a Pull Request.

License

This project is licensed under the MIT License.
