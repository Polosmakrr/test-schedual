import { HttpService } from '../../common/services/http.service';
import { APP_KEYS } from '../../common/consts';
import { ITraineRoute } from '../../common/types';

export class ScheduleService extends HttpService {
  async getAllTrainRoute(query: {
    day: string;
    search: string;
    limit: number;
    page: number;
  }): Promise<{ trainSchedual: ITraineRoute[]; page: number; totalPages: number }> {
    const { day, search, limit, page } = query;
    return this.get(
      `${APP_KEYS.BACKEND_KEYS.TRAINS}?day=${day}&search=${search}&limit=${limit}&page=${page}`
    );
  }

  createTrainRoute(trainRoute: ITraineRoute) {
    return this.post(APP_KEYS.BACKEND_KEYS.TRAINS, trainRoute);
  }

  updateTrainRouteById(trainRoute: ITraineRoute, id: string) {
    return this.put(`${APP_KEYS.BACKEND_KEYS.TRAINS}/${id}`, trainRoute);
  }

  deleteTrainRouteById(id: string) {
    return this.delete(`${APP_KEYS.BACKEND_KEYS.TRAINS}/${id}`);
  }
}

export const scheduleService = new ScheduleService();
