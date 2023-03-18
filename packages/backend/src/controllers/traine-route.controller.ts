import { Request } from 'express';
import { ITraineRoute } from '../types';
import TodoService from '../services/traine-route.service';

export class TrainRouteController {
  constructor(private todoService: TodoService) {}

  async allTrainRoute(
    req: Request<never, never, never, { day: string; search: string; limit: number; page: number }>
  ) {
    const { day, search, limit, page } = req.query;
    return this.todoService.findAllTrainRoute(day, search, limit, page);
  }

  async addTrainRoute(req: Request<never, never, ITraineRoute>) {
    return this.todoService.createTrainRoute(req.body);
  }

  async updateTrainRouteById(req: Request<{ id: string }, never, ITraineRoute>) {
    const { id } = req.params;
    return this.todoService.updateTrainRoute({ body: req.body, trainRouteId: id });
  }

  async deleteTrainRouteById(req: Request<{ id: string }>) {
    const { id } = req.params;
    return this.todoService.deleteTrainRoute(id);
  }
}

const trainRouteController = new TrainRouteController(new TodoService());
export default trainRouteController;
