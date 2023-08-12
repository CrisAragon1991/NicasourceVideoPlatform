import { VideoDataSource } from "../../data/data-source/video-data-source";
import { User } from "../../data/entity/User";
import { Video } from "../../data/entity/Video";
import { UserRepository } from "../interfaces/repository/user-repository";

export class VideoRepositoryImplementation implements VideoRepository {
    
    videoDataSource: VideoDataSource

    /**
     *
     */
    constructor(videoDataSource: VideoDataSource) {
        this.videoDataSource = videoDataSource;
    }

    async getRosourceByParams(params: { [key: string]: any; }[], include: string[]): Promise<Video> {
        return await this.videoDataSource.getByParams(params, include)
    }

    async createResource(resource: Video): Promise<Video> {
        return await this.videoDataSource.create(resource)
    }
}