import { GenericDataSource } from "./generic-data-source/generic-data-source"
import { FollowUser } from "../entity/FollowUser"

export class FollowUserDataSource extends GenericDataSource<FollowUser> {
   
    constructor() {
        super(FollowUser)
    }

    async followCreator(userLoggedId: number, userFollowedId: number) : Promise<boolean> {
        let oldFollower = await this.repository.createQueryBuilder('follow_user')
                                         .where(`"follow_user"."followeruserId" = :userLoggedId`, {userLoggedId})
                                         .andWhere(`"follow_user"."followedUserId"  = :userFollowedId`, {userFollowedId})
                                         .getOne()
        if (oldFollower) {
            return true
        } 
        let newFollower = new FollowUser()
        newFollower = {...newFollower, followeruser: {id: userLoggedId} ,followedUser: {id:userFollowedId}} as any
        await this.repository.createQueryBuilder()
                             .insert()
                             .into('follow_user')
                             .values([newFollower])
                             .execute()
        return true
    }

    async unfollowCreator(userLoggedId: number, userFollowedId: number): Promise<boolean>{
        console.log(`unfollow`,userFollowedId, userFollowedId)
        await this.repository.createQueryBuilder('follow_user')
                             .softDelete()
                             .where(`"follow_user"."followeruserId" = :userLoggedId`, {userLoggedId})
                             .andWhere(`"follow_user"."followedUserId"  = :userFollowedId`, {userFollowedId})
                             .andWhere(`"follow_user"."deleteDate" IS NULL`)
                             .execute()
        return true
    }
}

export const followUserDataSource = new FollowUserDataSource()