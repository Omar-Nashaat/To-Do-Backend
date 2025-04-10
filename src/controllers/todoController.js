"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = exports.getTodoLists = exports.createTodoList = void 0;
const TodoList_1 = __importDefault(require("../models/TodoList"));
const createTodoList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title } = req.body;
    try {
        const newTodoList = new TodoList_1.default({
            title,
            user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id, // Now that we extended Request, this should work
            tasks: [],
        });
        yield newTodoList.save();
        res.json(newTodoList);
    }
    catch (err) { // Explicitly typing the error as 'any'
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.createTodoList = createTodoList;
// Similarly update the rest of your catch blocks
const getTodoLists = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const todoLists = yield TodoList_1.default.find({ user: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        res.json(todoLists);
    }
    catch (err) { // Explicitly typing the error as 'any'
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.getTodoLists = getTodoLists;
const addTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { todoListId } = req.params;
    const { text } = req.body;
    try {
        const todoList = yield TodoList_1.default.findById(todoListId);
        if (!todoList) {
            res.status(404).json({ msg: 'To-Do list not found' });
            return;
        }
        const newTask = { text, completed: false };
        todoList.tasks.push(newTask);
        yield todoList.save();
        res.json(todoList);
    }
    catch (err) { // Explicitly typing the error as 'any'
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
exports.addTask = addTask;
