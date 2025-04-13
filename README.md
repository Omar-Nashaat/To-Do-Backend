# Todo List Application Backend

A RESTful API backend for the Todo List application built with Node.js, Express, and MongoDB.

## Features

### Todo List Management
- Create, read, update, and delete todo lists
- Track completion percentage for each list
- Support for multiple lists per user

### Task Management
- Create, read, update, and delete tasks within lists
- Mark tasks as complete/incomplete
- Task reordering support
- Bulk operations support

### Authentication
- User registration and login
- JWT-based authentication
- Secure password hashing

### API Features
- RESTful endpoints
- Error handling and validation
- Proper HTTP status codes
- JSON responses

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login user

### Todo Lists
- GET `/api/todos` - Get all todo lists
- GET `/api/todos/:id` - Get a specific todo list
- POST `/api/todos` - Create a new todo list
- PUT `/api/todos/:id` - Update a todo list
- DELETE `/api/todos/:id` - Delete a todo list

### Tasks
- GET `/api/todos/:id/tasks` - Get all tasks in a list
- POST `/api/todos/:id/tasks` - Add a new task
- PUT `/api/todos/:id/tasks/:taskId` - Update a task
- DELETE `/api/todos/:id/tasks/:taskId` - Delete a task
- PUT `/api/todos/:id/reorder` - Reorder tasks in a list
- PATCH `/api/todos/:id/complete` - Toggle a task completion

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- TypeScript
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Project Structure
```
src/
├── config/                # Configuration files
│   └── db.ts             # Database connection setup
├── controllers/          # Route controllers
│   ├── authController.ts # Authentication logic
│   └── todoController.ts # Todo & tasks logic
├── interfaces/          # TypeScript interfaces
│   ├── ITask.ts        # Task interface
│   ├── ITodoList.ts    # Todo list interface
│   ├── IUser.ts        # User model interface
│   └── IUserPayload.ts # JWT payload interface
├── middleware/         # Custom middleware
│   └── authMiddleware.ts # JWT authentication
├── models/            # Mongoose models
│   ├── TodoList.ts    # Todo list schema
│   └── User.ts        # User schema
├── routes/            # API routes
│   ├── auth.ts        # Auth endpoints
│   └── todos.ts       # Todo endpoints
├── types/             # Type definitions
│   └── express/       # Express type extensions
└── server.ts          # Main application entry
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables in `.env`:
```
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Working exmaple (my credentials):
```
MONGODB_URI=mongodb+srv://omar:nashaat9090@cluster0.ma0j9ny.mongodb.net/todo-app?retryWrites=true&w=majority
JWT_SECRET=a0f1e2d3c4b5a6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3
PORT=5000

```

3. Compile the TypeScript files:
```bash
npx tsc
```

4. Start the development server:
```bash
node dist/server.js
```

## Error Handling
The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request
