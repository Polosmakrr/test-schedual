import Joi from 'joi';

const errDay =
  'Invalid date in params. Valid format of date: YYYY-MM-DD ( YYYY - year, MM - month, DD - day ).';

const errTime = 'Invalid Time in params. Valid format of date: HH:MM (HH - hours, MM - minutes).';

/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 5 }] */
export const schemaAdd = Joi.object({
  trainNumber: Joi.string().min(2).max(10).trim().required(),
  departurePoint: Joi.string().min(2).max(20).trim().required(),
  destination: Joi.string().min(2).max(20).trim().required(),
  day: Joi.string()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, 'numbers')
    .message(errDay),
  arrivalTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/, 'numbers')
    .message(errTime),
  departureTime: Joi.string()
    .pattern(/^([01]\d|2[0-3]):[0-5]\d$/, 'numbers')
    .message(errTime)
});
