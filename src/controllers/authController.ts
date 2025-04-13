import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { IUserPayload } from '../interfaces/IUserPayload';
import CryptoJS from 'crypto-js';

// This should match the key in your frontend
const ENCRYPTION_KEY = process.env.JWT_SECRET || 'a0f1e2d3c4b5a6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d3';

const decryptPassword = (encryptedPassword: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Invalid password format');
  }
};

// REGISTER A NEW USER
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password: encryptedPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      res.status(400).json({ msg: 'User already exists' });
      return;
    }

    // Decrypt the password received from frontend
    let decryptedPassword;
    try {
      decryptedPassword = decryptPassword(encryptedPassword);
    } catch (error) {
      res.status(400).json({ msg: 'Invalid password format' });
      return;
    }

    user = new User({ name, email, password: decryptedPassword });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(decryptedPassword, salt);

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
  const { email, password: encryptedPassword, rememberMe } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ msg: 'Email not registered' });
      return;
    }

    // Decrypt the password received from frontend
    let decryptedPassword;
    try {
      decryptedPassword = decryptPassword(encryptedPassword);
    } catch (error) {
      res.status(401).json({ msg: 'Invalid password format' });
      return;
    }

    const isMatch = await bcrypt.compare(decryptedPassword, user.password);
    if (!isMatch) {
      res.status(401).json({ msg: 'Incorrect password' });
      return;
    }

    const payload: { user: IUserPayload } = {
      user: { id: user.id, email: user.email, name: user.name, rememberMe: rememberMe },
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
