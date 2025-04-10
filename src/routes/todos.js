"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = __importDefault(require("../middleware/authMiddleware"));
const todoController_1 = require("../controllers/todoController");
const router = (0, express_1.Router)();
// Create To-Do list
router.post('/', authMiddleware_1.default, todoController_1.createTodoList);
// Get all To-Do lists
router.get('/', authMiddleware_1.default, todoController_1.getTodoLists);
// Add a task to a To-Do list
router.post('/:todoListId/tasks', authMiddleware_1.default, todoController_1.addTask);
exports.default = router;
