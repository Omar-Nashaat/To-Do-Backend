import { Document, Types } from 'mongoose';
import { ITask } from './ITask';

export interface ITodoList extends Document {
  title: string;
  user: Types.ObjectId;
  tasks: Types.DocumentArray<ITask>; // to support .id()
}
