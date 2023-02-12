import { CustomError } from '../errors/custom-error';

import type { ErrorRequestHandler } from 'express';

export const errorHandlerMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);

  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Something went wrong, please try again' });
};
