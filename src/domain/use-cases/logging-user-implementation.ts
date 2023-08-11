import { userDataSource } from "../../data/data-source/user-data-source";
import { User } from "../../data/entity/User";
import { UserLogginDto } from "../dto/user-loggin-dto";
import { UserRepository } from "../interfaces/repository/user-repository";
import * as bcrypt from 'bcrypt';
import { ILogginUseCase } from "../interfaces/use-cases/user/iloggin-user";
import { ApplicationError } from "../../utilities/application-error";
import { USER_OR_PASSWORD_INVALID } from "../../dictionaryConst/const";
import * as jwt from 'jsonwebtoken';

export class LogginUserImplementation implements ILogginUseCase {
    
    userRepository: UserRepository

    /**
     *
     */
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute (user: UserLogginDto): Promise<User> {
        const result = await this.userRepository.getRosourceByParams([{email: user.email}], ['role'])
        console.debug(result)
        if (!result) {
            throw new ApplicationError(USER_OR_PASSWORD_INVALID, 404)
        }
        let match = await bcrypt.compareSync(user.password, result.password)
        if (!match) {
            throw new ApplicationError(USER_OR_PASSWORD_INVALID, 404)
        }
        const token = jwt.sign({ _id: result.id?.toString(), firstName: result.firstName, lastName: result.lastName, role: result.role },  process.env.SECRET_JWT+'', {
            expiresIn: process.env.TOKEN_LIFE,
          });
        result.password = ''
        result['token'] = token
        return result
    }
}

export const logginUseCaseImplemetation = new LogginUserImplementation(new UserRepository(userDataSource));