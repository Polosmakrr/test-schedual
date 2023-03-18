import * as yup from 'yup';

/* eslint newline-per-chained-call: ["error", { "ignoreChainWithDepth": 5 }] */
export const inputValidationSchema = yup.object({
  day: yup
    .string()
    .trim()
    .matches(/^\d{4}-\d{2}-\d{2}$/)
    .required(),
  trainNumber: yup.string().trim().min(2).required(),
  departurePoint: yup.string().trim().min(2).max(20).required(),
  destination: yup.string().trim().min(2).max(20).required(),
  arrivalTime: yup
    .string()
    .trim()
    .matches(/^\d{2}:\d{2}$/)
    .required(),
  departureTime: yup
    .string()
    .trim()
    .matches(/^\d{2}:\d{2}$/)
    .required()
});
