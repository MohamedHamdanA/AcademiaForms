# AcademiaForms Backend Setup

This document outlines the steps to set up the backend for the AcademiaForms project.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (>= 14.x)
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js)
- [MongoDB](https://www.mongodb.com/try/download/community) (for local development)

## Installation Steps

Follow these steps to set up the backend environment:

1. **Clone the Repository**

   Clone the project repository to your local machine using the following command:

   ```bash
   git clone https://github.com/MohamedHamdanA/AcademiaForms.git
   ```
2. **Navigate to the Backend Directory**

   Change your current working directory to the backend folder:
   ```bash
   cd server
   ```
3. **Install Dependencies**
   Use npm to install the required packages:
   ```bash
   npm install
   ```
4. **Configure Environment Variables**
   Create a *.env* file in the root of the backend directory and set up your environment variables. Here is an example:
   ```.env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/academiaforms
   JWT_SECRET=your_jwt_secret
   ```
5. **Run the Server**
   Start the backend server with the following command:
   ```bash
   npm start
   ```
## Conclusion
You have successfully set up the backend for the AcademiaForms project. For further development, refer to the documentation provided in the repository.
   
