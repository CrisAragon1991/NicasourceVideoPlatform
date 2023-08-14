import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator'

export class VideoRegisterDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string
    
    @IsString()
    @IsOptional()
    description: string

    @IsBoolean()
    @IsOptional()
    published: boolean
}