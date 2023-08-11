import { UserDataSource, userDataSource } from "../../data/data-source/user-data-source";
import { User } from "../../data/entity/User";
import { UserRepository } from "../interfaces/repository/user-repository";
import { ICreateUserUseCase } from "../interfaces/use-cases/user/icreate-user";
import * as bcrypt from 'bcrypt';

export class CreateUserImplementation implements ICreateUserUseCase {
    
    userRepository: UserRepository

    /**
     *
     */
    constructor(userRepository: UserRepository) {
        this.userRepository = userRepository
    }

    async execute (user: User): Promise<User> {
        user.password = await bcrypt.hash(user.password, Number(process.env.BCRYP_HASH_SALT))
        const result = this.userRepository.createResource(user)
        return result
    }
}

export const createUserImplemetation = new CreateUserImplementation(new UserRepository(userDataSource));