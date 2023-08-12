import { SaveOptions, RemoveOptions } from "typeorm";
import { UserDataSource, userDataSource } from "../../data/data-source/user-data-source";
import { Role } from "../../data/entity/Role";
import { User } from "../../data/entity/User";
import { UserRegisterDto } from "../dto/user-register-dto";
import { RoleIdEnum } from "../enums/role-enum";
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

    async execute (user: UserRegisterDto): Promise<User> {
        user.password = await bcrypt.hash(user.password, Number(process.env.BCRYP_HASH_SALT))
        const result = this.userRepository.createResource({...user, role: {id: user.isTeacher ? RoleIdEnum.Teacher : RoleIdEnum.Student}} as any)
        return result
    }
}

export const createUserImplemetation = new CreateUserImplementation(new UserRepository(userDataSource));