import { VideoRepositoryImplementation } from "../../repositories/video-repository-implementation"
import { videoDataSource } from "../../../data/data-source/video-data-source";
import { IUpdateVideoUseCase } from "../../interfaces/use-cases/video/iupdate-video";
import { VideoUpdateDto } from "../../dto/video/video-update-dto";

export class UpdateVideoImplementation implements IUpdateVideoUseCase {
    
    videoRepository: VideoRepositoryImplementation

    /**
     *
     */
    constructor(videoRepository: VideoRepositoryImplementation) {
        this.videoRepository = videoRepository
    }

    async execute(id: number, video: VideoUpdateDto): Promise<boolean> {
        return await this.videoRepository.updateResourceByIdentifier(id, {name: video.name, description: video.description} as any)
    }
}

export const updateVideoImplemetation = new UpdateVideoImplementation(new VideoRepositoryImplementation(videoDataSource))