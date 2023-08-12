import { videoDataSource } from "../../../data/data-source/video-data-source"
import { Video } from "../../../data/entity/Video"
import { FORMAT_NOT_SUPPORTED, VIDEO_PATH } from "../../../dictionaryConst/const"
import { ApplicationError } from "../../../utilities/application-error"
import { VideoRegisterDto } from "../../dto/video/video-register-dto"
import { ICreateVideoUseCase } from "../../interfaces/use-cases/video/icreate-video"
import { VideoRepositoryImplementation } from "../../repositories/video-repository-implementation"
import { UploadedFile } from "express-fileupload";
import * as fs from 'fs'
import * as path from 'path'

export class CreateVideoImplementation implements ICreateVideoUseCase {
    
    userRepository: VideoRepositoryImplementation

    /**
     *
     */
    constructor(userRepository: VideoRepositoryImplementation) {
        this.userRepository = userRepository
    }

    async execute (video: VideoRegisterDto, file: UploadedFile, userId: number): Promise<Video> {
        let filenameSplited = file.name.split('.')
        let types = ['webm', 'WEBM', 'mp4', 'MP4', 'avi', 'AVI', 'wmv', 'WMV']
        if (!types.includes(filenameSplited[filenameSplited.length-1])){
            throw new ApplicationError(FORMAT_NOT_SUPPORTED, 415)
        }
        if (!fs.existsSync(VIDEO_PATH)){
            fs.mkdirSync(VIDEO_PATH)
        }
        let pathCurrentVideo = `${VIDEO_PATH}${path.sep}${filenameSplited[0]}${Date.now()}.${filenameSplited[filenameSplited.length - 1]}`
        await file.mv(pathCurrentVideo)
        video['patch'] = pathCurrentVideo
        video['user'] = {id: userId} 
        const result = await this.userRepository.createResource(video as any)
        return result
    }
}

export const createVideoImplemetation = new CreateVideoImplementation(new VideoRepositoryImplementation(videoDataSource));