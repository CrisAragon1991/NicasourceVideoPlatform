import { NextFunction, Request, Response } from "express";
import { ACCESS_DENIED } from "../../dictionaryConst/const";

export const roleChecker = (rolesWithPermissions: string[]) => {
  return function (req: Request, res: Response, next: NextFunction) {
    if (rolesWithPermissions.includes((req as any).user.role.toString())) {
        return next()
    }
    return res.status(401).send(ACCESS_DENIED)
  }
};