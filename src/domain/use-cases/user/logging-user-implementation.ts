
import * as jwt from 'jsonwebtoken';
import { UserRepositoryImplementation } from "../../repositories/user-repository-implementation";
import { userDataSource } from '../../../data/data-source/user-data-source';
import { User } from '../../../data/entity/User';
import { USER_OR_PASSWORD_INVALID } from '../../../dictionaryConst/const';
import { ApplicationError } from '../../../utilities/application-error';
import { UserLogginDto } from '../../dto/user/user-loggin-dto';
import { ILogginUseCase } from '../../interfaces/use-cases/user/iloggin-user';
import * as bcrypt from 'bcrypt';

export class LogginUserImplementation implements ILogginUseCase {
    
    userRepository: UserRepositoryImplementation

    /**
     *
     */
    constructor(userRepository: UserRepositoryImplementation) {
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
        const token = jwt.sign({ id: result.id, firstName: result.firstName, lastName: result.lastName, role: result.role.id },  process.env.SECRET_JWT+'', {
            expiresIn: process.env.TOKEN_LIFE,
          });
        result.password = ''
        result['token'] = token
        return result
    }
}

export const logginUseCaseImplemetation = new LogginUserImplementation(new UserRepositoryImplementation(userDataSource));