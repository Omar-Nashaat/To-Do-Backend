// src/types/express/index.d.ts
import { IUserPayload } from '../../interfaces/IUserPayload';

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}
