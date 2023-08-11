import { UserDataSource } from '../../../data/data-source/user-data-source'
import { User } from '../../../data/entity/User'
import { IBaseRepositoryCreate, IBaseRepositoryGetResourceByParams } from './base-resource-repository/ibase-repository'

export class UserRepository implements IBaseRepositoryCreate<User>, IBaseRepositoryGetResourceByParams<User>{
    
    userDataSource: UserDataSource

    /**
     *
     */
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }
    
    async getRosourceByParams(params: {[key:string]: any}[], include: string[]): Promise<User> {
        return await this.userDataSource.getByParams(params, include )
    }

    async createResource(resource: User): Promise<User> {
        return await this.userDataSource.create(resource) 
    }
}