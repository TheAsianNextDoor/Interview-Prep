import { BadRequestError } from '../errors/bad-request-error';

import type { ZodSchema } from 'zod';

export const parseParams = (schema: ZodSchema, data: unknown, message = 'Bad params') => {
  try {
    schema.parse(data);
  } catch (err) {
    throw new BadRequestError(message);
  }
};
