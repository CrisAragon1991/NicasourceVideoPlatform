import { NextFunction, Request, Response } from "express";
import { ACCESS_DENIED, ACTION_NOT_ALLOWED } from "../../dictionaryConst/const";
import { AppDataSource } from "../../data-source";
import { Video } from "../../data/entity/Video";
import { User } from "../../data/entity/User";
import { RoleIdEnum } from "../../domain/enums/role-enum";

export const roleChecker = (rolesWithPermissions: string[]) => {
  return async function (req: Request, res: Response, next: NextFunction) {
    if (rolesWithPermissions.includes((req as any).user.role.toString())) {
        return next()
    }
    if (rolesWithPermissions.includes('video_owner')) {
        let video = await AppDataSource.getRepository(Video)
                     .createQueryBuilder('video')
                     .leftJoinAndSelect('video.user', 'user')
                     .where('video.id = :id', {id: req.params.videoId})
                     .getOne()
        if (video?.user.id === (req as any).user.id) {
            return next()
        }
    }
    if (rolesWithPermissions.includes('followedUserIdIsTeacher')) {
        let user = await AppDataSource.getRepository(User)
                                      .createQueryBuilder('user')
                                      .leftJoinAndSelect('user.role', 'role')
                                      .where('user.id = :followedUserId', {followedUserId: req.params.followedUserId})
                                      .getOne()
        if (user?.role.id === RoleIdEnum.Teacher) {
          return next()
        } else {
          return res.status(403).send(ACTION_NOT_ALLOWED)
        }
    }
    return res.status(401).send(ACCESS_DENIED)
  }
};