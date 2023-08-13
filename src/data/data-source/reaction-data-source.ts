import { GenericDataSource } from "./generic-data-source/generic-data-source"
import { Reaction } from "../entity/Reaction"

export class ReactionDataSource extends GenericDataSource<Reaction> {
    /**
     *
     */
    constructor() {
        super(Reaction)
    }

    async findReactionByUserAndVideo(userId: number, videoId: number): Promise<Reaction | null>{
        let reaction = await this.repository.createQueryBuilder(this.nameClass)
                       .where(`${this.nameClass}.videoId = :videoId`, {videoId})
                       .andWhere(`${this.nameClass}.userId = :videoId`, {videoId})
                       .getOne()
        return reaction
    }
}

export const reactionDataSource = new ReactionDataSource()