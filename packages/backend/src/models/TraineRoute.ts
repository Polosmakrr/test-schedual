import { model, Schema } from 'mongoose';
import { ITraineRoute } from '../types/train-route.type';

const traineRouteSchema: Schema = new Schema({
  trainNumber: {
    type: String,
    required: true
  },
  departurePoint: {
    type: String,
    required: true
  },
  destination: {
    type: String,
    required: true
  },
  day: {
    type: String,
    required: true
  },
  arrivalTime: {
    type: String,
    required: true
  },
  departureTime: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const TraineRoute = model<ITraineRoute>('TraineRoute', traineRouteSchema);

export default TraineRoute;
