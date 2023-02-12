import { z } from 'zod';

import { parseParams } from '../utils/schema-utils';

import type { RequestHandler } from 'express';

const database = {
  1: ['a', 'b', 'c'],
  2: ['d', 'e', 'f'],
  3: ['g', 'h', 'i'],
};

export const getAllProducts: RequestHandler = async (req, res) => {
  const { params } = req;
  const { id } = params;

  parseParams(
    z.object({
      id: z.string(),
    }),
    params,
  );

  res.status(200).json({ products: database[id] });
};
