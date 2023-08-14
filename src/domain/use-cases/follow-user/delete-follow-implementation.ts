import { followUserDataSource } from '../../../data/data-source/follow-user-data-source'
import { IDeleteFollowerUseCase } from '../../interfaces/use-cases/follow-user/idelete-follow-user'
import { FollowUserRepository } from '../../repositories/follow-user-repository'

export class DeleteFollowImplemenation implements IDeleteFollowerUseCase {

    followerRepository: FollowUserRepository

    /**
     *
     */
    constructor(followerRepository: FollowUserRepository) {
        this.followerRepository = followerRepository
    }

    async execute(userLoggedId: number, userFollowedId: number): Promise<boolean> {
        await  this.followerRepository.unfollowUser(userLoggedId, userFollowedId)
        return true
    }
}

export const deleteFollowerUseCase = new DeleteFollowImplemenation(new FollowUserRepository(followUserDataSource))