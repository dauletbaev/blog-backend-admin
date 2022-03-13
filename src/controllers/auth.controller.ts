import type { RequestHandler } from 'express';
import { HttpError } from '../errors';
import supabase from '../utils/supabase';
import { crateToken } from '../utils/jwt';

export const signUp: RequestHandler = async (req, res, next) => {
  const { email, password, secret } = req.body;

  try {
    if (secret !== process.env.SECRET_SIGNUP)
      throw new HttpError(401, 'Invalid secret');

    if (!email || !password)
      throw new HttpError(400, 'Missing email or password');

    if (password.length < 6) throw new HttpError(400, 'Password too short');

    const { user, error } = await supabase.auth.signUp({ email, password });

    if (error) throw new HttpError(error.status, error.message);

    const token = crateToken({
      id: user!.id,
      email,
    });

    res.status(200).json({ id: user?.id, token });
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      throw new HttpError(400, 'Missing email or password');

    if (password.length < 6) throw new HttpError(400, 'Password too short');

    const { user, error } = await supabase.auth.signIn({ email, password });

    if (error) throw new HttpError(error.status, error.message);

    const token = crateToken({
      id: user!.id,
      email,
    });

    res.status(200).json({ id: user?.id, token });
  } catch (error) {
    next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {
  // const { token } = req.body;

  try {
    // if (!token) throw new HttpError(400, 'Missing token');

    const { error } = await supabase.auth.signOut();

    if (error) throw new HttpError(error.status, error.message);

    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
