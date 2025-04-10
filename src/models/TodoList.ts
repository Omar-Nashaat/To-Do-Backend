import mongoose, { Schema } from 'mongoose';
import { ITodoList } from '../interfaces/ITodoList';

const TaskSchema: Schema = new Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoListSchema: Schema = new Schema({
  title: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  tasks: [TaskSchema],
});

const TodoList = mongoose.model<ITodoList>('TodoList', TodoListSchema);

export default TodoList;