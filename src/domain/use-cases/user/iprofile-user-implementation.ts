import { userDataSource } from "../../../data/data-source/user-data-source";
import { User } from "../../../data/entity/User";
import { UserRegisterDto } from "../../dto/user/user-register-dto";
import { RoleIdEnum } from "../../enums/role-enum";
import * as bcrypt from 'bcrypt';
import { UserRepositoryImplementation } from "../../repositories/user-repository-implementation";
import { IProfileUserUseCase } from "../../interfaces/use-cases/user/iprofile-user";

export class ProfileUserImplementation implements IProfileUserUseCase {
    
    userRepository: UserRepositoryImplementation

    /**
     *
     */
    constructor(userRepository: UserRepositoryImplementation) {
        this.userRepository = userRepository
    }

    async execute (userId: number): Promise<User> {
        const result = this.userRepository.getProfile(userId)
        return result
    }
}

export const profileUserImplemetation = new ProfileUserImplementation(new UserRepositoryImplementation(userDataSource));