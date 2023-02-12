import jwt from 'jsonwebtoken';

import { UnauthenticatedError } from '../errors/unauthenticated-error';

import type { RequestHandler } from 'express';
import type { JwtPayload } from 'jsonwebtoken';

interface token extends JwtPayload {
  user: {
    _id: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    __v: string;
  };
}

export const authHandlerMiddleware: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    throw new UnauthenticatedError('No token provided');
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as unknown as token;
    const { _id, userName, firstName, lastName } = decoded?.user || {};

    req.user = { id: _id, userName, firstName, lastName };
    next();
  } catch (err) {
    throw new UnauthenticatedError('Bad token');
  }
};
