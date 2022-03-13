import type { RequestHandler } from 'express';
import { HttpError } from '../errors';
import { verifyToken } from '../utils/jwt';

export const authMiddleware: RequestHandler = async (req, res, next) => {
  try {
    const auth = req.header('Authorization');
    const token = auth?.split(' ')[1];

    if (!token) throw new HttpError(401, 'No token provided.');

    verifyToken(token);

    next();
  } catch (error) {
    next(error);
  }
};
