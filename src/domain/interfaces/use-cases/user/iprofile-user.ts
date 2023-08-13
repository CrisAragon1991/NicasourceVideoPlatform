import { User } from "../../../../data/entity/User";

export interface IProfileUserUseCase {
    execute(userId: number) : Promise<User>
}