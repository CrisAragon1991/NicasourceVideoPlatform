import { NextFunction, Request, Response } from 'express'
import { ICreateUserUseCase } from '../../domain/interfaces/use-cases/user/icreate-user';
import { ILogginUseCase } from '../../domain/interfaces/use-cases/user/iloggin-user';
import { IProfileUserUseCase } from '../../domain/interfaces/use-cases/user/iprofile-user';

export class UserController {

    private createUserUseCase: ICreateUserUseCase
    private logginUserCase: ILogginUseCase
    private profileUseCase: IProfileUserUseCase
    /**
     *
     */
    constructor(createUserUseCase: ICreateUserUseCase, logginUseCase: ILogginUseCase, profileUseCase: IProfileUserUseCase) {
        this.createUserUseCase = createUserUseCase
        this.logginUserCase = logginUseCase
        this.profileUseCase = profileUseCase
    }

    async logging(request: Request, response: Response, next: NextFunction) {
        let result = await this.logginUserCase.execute(request.body)
        return response.status(200).json(result)
    }

    async save(request: Request, response: Response, next: NextFunction) {
        let result = await this.createUserUseCase.execute(request.body)
        return response.status(200).json(result)
    }

    async userCreatorProfile(request: Request, response: Response, next: NextFunction) {
        let result = await this.profileUseCase.execute(+request.params.followedUserId)
        return response.status(200).json(result)
    }
}