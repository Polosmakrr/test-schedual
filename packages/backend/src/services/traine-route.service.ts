import { ITraineRoute } from '../types/train-route.type';
import TraineRoute from '../models/TraineRoute';

export default class TraineRouteService {
  async findAllTrainRoute(
    day: string,
    search: string,
    limit: number,
    page: number
  ): Promise<{ trainSchedual: ITraineRoute[]; totalPages: number; page: number }> {
    const trainSchedual = await TraineRoute.find({
      day: { $regex: `^${day}` },
      departurePoint: { $regex: `^(?i)${search}` }
    })
      .sort({
        day: 1,
        arrivalTime: 1
      })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const pages =
      (await TraineRoute.find({
        day: { $regex: `^${day}` },
        departurePoint: { $regex: `^(?i)${search}` }
      }).count()) / limit;

    const totalPages = Math.ceil(pages);

    return { trainSchedual, totalPages, page };
  }

  async createTrainRoute(body: ITraineRoute): Promise<ITraineRoute> {
    const newTrainRoute = new TraineRoute({
      ...body
    });
    return newTrainRoute.save();
  }

  async updateTrainRoute({
    body,
    trainRouteId
  }: {
    body: ITraineRoute;
    trainRouteId: string;
  }): Promise<ITraineRoute | null> {
    return TraineRoute.findOneAndUpdate({ _id: trainRouteId }, body, { new: true });
  }

  async deleteTrainRoute(id: string): Promise<ITraineRoute | null> {
    return TraineRoute.findOneAndRemove({ _id: id });
  }
}
