import { NextFunction, Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { TOKEN_INVALID, TOKEN_REQUIRED } from "../../dictionaryConst/const";

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send(TOKEN_REQUIRED);
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_JWT+'');
    (req as any).user = decoded;
  } catch (err) {
    console.debug(err)
    return res.status(401).send(TOKEN_INVALID);
  }
  return next();
};