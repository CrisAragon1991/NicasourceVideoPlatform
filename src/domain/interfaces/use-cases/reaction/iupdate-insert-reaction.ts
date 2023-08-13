import { ReactionType } from "../../../../data/entity/Reaction";
import { ReactionUpdateDto } from "../../../dto/reaction/reaction-dto";

export interface IUpdateOrInsertReaction {
    execute(userId: number, videoId: number, reaction: ReactionUpdateDto) : Promise<boolean>
}