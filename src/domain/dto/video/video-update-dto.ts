import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator'

export class VideoUpdateDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    name: string
    
    @IsString()
    @IsOptional()
    description: string
}