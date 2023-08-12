import { UserRegisterDto } from "../../../dto/user-register-dto";

export interface ICreateUserUseCase {
    execute(user: UserRegisterDto) : Promise<User>
}