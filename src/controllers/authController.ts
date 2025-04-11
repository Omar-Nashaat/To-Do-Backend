import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserPayload } from '../interfaces/IUserPayload';

// REGISTER A NEW USER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    user = new User({ name, email, password });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json({ msg: 'User Registered successfully', user: userResponse });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ msg: 'Email not registered' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: 'Incorrect password' });
      return;
    }

    const payload: { user: IUserPayload } = {
      user: { id: user.id, email: user.email },
    };

    const expiresIn = rememberMe ? '30d' : '1h';
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn });

    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    res.json({
      msg: 'Logged in successfully',
      token,
      user: userResponse,
      keepLoggedIn: rememberMe,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Server error';
    console.error('Login error:', errorMessage);
    res.status(500).json({ msg: 'Login failed. Please try again later.' });
  }
};
