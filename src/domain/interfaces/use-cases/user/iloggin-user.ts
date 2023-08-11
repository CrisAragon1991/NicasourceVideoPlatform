import { User } from "../../../../data/entity/User";

export interface ILogginUseCase {
    execute(user: User) : Promise<User>
}