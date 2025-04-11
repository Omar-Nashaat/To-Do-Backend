import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.header('token');
  if (!token) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;  // This will ensure the middleware doesn't continue execution after sending the response
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    req.user = { id: decoded.user.id, email: decoded.user.email };
    next();  // Call next to continue to the next middleware
  } catch (err: any) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
