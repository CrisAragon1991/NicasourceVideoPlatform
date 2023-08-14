import { NextFunction, Request, Response } from 'express'
import { ICreateFollowerUseCase } from '../../domain/interfaces/use-cases/follow-user/icreate-follow-user'
import { IDeleteFollowerUseCase } from '../../domain/interfaces/use-cases/follow-user/idelete-follow-user'

export class FollowUserController {

    followerUseCase: ICreateFollowerUseCase
    unfollowerUseCase: IDeleteFollowerUseCase  

    /**
     *
     */
    constructor(followerUseCase: ICreateFollowerUseCase, unfollowUseCase: IDeleteFollowerUseCase){
        this.followerUseCase = followerUseCase
        this.unfollowerUseCase = unfollowUseCase
    }

    async follow(request: Request, response: Response, _next: NextFunction) {
        await this.followerUseCase.execute((request as any).user.id, Number((request as any).params.followedUserId))
        return response.status(204).send()
    }

    async unfollow(request: Request, response: Response, _next: NextFunction) {
        await this.unfollowerUseCase.execute((request as any).user.id, (request as any).params.followedUserId)
        return response.status(204).send()
    }

}