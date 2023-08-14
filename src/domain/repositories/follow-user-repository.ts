import { FollowUserDataSource } from '../../data/data-source/follow-user-data-source'

export class FollowUserRepository {
    followUserDataSource: FollowUserDataSource
    /**
     *
     */
    constructor(followUserDataSource: FollowUserDataSource) {
        this.followUserDataSource = followUserDataSource
    }

    async followUser(userLoggedId: number, userFollowedId: number) {
        this.followUserDataSource.followCreator(userLoggedId, userFollowedId)
    }

    async unfollowUser(userLoggedId: number, userFollowedId: number) {
        this.followUserDataSource.unfollowCreator(userLoggedId, userFollowedId)
    }

}