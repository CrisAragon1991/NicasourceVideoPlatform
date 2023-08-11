import { NextFunction, Request, Response } from 'express'
import { ICreateUserUseCase } from '../../domain/interfaces/use-cases/user/icreate-user';
import { ILogginUseCase } from '../../domain/interfaces/use-cases/user/iloggin-user';

export class UserController {

    private createUserUseCase: ICreateUserUseCase
    private logginUserCase: ILogginUseCase
    /**
     *
     */
    constructor(createUserUseCase: ICreateUserUseCase, logginUseCase: ILogginUseCase) {
        this.createUserUseCase = createUserUseCase
        this.logginUserCase = logginUseCase
    }

    async logging(request: Request, response: Response, next: NextFunction) {
        let result = await this.logginUserCase.execute(request.body)
        return response.status(200).json(result)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await this.createUserUseCase.execute(request.body)
        return response.status(200).json(result)
    }
}