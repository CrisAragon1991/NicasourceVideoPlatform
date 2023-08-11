import { User } from "../../../../data/entity/User";

export interface ICreateUserUseCase {
    execute(user: User) : Promise<User>
}