import { Document } from 'mongoose';

export interface ITask extends Document {
  text: string;
  completed: boolean;
}
