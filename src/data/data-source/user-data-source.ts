import { User } from '../entity/User'
import { GenericDataSource } from './generic-data-source/generic-data-source'
import { ApplicationError } from '../../utilities/application-error'
import { RESOURCE_NOT_FOUND } from '../../dictionaryConst/const'

export class UserDataSource extends GenericDataSource<User> {
    /**
     *
     */
    constructor() {
        super(User)
    }

    async getProfile(userId: number) : Promise<User> {
        const user = await this.repository.createQueryBuilder('user')
                             .leftJoinAndSelect('user.role', 'role')
                             .leftJoinAndSelect('user.videos', 'videos')
                             .leftJoinAndSelect('videos.reaction', 'reaction')
                             .leftJoinAndSelect('user.currentUserIsFollowed', 'currentUserIsFollowed')
                             .leftJoinAndSelect('currentUserIsFollowed.followeruser', 'followeruser')
                             .where('user.id = :id', {id: userId})
                             .getOne()
        if (!user) {
            throw new ApplicationError(RESOURCE_NOT_FOUND, 404)
        }
        return user                     
    }
}

export const userDataSource = new UserDataSource()