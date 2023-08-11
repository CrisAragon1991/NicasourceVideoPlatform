import { UserDataSource } from '../../../data/data-source/user-data-source'
import { User } from '../../../data/entity/User'
import { IBaseRepositoryCreate } from './base-resource-repository/ibase-repository'

export class UserRepository implements IBaseRepositoryCreate<User>{
    
    userDataSource: UserDataSource

    /**
     *
     */
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }

    async createResource(resource: User): Promise<User> {
        return await this.userDataSource.create(resource) 
    }
}