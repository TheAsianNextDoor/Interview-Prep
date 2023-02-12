import type { RequestHandler } from 'express';

export const startLoggingHandlerMiddleware: RequestHandler = (req, res, next) => {
  const { method, url, body, headers, params } = req;

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }- ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // eslint-disable-next-line no-console
  console.log(`START - [${formattedDate}] ${method}:${url}`);

  if (body) {
    // eslint-disable-next-line no-console
    console.log('BODY: ', JSON.stringify(body));
  }

  if (params) {
    // eslint-disable-next-line no-console
    console.log('PARAMS: ', JSON.stringify(params));
  }

  if (headers) {
    // eslint-disable-next-line no-console
    console.log('HEADERS: ', JSON.stringify(headers));
  }

  next();
};

export const endLoggingHandlerMiddleware: RequestHandler = (req, res, next) => {
  const { method, url } = req;

  const date = new Date();
  const formattedDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }- ${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  // eslint-disable-next-line no-console
  console.log(`END - [${formattedDate}] ${method}:${url}`);
};
