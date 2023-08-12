import { IsBoolean, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { UploadedFile } from "express-fileupload";

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