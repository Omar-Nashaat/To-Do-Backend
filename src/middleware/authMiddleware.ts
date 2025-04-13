import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  // Get token from Authorization header
  const authHeader = req.header('Authorization');
  
  // Check if Authorization header exists and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ msg: 'No token, authorization denied' });
    return;
  }

  try {
    // Extract token from Bearer string
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as jwt.JwtPayload;
    req.user = { 
      id: decoded.user.id, 
      email: decoded.user.email, 
      name: decoded.user.name, 
      rememberMe: decoded.user.rememberMe 
    };
    next();
  } catch (err: any) {
    console.error('Token verification error:', err.message);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

export default authMiddleware;
