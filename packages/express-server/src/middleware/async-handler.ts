import type express from 'express';
import type { RequestHandler } from 'express';

export const asyncHandlerMiddleware =
  (fn: (req: express.Request, res: express.Response, next: express.NextFunction) => unknown): RequestHandler =>
  async (req, res, next) => {
    try {
      await fn(req, res, next);
      next();
    } catch (e) {
      next(e);
    }
  };
