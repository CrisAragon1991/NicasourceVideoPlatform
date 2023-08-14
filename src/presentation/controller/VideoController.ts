import { NextFunction, Request, Response } from 'express'
import { ICreateVideoUseCase } from '../../domain/interfaces/use-cases/video/icreate-video'
import { IListVideoUseCase } from '../../domain/interfaces/use-cases/video/ilist-video'
import { IDetailsVideoUseCase } from '../../domain/interfaces/use-cases/video/idetails-video'
import { IUpdateVideoUseCase } from '../../domain/interfaces/use-cases/video/iupdate-video'

export class VideoController {

    createVideoUserCase: ICreateVideoUseCase
    listVideoUseCase: IListVideoUseCase
    detailVideoUseCase: IDetailsVideoUseCase
    updateVideoUseCase: IUpdateVideoUseCase

    /**
     *
     */
    constructor(createVideoUseCase: ICreateVideoUseCase, listVideoUseCase: IListVideoUseCase, detailVideoUseCase: IDetailsVideoUseCase, updateVideoUseCase: IUpdateVideoUseCase) {
        this.createVideoUserCase = createVideoUseCase
        this.listVideoUseCase = listVideoUseCase
        this.detailVideoUseCase = detailVideoUseCase
        this.updateVideoUseCase = updateVideoUseCase
    }

    async save(request: Request, response: Response, _next: NextFunction) {
        const result = await this.createVideoUserCase.execute(request.body, (request as any).files.file, (request as any).user.id)
        return response.status(200).json(result)
    }

    async listAll(request: Request, response: Response, _next: NextFunction) {
        const result = await this.listVideoUseCase.execute()
        return response.status(200).json(result)
    }

    async detail(request: Request, response: Response, _next: NextFunction) {
        const result = await this.detailVideoUseCase.execute((request as any).params.videoId, [])
        return response.status(200).json(result)
    }

    async update(request: Request, response: Response, _next: NextFunction) {
        await this.updateVideoUseCase.execute((request as any).params.videoId, {name: request.body.name, description: request.body.description})
        return response.status(204).send()
    }

    async changeStatus(request: Request, response: Response, _next: NextFunction) {
        await this.updateVideoUseCase.execute((request as any).params.videoId, {published: request.query.published === 'true' ? true : false} as any)
        return response.status(204).send()
    }
}