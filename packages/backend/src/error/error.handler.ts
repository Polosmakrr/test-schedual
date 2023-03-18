import { Request, Response, NextFunction } from 'express';
import { CustomError } from './custom.error';

export const errorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.status && error.message) {
    res.status(error.status).json({ message: error.message });
  }
  if (error.message.includes('duplicate key')) {
    res.status(400).json({ message: 'Dublicate title Error' });
  }
  if (error.message) {
    res.json({ message: error.message });
  }
  res.status(500).json({
    message: 'Something went wrong'
  });
  next();
};
