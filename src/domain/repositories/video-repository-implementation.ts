import { VideoDataSource } from '../../data/data-source/video-data-source'
import { Video } from '../../data/entity/Video'
import { IBaseRepositoryCreate, IBaseRepositoryGetResourceByParams, IBaseRepositoryGetResources, IBaseRepositoryUpdateByIdentifier } from '../interfaces/repository/base-resource-repository/ibase-repository'


export class VideoRepositoryImplementation implements IBaseRepositoryCreate<Video>, IBaseRepositoryGetResourceByParams<Video>, IBaseRepositoryGetResources<Video>, IBaseRepositoryUpdateByIdentifier<Video>{
    
    videoDataSource: VideoDataSource

    /**
     *
     */
    constructor(videoDataSource: VideoDataSource) {
        this.videoDataSource = videoDataSource
    }

    async getRosourceByParams(params: { [key: string]: any; }[], include: string[]): Promise<Video> {
        return await this.videoDataSource.getByParams(params, include)
    }

    async createResource(resource: Video): Promise<Video> {
        return await this.videoDataSource.create(resource)
    }

    async getResources(): Promise<Video[]> {
        return await this.videoDataSource.list()
    }
    
    async updateResourceByIdentifier(id: number, resource: Video): Promise<boolean> {
        return await this.videoDataSource.update(id, resource)
    }
}