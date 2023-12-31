import { User } from '../../../../data/entity/User'
import { UserLogginDto } from '../../../dto/user/user-loggin-dto'

export interface ILogginUseCase {
    execute(user: UserLogginDto) : Promise<User>
}