# To-Do App Backend (Node.js + Express + TypeScript + MongoDB)

A robust RESTful API backend for a Todo application built with Node.js, Express, TypeScript, and MongoDB.

## Features

- User authentication and authorization using JWT
- Full CRUD for to-do lists & tasks
- Secure password handling with bcrypt
- Progress percentage per list
- Task completion & reordering
- Extensible and clean TypeScript code
- MongoDB integration for data persistence
- CORS enabled for cross-origin requests
- Environment variables support for configuration

## Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- TypeScript knowledge

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000

   (Working example with my MongoDB connection string & JWT secret)
   MONGODB_URI=mongodb+srv://omar:nashaat9090@cluster0.ma0j9ny.mongodb.net/todo-app?retryWrites=true&w=majority
   JWT_SECRET=a0f1e2d3c4b5a6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3
   PORT=5000

   ```

## Scripts

- Build the TypeScript project:
  ```bash
  npx tsc
  ```
- Start the development server:
  ```bash
  node dist/server.js
  ```

## Project Structure

```
backend/
├── src/
  ├── config/
  ├── controllers/
  ├── interfaces/
  ├── middleware/
  ├── models/
  ├── routes/
  ├── types/
  └── server.ts
├── node_modules/       # Dependencies
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project metadata and dependencies
├── package-lock.json  # Dependency lock file
├── tsconfig.json      # TypeScript configuration
└── README.md         # Project documentation
```

## API Endpoints

### Auth Routes

- `POST /api/auth/register` - Register a new user

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

- `POST /api/auth/login` - Login and receive token
  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```
  Response:
  ```json
  {
    "token": "jwt_token_here",
    "userId": "user_id_here"
  }
  ```

### To-Do List Routes

- `GET /api/todos` - Get all lists for user

  - Headers: `token: <token>`

- `POST /api/todos` - Create new list

  - Headers: `token: <token>`

  ```json
  {
    "title": "My Todo List"
  }
  ```

- `GET /api/todos/:id` - Get a specific list

  - Headers: `token: <token>`

- `PUT /api/todos/:id` - Update list title

  - Headers: `token: <token>`

  ```json
  {
    "title": "Updated List Title"
  }
  ```

- `DELETE /api/todos/:id` - Delete a list
  - Headers: `token: <token>`

### Task Routes (per list)

- `POST /api/todos/:todoListId/tasks` - Add task

  - Headers: `token: <token>`

  ```json
  {
    "title": "Task Title"
  }
  ```

- `GET /api/todos/:todoListId/tasks/:taskId` - Get task

  - Headers: `token: <token>`

- `PUT /api/todos/:todoListId/tasks/:taskId` - Update task

  - Headers: `token: <token>`

  ```json
  {
    "title": "Updated Task Title"
  }
  ```

- `DELETE /api/todos/:todoListId/tasks/:taskId` - Delete task

  - Headers: `token: <token>`

- `PATCH /api/todos/:todoListId/tasks/:taskId/complete` - Mark task complete

  - Headers: `token: <token>`

- `PUT /api/todos/:todoListId/reorder` - Reorder task list
  - Headers: `token: <token>`
  ```json
  {
    "taskIds": ["taskId1", "taskId2", "taskId3"]
  }
  ```

## Middleware

- authMiddleware.ts: Verifies JWT and injects req.user

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT for authentication
- bcryptjs for password hashing
- CORS for cross-origin resource sharing

## Postman/Test

- You can use Postman or Thunder Client to test all routes
- Remember to attach Authorization header: token: <token> to protected routes

## Author

Omar Nashaat
