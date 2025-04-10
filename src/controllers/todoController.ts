import { Request, Response } from 'express';
import TodoList from '../models/TodoList';

// CREATE TODO LIST
export const createTodoList = async (req: Request, res: Response): Promise<void> => {
  const { title } = req.body;

  try {
    const newTodoList = new TodoList({
      title,
      user: req.user?.id,
      tasks: [],
    });

    await newTodoList.save();
    res.json({ msg: 'List Created Successfully', newTodoList });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
};

// GET ALL TODO LISTS
export const getTodoLists = async (req: Request, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ msg: 'User not authenticated' });
      return;
    }

    const todoLists = await TodoList.find({ user: req.user.id });

    const todoListsWithPercentage = todoLists.map(todoList => {
      const totalTasks = todoList.tasks.length;
      const completedTasks = todoList.tasks.filter(task => task.completed).length;
      const completionPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

      return { ...todoList.toObject(), completionPercentage };
    });

    res.json({ msg: 'Lists returned successfully', NoOfLists: todoListsWithPercentage.length, Lists: todoListsWithPercentage });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
};

// ADD TASK TO TODO LIST
export const addTask = async (req: Request, res: Response): Promise<void> => {
  const { todoListId } = req.params;
  const { text } = req.body;

  try {
    const todoList = await TodoList.findById(todoListId);
    if (!todoList) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    const newTask = {
      text,
      completed: false
    };

    todoList.tasks.push(newTask);
    await todoList.save();
    res.json({ msg: 'Task added successfully', todoList });
    return;
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
    return;
  }
};

// REORDER TASKS IN TODO LIST
export const reorderTasks = async (req: Request, res: Response): Promise<void> => {
  const { todoListId } = req.params;
  const { taskIds } = req.body as { taskIds: string[] };

  try {
    const todoList = await TodoList.findById(todoListId);
    if (!todoList) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    // Create a new tasks array with the correct order
    const reorderedTasks = [];
    for (const id of taskIds) {
      const task = todoList.tasks.find(t => t && t._id && t._id.toString() === id);
      if (task) {
        reorderedTasks.push(task);
      }
    }

    // Use set to update the tasks array
    todoList.set('tasks', reorderedTasks);
    await todoList.save();

    res.json({ msg: 'Tasks reordered successfully', todoList });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
    console.error(errorMessage);
    res.status(500).send('Server Error');
  }
};

// UPDATE TODO LIST TITLE
export const updateTodoList = async (req: Request, res: Response): Promise<void> => {
  const { todoListId } = req.params;
  const { title } = req.body;

  try {
    const updatedList = await TodoList.findByIdAndUpdate(
      todoListId,
      { title },
      { new: true }
    );

    if (!updatedList) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    res.json({ msg: 'List updated successfully', updatedList });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE TODO LIST
export const deleteTodoList = async (req: Request, res: Response): Promise<void> => {
  const { todoListId } = req.params;

  try {
    const deleted = await TodoList.findByIdAndDelete(todoListId);

    if (!deleted) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    res.json({ msg: 'List deleted successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET ONE TODO LIST
export const getOneTodoList = async (req: Request, res: Response): Promise<void> => {
  const { todoListId } = req.params;

  try {
    const list = await TodoList.findById(todoListId);

    if (!list) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    res.json({ msg: 'List retrieved successfully', list });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// UPDATE TASK
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  const { todoListId, taskId } = req.params;
  const { text } = req.body;

  try {
    const list = await TodoList.findById(todoListId);
    if (!list) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    const task = list.tasks.id(taskId);
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    task.text = text;
    await list.save();

    res.json({ msg: 'Task updated successfully', task });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// DELETE TASK
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  const { todoListId, taskId } = req.params;

  try {
    const list = await TodoList.findById(todoListId);
    if (!list) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    const task = list.tasks.id(taskId);
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    task.deleteOne();
    await list.save();

    res.json({ msg: 'Task deleted successfully' });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// GET ONE TASK
export const getOneTask = async (req: Request, res: Response): Promise<void> => {
  const { todoListId, taskId } = req.params;

  try {
    const list = await TodoList.findById(todoListId);
    if (!list) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    const task = list.tasks.id(taskId);
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    res.json({ msg: 'Task retrieved successfully', task });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// complete task
export const completeTask = async (req: Request, res: Response): Promise<void> => {
  const { todoListId, taskId } = req.params;

  try {
    const list = await TodoList.findById(todoListId);
    if (!list) {
      res.status(404).json({ msg: 'To-Do list not found' });
      return;
    }

    const task = list.tasks.id(taskId);
    if (!task) {
      res.status(404).json({ msg: 'Task not found' });
      return;
    }

    task.completed = true;
    await list.save();

    res.json({ msg: 'Task marked as completed', task });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error(message);
    res.status(500).json({ msg: 'Server error' });
  }
};

