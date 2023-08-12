import { NextFunction, Request, Response } from "express";
import { ACCESS_DENIED } from "../../dictionaryConst/const";
import { AppDataSource } from "../../data-source";
import { Video } from "../../data/entity/Video";

export const roleChecker = (rolesWithPermissions: string[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (rolesWithPermissions.includes((req as any).user.role.toString())) {
        return next()
    }
    if (rolesWithPermissions.includes('video_owner')) {
        req.params.videoId
        let video = await AppDataSource.getRepository(Video)
                     .createQueryBuilder('video')
                     .leftJoinAndSelect('video.user', 'user')
                     .where('video.id = :id', {id: req.params.videoId})
                     .getOne()
        if (video?.user.id === (req as any).user.id) {
            return next()
        }
    }
    return res.status(401).send(ACCESS_DENIED)
  }
};