import { BadRequestError } from '../errors/bad-request-error';

import type { ZodSchema, ZodTypeAny, infer as zodInfer } from 'zod';

export const parseParams = <T extends ZodTypeAny>(schema: T, data: unknown, message = 'Bad params'): zodInfer<T> => {
  try {
    return schema.parse(data);
  } catch (err) {
    throw new BadRequestError(message);
  }
};

export const parseFactory =
  <T extends ZodTypeAny>(schema: T) =>
  (data: unknown): zodInfer<T> => {
    try {
      return schema.parse(data);
    } catch (err) {
      throw new BadRequestError();
    }
  };
