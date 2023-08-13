import { IsEnum, IsNotEmpty, IsString } from "class-validator";
import { ReactionType } from "../../../data/entity/Reaction";

export class ReactionUpdateDto {
    @IsString()
    @IsNotEmpty()
    @IsEnum(ReactionType)
    reactionType: ReactionType
}