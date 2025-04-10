import { Router } from 'express';
import authMiddleware from '../middleware/authMiddleware';
import {
    createTodoList,
    getTodoLists,
    deleteTodoList,
    getOneTodoList,
    updateTodoList,
    addTask,
    reorderTasks,
    deleteTask,
    getOneTask,
    updateTask,
    completeTask
} from '../controllers/todoController';

const router = Router();

// Create To-Do list
router.post('/', authMiddleware, createTodoList);

// Get all To-Do lists
router.get('/', authMiddleware, getTodoLists);

// Add a task to a To-Do list
router.post('/:todoListId/tasks', authMiddleware, addTask);

// Reorder tasks in a To-Do list
router.put("/:todoListId/reorder", authMiddleware, reorderTasks);

// Delete a To-Do list
router.delete('/:todoListId', authMiddleware, deleteTodoList);

// Get a specific To-Do list
router.get('/:todoListId', authMiddleware, getOneTodoList);

// Delete a task from a To-Do list
router.delete('/:todoListId/tasks/:taskId', authMiddleware, deleteTask);

// Update a To-Do list
router.put('/:todoListId', authMiddleware, updateTodoList);

// Update a task
router.put('/:todoListId/tasks/:taskId', authMiddleware, updateTask);

// Get a specific task
router.get('/:todoListId/tasks/:taskId', authMiddleware, getOneTask);

// complete task
router.patch('/:todoListId/tasks/:taskId/complete', authMiddleware, completeTask);

export default router;
