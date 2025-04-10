import mongoose, { Schema } from 'mongoose';
import { IUser } from '../interfaces/IUser';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
});

const User = mongoose.model<IUser>('User', UserSchema);

export default User;