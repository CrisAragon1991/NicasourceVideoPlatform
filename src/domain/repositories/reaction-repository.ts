import { ReactionDataSource } from "../../data/data-source/reaction-data-source";
import { Reaction } from "../../data/entity/Reaction";
import { IBaseRepositoryCreate, IBaseRepositoryGetResourceByParams, IBaseRepositoryUpdateByIdentifier } from "../interfaces/repository/base-resource-repository/ibase-repository";

export class ReactionRepositoryImplementation implements IBaseRepositoryCreate<Reaction>, IBaseRepositoryGetResourceByParams<Reaction>, IBaseRepositoryUpdateByIdentifier<Reaction>{
    
    reactionDataSource: ReactionDataSource

    /**
     *
     */
    constructor(reactionDataSource: ReactionDataSource) {
        this.reactionDataSource = reactionDataSource;
    }

    async getReactionByUserIdAndVideo(userId: number, videoId: number): Promise<Reaction | null>{
        return await this.reactionDataSource.findReactionByUserAndVideo(userId, videoId)
    }

    async getRosourceByParams(params: { [key: string]: any; }[], include: string[]): Promise<Reaction> {
        return await this.reactionDataSource.getByParams(params, include)
    }

    async createResource(resource: Reaction): Promise<Reaction> {
        return await this.reactionDataSource.create(resource)
    }
    
    async updateResourceByIdentifier(id: number, resource: Reaction): Promise<boolean> {
        return await this.reactionDataSource.update(id, resource)
    }
}