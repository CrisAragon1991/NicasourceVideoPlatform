import { UserDataSource } from "../../data/data-source/user-data-source";
import { User } from "../../data/entity/User";
import { UserRepository } from "../interfaces/repository/user-repository";

export class UserRepositoryImplementation implements UserRepository {
    
    userDataSource: UserDataSource

    /**
     *
     */
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource;
    }

    async createResource(resource: User): Promise<User> {
        return await this.userDataSource.create(resource)
    }
}