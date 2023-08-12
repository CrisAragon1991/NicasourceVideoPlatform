import { VideoRepositoryImplementation } from "../../repositories/video-repository-implementation"
import { IListVideoUseCase } from "../../interfaces/use-cases/video/ilist-video"
import { videoDataSource } from "../../../data/data-source/video-data-source";
import { Video } from "../../../data/entity/Video";

export class ListVideoImplementation implements IListVideoUseCase {
    
    videoRepository: VideoRepositoryImplementation

    /**
     *
     */
    constructor(videoRepository: VideoRepositoryImplementation) {
        this.videoRepository = videoRepository
    }

    async execute (): Promise<Video[]> {
        return this.videoRepository.getResources()
    }
}

export const listVideoImplemetation = new ListVideoImplementation(new VideoRepositoryImplementation(videoDataSource))