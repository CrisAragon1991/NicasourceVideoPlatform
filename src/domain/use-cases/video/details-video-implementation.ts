import { VideoRepositoryImplementation } from "../../repositories/video-repository-implementation"
import { videoDataSource } from "../../../data/data-source/video-data-source";
import { Video } from "../../../data/entity/Video";
import { IDetailsVideoUseCase } from "../../interfaces/use-cases/video/idetails-video";

export class DetailsVideoImplementation implements IDetailsVideoUseCase {
    
    videoRepository: VideoRepositoryImplementation

    /**
     *
     */
    constructor(videoRepository: VideoRepositoryImplementation) {
        this.videoRepository = videoRepository
    }

    async execute(id: number, include: string[]): Promise<Video> {
        return await this.videoRepository.getRosourceByParams([{id: id}], include ? include : [])
    }
}

export const detailsVideoImplemetation = new DetailsVideoImplementation(new VideoRepositoryImplementation(videoDataSource))