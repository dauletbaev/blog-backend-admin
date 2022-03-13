import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: string;
  email: string;
};

export const crateToken = (payload: JwtPayload) => {
  return jwt.sign(payload, process.env.SECRET_JWT!, { expiresIn: '1h' });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, process.env.SECRET_JWT!);
};
