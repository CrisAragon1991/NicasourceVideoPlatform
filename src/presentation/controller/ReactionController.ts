import { NextFunction, Request, Response } from 'express'
import { IUpdateOrInsertReaction } from '../../domain/interfaces/use-cases/reaction/iupdate-insert-reaction';

export class ReactionController {

    updateInsertReaction: IUpdateOrInsertReaction

    /**
     *
     */
    constructor(updateInsertReaction: IUpdateOrInsertReaction){
        this.updateInsertReaction = updateInsertReaction
    }

    async updateOrInsert(request: Request, response: Response, next: NextFunction) {
        await this.updateInsertReaction.execute((request as any).user.id, (request as any).params.videoId, request.body)
        return response.status(204).send()
    }
}