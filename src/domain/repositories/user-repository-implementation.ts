import { UserDataSource } from '../../data/data-source/user-data-source'
import { User } from '../../data/entity/User'
import { IBaseRepositoryCreate, IBaseRepositoryGetResourceByParams } from '../interfaces/repository/base-resource-repository/ibase-repository'

export class UserRepositoryImplementation implements IBaseRepositoryCreate<User>, IBaseRepositoryGetResourceByParams<User> {
    
    userDataSource: UserDataSource

    /**
     *
     */
    constructor(userDataSource: UserDataSource) {
        this.userDataSource = userDataSource
    }
    getRosourceByParams(params: { [key: string]: any; }[], include: string[]): Promise<User> {
        return this.userDataSource.getByParams(params, include)
    }

    async createResource(resource: User): Promise<User> {
        return await this.userDataSource.create(resource)
    }

    getProfile(userId: number) {
        return this.userDataSource.getProfile(userId)
    }
}