import { logger } from '../utils/logging-utils';

import type { RequestHandler } from 'express';
import type { IncomingHttpHeaders } from 'http';

const messageBuilder = (
  method: string,
  url: string,
  body: any,
  headers: IncomingHttpHeaders,
  params: Record<string, string>,
  formattedDate: string,
) => {
  let message = '';

  message += `START - [${formattedDate}] ${method}:${url}\n`;

  if (body) {
    message += `BODY: ${JSON.stringify(body)}\n`;
  }

  if (params) {
    // eslint-disable-next-line no-console
    message += `PARAMS: ${JSON.stringify(params)}\n`;
  }

  if (headers) {
    // eslint-disable-next-line no-console
    message += `HEADERS: ${JSON.stringify(headers)}`;
  }

  return message;
};

export const startLoggingHandlerMiddleware: RequestHandler = (req, res, next) => {
  const { method, url, body, headers, params } = req;

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }- ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // eslint-disable-next-line no-console
  logger.info(messageBuilder(method, url, body, headers, params, formattedDate));

  next();
};

export const endLoggingHandlerMiddleware: RequestHandler = (req, res, next) => {
  const { method, url } = req;

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }- ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // eslint-disable-next-line no-console
  logger.info(`END - [${formattedDate}] ${method}:${url}`);
};
