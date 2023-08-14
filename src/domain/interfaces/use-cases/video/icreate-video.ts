import { Video } from '../../../../data/entity/Video'
import { VideoRegisterDto } from '../../../dto/video/video-register-dto'
import { UploadedFile } from 'express-fileupload'

export interface ICreateVideoUseCase {
    execute(user: VideoRegisterDto, file: UploadedFile, userId: number) : Promise<Video>
}