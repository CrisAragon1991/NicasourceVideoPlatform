import { NextFunction, Request, Response } from 'express'
import { ICreateUserUseCase } from '../../domain/interfaces/use-cases/user/icreate-user';
import { ILogginUseCase } from '../../domain/interfaces/use-cases/user/iloggin-user';
import { ICreateVideoUseCase } from '../../domain/interfaces/use-cases/video/icreate-video';

export class UserController {

    createVideoUserCase: ICreateVideoUseCase

    /**
     *
     */
    constructor(createVideoUseCase: ICreateVideoUseCase) {
        this.createVideoUserCase = createVideoUseCase
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await this.createUserUseCase.execute(request.body)
        return response.status(200).json(result)
    }
}