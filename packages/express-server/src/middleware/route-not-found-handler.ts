import type { RequestHandler } from 'express';

export const routeNotFoundMiddleware: RequestHandler = (req, res) => res.status(400).send('Route does not exist');
