import { userDataSource } from "../../../data/data-source/user-data-source";
import { User } from "../../../data/entity/User";
import { UserRegisterDto } from "../../dto/user/user-register-dto";
import { RoleIdEnum } from "../../enums/role-enum";
import { ICreateUserUseCase } from "../../interfaces/use-cases/user/icreate-user";
import * as bcrypt from 'bcrypt';
import { UserRepositoryImplementation } from "../../repositories/user-repository-implementation";

export class CreateUserImplementation implements ICreateUserUseCase {
    
    userRepository: UserRepositoryImplementation

    /**
     *
     */
    constructor(userRepository: UserRepositoryImplementation) {
        this.userRepository = userRepository
    }

    async execute (user: UserRegisterDto): Promise<User> {
        user.password = await bcrypt.hash(user.password, Number(process.env.BCRYP_HASH_SALT))
        const result = this.userRepository.createResource({...user, role: {id: user.isTeacher ? RoleIdEnum.Teacher : RoleIdEnum.Student}} as any)
        return result
    }
}

export const createUserImplemetation = new CreateUserImplementation(new UserRepositoryImplementation(userDataSource));