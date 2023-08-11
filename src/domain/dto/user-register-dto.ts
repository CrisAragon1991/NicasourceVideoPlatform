import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, MinLength, Validate } from "class-validator"
import { CustomMatchPasswords } from "../../utilities/custom-validator"

export class UserRegisterDto {
    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    firstName: string

    @IsString()
    @MaxLength(30)
    @IsNotEmpty()
    lastName: string

    @IsNumber()
    @Max(100)
    age: number

    @IsEmail()
    email: string   

    @IsString()
    @MinLength(8)
    @Matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/g)
    password: string

    @Validate(CustomMatchPasswords, ['password'])
    repetedPassword: string
}