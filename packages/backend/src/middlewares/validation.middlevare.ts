import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../error/custom.error';

export const vallidator =
  <T extends Joi.ObjectSchema>(schema: T) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      next(new CustomError(400, `Error field: ${error.message}`));
    }
    next();
  };
