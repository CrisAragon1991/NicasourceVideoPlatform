import { NextFunction, Request, Response } from 'express'
import { ICreateUserUseCase } from '../../domain/interfaces/use-cases/user/icreate-user';

export class UserController {

    private createUserUseCase: ICreateUserUseCase
    
    /**
     *
     */
    constructor(createUserUseCase: ICreateUserUseCase) {
        this.createUserUseCase = createUserUseCase
    }

    async all(request: Request, response: Response, next: NextFunction) {
        throw Error('Not implementation')
    }

    async one(request: Request, response: Response, next: NextFunction) {
        throw Error('Not implementation')
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await this.createUserUseCase.execute(request.body)
        return response.status(200).json(result)
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        throw Error('Not implementation')
    }

}