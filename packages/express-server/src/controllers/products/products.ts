import { z } from 'zod';

import { parseParams } from '../../utils/schema-utils';

import type { RequestHandler } from 'express';
import { asyncHandlerMiddleware } from '../../middleware/async-handler';

const database = {
  1: ['a', 'b', 'c'],
  2: ['d', 'e', 'f'],
  3: ['g', 'h', 'i'],
} as Record<string, string[]>;

export const getById: RequestHandler = asyncHandlerMiddleware(async (req, res) => {
  const { id } = parseParams(
    z.object({
      id: z.string(),
    }),
    req.params,
  );

  res.status(200).json({ products: database[id] });
});

export const getProductIdsWithItem: RequestHandler = asyncHandlerMiddleware(async (req, res) => {
  const { item } = parseParams(
    z.object({
      item: z.string(),
    }),
    req.params,
  );

  const productIds = Object.entries(database).reduce<string[]>((acc, [key, val]) => {
    if (val.includes(item)) {
      acc.push(key);
    }

    return acc;
  }, []);

  res.status(200).json({ productIds });
});
