import { IsBoolean, IsEmail, IsNumber, IsOptional, IsString, Matches, Max, MaxLength, MinLength, Validate } from 'class-validator'
import { CustomMatchPasswords } from '../../../utilities/custom-validator'

export class UserUpdateDto {
    @IsString()
    @MaxLength(30)
    @IsOptional()
    firstName: string

    @IsString()
    @MaxLength(30)
    @IsOptional()
    lastName: string

    @IsNumber()
    @Max(100)
    @IsOptional()
    age: number

    @IsEmail()
    @IsOptional()
    email: string   

    @IsString()
    @MinLength(8)
    @Matches(/^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/g)
    @IsOptional()
    password: string

    @Validate(CustomMatchPasswords, ['password'])
    @IsOptional()
    repetedPassword: string

    @IsBoolean()
    @IsOptional()
    isTeacher: boolean
}