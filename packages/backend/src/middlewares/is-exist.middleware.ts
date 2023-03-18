import { Request, Response, NextFunction } from 'express';
import { Model, isValidObjectId } from 'mongoose';
import { CustomError } from '../error/custom.error';

export class IsExist {
  check =
    <T>(model: Model<T>) =>
    async (req: Request<never, never, { id: string }>, res: Response, next: NextFunction) => {
      const { id } = req.params;
      const valid = isValidObjectId(id);
      if (!valid) {
        next(new CustomError(400, 'Invalid Id'));
      } else {
        const exist = await model.findOne({ _id: id });
        if (!exist) {
          next(new CustomError(404, 'Not found'));
        }
      }
      next();
    };
}

const isExist = new IsExist();
export default isExist;
