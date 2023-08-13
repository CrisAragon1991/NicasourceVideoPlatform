import { reactionDataSource } from "../../../data/data-source/reaction-data-source";
import { Reaction, ReactionType } from "../../../data/entity/Reaction";
import { ReactionUpdateDto } from "../../dto/reaction/reaction-dto";
import { IUpdateOrInsertReaction } from "../../interfaces/use-cases/reaction/iupdate-insert-reaction";
import { ReactionRepositoryImplementation } from "../../repositories/reaction-repository";

export class UpdateInsertReactionImplementation implements IUpdateOrInsertReaction {

    reactionRepository: ReactionRepositoryImplementation

    /**
     *
     */
    constructor(reactionRepository: ReactionRepositoryImplementation) {
        this.reactionRepository = reactionRepository
    }

    async execute(userId: number, videoId: number, reactionObject: ReactionUpdateDto): Promise<boolean> {
        let reaction = await this.reactionRepository.getReactionByUserIdAndVideo(userId, videoId)
        console.log(`reaction found`, reaction)
        if (!reaction) {
            let newReaction = new Reaction();
            newReaction = {...newReaction, reactionType: reactionObject.reactionType, user: {id: userId}, video: {id: videoId}} as any
            await this.reactionRepository.createResource(newReaction)
        } else {
            reaction.reactionType = reactionObject.reactionType
            await this.reactionRepository.updateResourceByIdentifier(reaction.id, reaction)
        }
        return true
    }
}

export const updateOrInsertReactionImplementation = new UpdateInsertReactionImplementation(new ReactionRepositoryImplementation(reactionDataSource))