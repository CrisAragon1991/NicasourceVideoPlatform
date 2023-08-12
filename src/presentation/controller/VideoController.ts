import { NextFunction, Request, Response } from 'express'
import { ICreateVideoUseCase } from '../../domain/interfaces/use-cases/video/icreate-video';

export class VideoController {

    createVideoUserCase: ICreateVideoUseCase

    /**
     *
     */
    constructor(createVideoUseCase: ICreateVideoUseCase) {
        this.createVideoUserCase = createVideoUseCase
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await this.createVideoUserCase.execute(request.body, (request as any).files.file, (request as any).user.id)
        return response.status(200).json(result)
    }
}