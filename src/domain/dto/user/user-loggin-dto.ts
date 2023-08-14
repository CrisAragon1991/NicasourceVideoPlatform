import { IsNotEmpty } from 'class-validator'

export class UserLogginDto {
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    password: string
}