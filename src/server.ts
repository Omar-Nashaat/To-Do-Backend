import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
import todoRoutes from './routes/todos';

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'https://to-do-frontend-plum.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/todos', todoRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('MongoDB connected');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err: any) => console.log(err));
