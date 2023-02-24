import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import z, { string } from 'zod';

import { BadRequestError } from '../errors/bad-request-error';
import { asyncHandlerMiddleware } from '../middleware/async-handler';
import { User } from '../models/User';
import { parseParams } from '../utils/schema-utils';

import type { RequestHandler } from 'express';

export const login: RequestHandler = asyncHandlerMiddleware(async (req, res) => {
  const { userName, password } = req.query;

  parseParams(
    z.object({
      userName: z.string(),
      password: z.string(),
    }),
    req.query,
  );

  const user = await User.findOne({
    userName,
  });

  const isCorrectPassword = await bcrypt.compare(password as string, user?.password || '');

  if (!isCorrectPassword) {
    throw new BadRequestError('Incorrect password');
  }

  const token = jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.status(200).send({ message: 'user logged in', token });
});

export const signup: RequestHandler = asyncHandlerMiddleware(async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  parseParams(
    z.object({
      userName: z.string(),
      firstName: z.string(),
      lastName: string(),
      password: z.string(),
    }),
    req.body,
  );

  const oldUser = await User.findOne({
    userName,
  });

  if (oldUser) {
    throw new BadRequestError('Already used username');
  }

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    firstName,
    lastName,
    userName,
    password: hash,
  });

  const token = jwt.sign({ userName, password }, process.env.JWT_SECRET, {
    expiresIn: '2d',
  });

  res.status(200).send({ user });
});
