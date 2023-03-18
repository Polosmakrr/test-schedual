import { Router } from 'express';
import { errorHandler } from '../../error/error.handler';
import trainRouteController from '../../controllers/traine-route.controller';
import { asyncWrapper } from '../../middlewares/async.wrapper';
import { vallidator } from '../../middlewares/validation.middlevare';
import { schemaAdd } from '../../schema/validation.train-route';
import isExist from '../../middlewares/is-exist.middleware';
import { ITraineRoute } from '../../types';
import TraineRoute from '../../models/TraineRoute';

const trainsRouter: Router = Router();

trainsRouter.get('', asyncWrapper(trainRouteController.allTrainRoute.bind(trainRouteController)));

trainsRouter.post(
  '',
  vallidator(schemaAdd),
  asyncWrapper(trainRouteController.addTrainRoute.bind(trainRouteController))
);

trainsRouter.put(
  '/:id',
  isExist.check<ITraineRoute>(TraineRoute),
  vallidator(schemaAdd),
  asyncWrapper(trainRouteController.updateTrainRouteById.bind(trainRouteController))
);

trainsRouter.delete(
  '/:id',
  isExist.check<ITraineRoute>(TraineRoute),
  asyncWrapper(trainRouteController.deleteTrainRouteById.bind(trainRouteController))
);

trainsRouter.use(errorHandler);

export default trainsRouter;
