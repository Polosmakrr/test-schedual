import { Application } from 'express';
import trainsRouter from './api/train.route';

class AppRouter {
  constructor(private app: Application) {}

  init() {
    this.app.get('/', (_req, res) => {
      res.send('API Running');
    });
    this.app.use('/api/trains', trainsRouter);
  }
}

export default AppRouter;
