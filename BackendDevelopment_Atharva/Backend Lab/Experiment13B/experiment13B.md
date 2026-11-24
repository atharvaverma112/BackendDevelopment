# Experiment 13B – User Authentication and Todo List

## Overview

This experiment extends the user authentication system by introducing JWT-based authentication and Todo List management using Express.js and MongoDB.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Mongoose
- bcryptjs
- JSON Web Token (JWT)
- dotenv

## Project Structure

- `config/db.js` – Database connection.
- `middleware/auth.js` – Authentication middleware.
- `models/User.js` – User model.
- `models/Todo.js` – Todo model.
- `routes/auth.js` – Authentication routes.
- `routes/todos.js` – Todo routes.
- `server.js` – Main application server.
- `.env` – Environment configuration.

## Key Features

1. User registration and login.
2. Password hashing using bcryptjs.
3. JWT-based authentication.
4. Protected Todo routes.
5. Todo creation, retrieval, updating and deletion (CRUD).

## Learning Outcomes

- Implement JWT authentication.
- Understand password hashing.
- Create protected API routes.
- Perform CRUD operations using MongoDB.
- Organize Express applications using models, routes and middleware.

## Conclusion

This experiment combines user authentication with Todo List management, demonstrating protected backend APIs using Express.js, Mongoose and JWT.