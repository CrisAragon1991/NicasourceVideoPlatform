import { followUserDataSource } from "../../../data/data-source/follow-user-data-source";
import { ACTION_NOT_ALLOWED } from "../../../dictionaryConst/const";
import { ApplicationError } from "../../../utilities/application-error";
import { ICreateFollowerUseCase } from "../../interfaces/use-cases/follow-user/icreate-follow-user";
import { FollowUserRepository } from "../../repositories/follow-user-repository";

export class CreateFollowImplemenation implements ICreateFollowerUseCase {

    followerRepository: FollowUserRepository

    /**
     *
     */
    constructor(followerRepository: FollowUserRepository) {
        this.followerRepository = followerRepository
    }

    async execute(userLoggedId: number, userFollowedId: number): Promise<boolean> {
        if (userLoggedId === userFollowedId) throw new ApplicationError(ACTION_NOT_ALLOWED, 403)
        await  this.followerRepository.followUser(userLoggedId, userFollowedId)
        return true
    }
}

export const createFollowerUseCase = new CreateFollowImplemenation(new FollowUserRepository(followUserDataSource))