import type { RequestHandler } from 'express';

export const cors: RequestHandler = (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Authorization, Content-Type, Accept'
  );

  next();
};
