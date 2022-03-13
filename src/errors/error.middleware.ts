import type { ErrorRequestHandler } from 'express';
import { HttpError } from '.';
import { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({ error: err.message });
  } else if (
    err instanceof JsonWebTokenError ||
    err instanceof TokenExpiredError
  ) {
    res.status(401).json({ error: err.message });
  } else {
    res.status(500).json({ error: 'Internal server error' });
  }
};
